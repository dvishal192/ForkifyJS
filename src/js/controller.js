import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from '../views/recipeView.js';
import searchView from '../views/searchView.js';
import resultView from '../views/resultsView.js';
import bookmarksView from '../views/bookmarksView.js';
import paginationView from '../views/paginationView.js';
import addRecipeView from '../views/addRecipeView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';


if (module.hot) {
    module.hot.accept();
}


const controlRecipe = async function () {

    try {
        const id = window.location.hash.slice(1);

        if (!id) {
            return;
        } else {
            recipeView.renderSpinner();

            //Update results view to mark selected search results --a css class. 
            //Update so that we dont have to re render the entire DOM and only the required elements need to be shown again. We haven't implemented this. update() is in View and can be used by both resultView and bookmarkView. 
            //resultView.update(model.getSearchResultPage());
            //bookmarksView.update(modle.state.bookmarks);

            //Loadig Recipe
            await model.loadRecipe(id);
            const {
                recipe
            } = model.state;

            //Rendering recipe
            recipeView.render(model.state.recipe);
            
            bookmarksView.render(model.state.bookmarks);

        }

    } catch (error) {
        console.error(`${error}💣`);
        recipeView.renderError();
    }
}





const controlSearchResults = async function () {

    try {
        const query = searchView.getQuery();


        if (!query) {
            return;
        } else {
            resultView.renderSpinner();
            await model.loadSearchResults(query);
            resultView.render(model.getSearchResultPage());
            model.refreshPage();
            paginationView.render(model.state.search);

        }

    } catch (error) {
        console.error(`${error}💣`);

    }
}



const controlPagination = function (goToPage) {

    //Render new Pagination
    resultView.render(model.getSearchResultPage(goToPage));

    //Render new Pagination Button
    paginationView.render(model.state.search);


    console.log("Pagination controller");
    console.log(goToPage);
}


const controlServings = function (newServings) {
    //Update the recipe servings
    model.updateServings(newServings);

    //Update the recipe view
    recipeView.render(model.state.recipe);
}


const controlAddBookmark = function () {
    if (model.state.recipe.bookmarked == false) {
        model.addBookmark(model.state.recipe);
    } else {
        model.deleteBookmark(model.state.recipe.id);
    }
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);

}


const controlBookmarks = function(){
    bookmarksView.render(model.state.bookmarks);
}

//PUB-SUB Model.
const controlAddRecipe = async function(newRecipe){
    try{
        await model.uploadRecipe(newRecipe);
        console.log(model.state.recipe);
        
        addRecipeView.renderSpinner();
        
        recipeView.render(model.state.recipe);
        
        addRecipeView.renderMessage();
        
        bookmarksView.render(model.state.bookmarks);
        
        window.history.pushState(null,'',`#${model.state.recipe.id}`);
        
        setTimeout(function(){
            addRecipeView.toggleWindow();
        }, MODAL_CLOSE_SEC * 1000 );
        
        
    }catch (error){
        console.error('⚠',error);
        addRecipeView.renderError(error.message);
    }
    
}

const init = function () {
    recipeView.addHandlerRender(controlRecipe);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    addRecipeView.addHandlerUpload(controlAddRecipe);
    bookmarksView.addHandlerRender(controlBookmarks);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);

};

init();
console.log(model.state.bookmarks);
