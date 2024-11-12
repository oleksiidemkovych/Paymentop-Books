import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromBookState from './book.reducer';
import * as bookActions from './book.actions';
import * as bookSelectors from './book.selectors';

import { StoreHelperService } from "../../shared/state/helpers/store-helper.service";

import { BookModel } from "../models/book-model";
import { BookDetailsModel } from "../models/book-details-model";

@Injectable()
export class BookFacade {

  books$: Observable<BookModel[]>;
  selectedBook$: Observable<BookDetailsModel>;

  constructor(
    private storeHelper: StoreHelperService<fromBookState.State>,
    private store: Store
  ) {
    this.books$ = this.storeHelper.stateStreamSelector(bookSelectors.getAllBooks);
    this.selectedBook$ = this.storeHelper.stateStreamSelector(bookSelectors.getSelectedBook);
  }

  fetchAllBooks() {
    this.storeHelper.dispatchAction(bookActions.getAllBooks());
  }

  fetchBookById(id: number) {
    this.storeHelper.dispatchAction(bookActions.getBook(id));
  }

  addBook(book: BookDetailsModel) {
    this.storeHelper.dispatchAction(bookActions.createBook(book));
  }

  editBook(book: BookDetailsModel) {
    this.storeHelper.dispatchAction(bookActions.editBook(book));
  }

  deleteBook(id: number) {
    this.storeHelper.dispatchAction(bookActions.deleteBook(id));
  }

  clearBooksState() {
    this.store.dispatch(bookActions.clearBooksState());
  }

  clearSelectedBookState() {
    this.store.dispatch(bookActions.clearSelectedBookState());
  }

}