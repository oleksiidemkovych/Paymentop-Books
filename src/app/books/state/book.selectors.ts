import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BOOK_FEATURE_KEY, State } from './book.reducer';

// Feature selector for the whole state
const bookFeatureSelector = createFeatureSelector<State>(BOOK_FEATURE_KEY);

// Selector to get the list of books
export const getAllBooks = createSelector(
  bookFeatureSelector,
  (state) => state.books
);

// Selector to get the selected book
export const getSelectedBook = createSelector(
  bookFeatureSelector,
  (state) => state.selectedBook
);
