import { createReducer, on } from '@ngrx/store';
import * as BookActions from './book.actions';
import { BookModel } from '../models/book-model';
import { BookDetailsModel } from '../models/book-details-model';

export const BOOK_FEATURE_KEY = 'book';

export interface State {
  books: BookModel[] | undefined;
  selectedBook: BookDetailsModel | undefined | null;
  loading: boolean;
}

export const initialState: State = {
  books: [],
  selectedBook: null,
  loading: false
};

export const bookReducer = createReducer<State>(
  initialState,
  on(
    BookActions.getAllBooks,
    BookActions.getBook,
    BookActions.createBook,
    BookActions.editBook,
    BookActions.deleteBook,
    (state) => ({ ...state, loading: true })
  ),
  on(
    BookActions.getAllBooksFailure,
    BookActions.getBookFailure,
    BookActions.createBookFailure,
    BookActions.editBookFailure,
    BookActions.deleteBookFailure,
    (state) => ({ ...state, loading: initialState.loading })
  ),
  on(
    BookActions.getAllBooksSuccess,
    (state: State, { payload }): State => ({
      ...state,
      books: payload,
      loading: initialState.loading
    })
  ),
  on(
    BookActions.getBookSuccess,
    (state: State, { payload }): State => ({
      ...state,
      selectedBook: payload,
      loading: initialState.loading
    })
  ),
  on(
    BookActions.clearSelectedBookState,
    (state) => ({ ...state, selectedBook: initialState.selectedBook })
  )
);
