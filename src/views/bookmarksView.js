import View from './View.js';
import previewView from './previewView.js';
import * as icons from '../img/icons.svg';


class BookMarksView extends View {
    _parentElement = document.querySelector('.bookmarks');
    _errorMessage = "No bookmarks yet.Please add your favorite here.";
    _message = '';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
        handler();
    }


    _generateMarkup = function () {
        return this._data.map(bookmark => previewView.render(bookmark, false)).join('');

    }

}


export default new BookMarksView();
