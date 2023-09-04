import View from './View.js';
import previewView from './previewView.js';
import * as icons from '../img/icons.svg';



/** 
* Render the received Object of the DOM.
* @param{Object}
* VS Code renders this automatically. 
*
*/

class AddRecipeView extends View {
    _parentElement = document.querySelector('.upload');
    _uploadButton = document.querySelector('.upload__btn');
    _message = 'Recipe was successfully uploaded';
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');


    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }


    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    };

    _addHandlerHideWindow() {
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
        this._overlay.addEventListener('click', this.toggleWindow.bind(this));

    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            const dataArray = [...new FormData(this)];
            const data = Object.fromEntries(dataArray);
            handler(data);
        })

    }

   generateMarkup() {}


}


export default new AddRecipeView();
