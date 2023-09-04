import View from './View.js';
import * as icons from '../img/icons.svg';


class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            
            const goToPage = +btn.dataset.goto;
            console.log("Go page",goToPage);
            console.log(typeof(goToPage));
            handler(goToPage);
        })
    }

    _generateMarkup = function () {
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        console.log("Total Pages",numPages);

        if (this._data.page === 1 && numPages > 1) {
            return `<button data-goto = "${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
        }

        if (this._data.page === numPages && numPages > 1) {
            return `<button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>`;
        }

        if (this._data.page < numPages) {
            return `<button data-goto = "${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button>
            <button data-goto = "${this._data.page + 1}"class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;

        }

        return '';
    }
}

export default new PaginationView();
