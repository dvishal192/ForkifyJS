import {
    API_URL,
} from './config.js';
import {
    RES_PER_PAGE
} from './config.js';
import {
    getJSON,
    sendJSON
} from '../views/helpers.js';

import 'dotenv/config';




export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: []
}




const createRecipeObject = function (data) {

    let {
        recipe
    } = data.data;

    return state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {key: recipe.key}),
    }

    //     const recipe = {
    //            title: newRecipe.title,
    //            sourceUrl: newRecipe.sourceUrl,
    //            image: newRecipe.image,
    //            publisher: newRecipe.publisher,
    //            cookingTime: newRecipe.cookingTime,
    //            servings: newRecipe.servings,
    //            ingredients,
    //        
    //}

}


export const loadRecipe = async function (id) {

    try {

        const data = await getJSON(`${API_URL}/${id}?key=${process.env.KEY}`);

        //console.log(data.data.recipe.publisher); //Destructuring the object to achieve the end value points. 

        state.recipe = createRecipeObject(data);
        console.log(state);

        if (state.bookmarks.some(bookmark => bookmark.id === id)) {
            state.recipe.bookmarked = true;
        } else {
            state.recipe.bookmarked = false;
        }

    } catch (error) {
        console.error(`${error} 💣`);
        throw (error);
    }
}


export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}&key=${process.env.KEY}`);
        state.search.results = data.data.recipes.map(rec => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
                ...(rec.key && {key: rec.key}),
            }
            console.log(state.search.results);
        })
    } catch (error) {
        throw (error);
        console.error(`${error} 💣`);
    }
}


export const getSearchResultPage = function (page = state.search.page) {

    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage; //0;
    const end = page * state.search.resultsPerPage; //9;


    return state.search.results.slice(start, end);
}



export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * (newServings / state.recipe.servings);
    })


    state.recipe.servings = newServings;
}

export const refreshPage = function () {
    state.search.page = 1;
}




const persistBookmark = function () {
    localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
}




export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);

    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }

    persistBookmark();
}


export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);

    state.bookmarks.splice(index, 1);

    if (id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }
    persistBookmark();
}


const init = function () {
    const storage = localStorage.getItem('bookmark');
    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
};


init();

const clearBookmarks = function () {
    localStorage.clear('bookmark');
}

//clearBookmarks();


export const uploadRecipe = async function (newRecipe) {
    try {
        console.log(Object.entries(newRecipe));
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing => {
            const ingArr = ing[1].replaceAll(" ", " ").split(',');

            if (ingArr.length !== 3) {
                throw new Error('Incorrect data upload format. Please upload the ingredients in correct form.');
            }

            const [quantity, unit, description] = ingArr;

            return {
                quantity: quantity ? +quantity : null,
                unit: unit,
                description: description
            };
        })

        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,

        }

        const data = await sendJSON(`${API_URL}?&key=${KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);

    } catch (error) {
        throw error;
    }

}
