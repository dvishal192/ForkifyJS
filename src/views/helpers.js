import {
    TIMEOUT_SEC
} from '../js/config.js';



const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};



//
//export const AJAX = async function (url, uploadData = undefined) {
//    try {
//        const fetchPro = uploadData ? fetch(url, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify(uploadData),
//        }) : fetch(url);
//
//        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//        const data = await res.json();
//
//
//        if (!res.ok) {
//            throw new Error(`${data.message}(${res.status})`);
//        }
//        return data;
//
//    } catch (error) {
//        throw (error);
//    }
//}





export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();


        if (!res.ok) {
            throw new Error(`${data.message}(${res.status})`);
        }
        return data;
    } catch (error) {

        throw (error);
    }

}


export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        });


        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();


        if (!res.ok) {
            throw new Error(`${data.message}(${res.status})`);
        }
        console.log(data);
        return data;
    } catch (error) {

        throw (error);
    }

}









//This keyword inside the handler will point to the element on which the keyword was attached to. 
//So here this will be pointing to this._btnOpen
////            resultView.render(model.state.search.results);
//if (this._data.length != 0) {} else {
//            return `<li class="preview">
//            <a class="preview__link preview__link--active" href="">
//              <figure class="preview__fig">
//                <img src="src/img/cross.png" alt="ImageUnavailable" />
//              </figure><div class="preview__data">
//                <h4 class="preview__title">No matching recipes found</h4>
//                <p class="preview__publisher">--system</p>
//              </div>`;
//        }

//        console.error(error);
//Propagate to where i want to see

//        recipeView.renderError();
//        recipeView.render(model.state.recipe);
//            const [...recipe] = model.state.search.results;
//            console.log(recipe);
//?search=""
//Timeout function -- rejects the promise after certain number of seconds. If too delay in reply. 
//API used
// https://forkify-api.herokuapp.com/v2
//5ed6604591c37cdc054bc886
//5ed6604591c37cdc054bcc40
///////////////////////////////////////
//    searchButton.addEventListener('click', function () {
//        const query = searchField.value;
//        controlSearchResults(query);
//    });
//    const searchField = document.querySelector('.search__field');
//    const searchButton = document.querySelector('.search__btn');
