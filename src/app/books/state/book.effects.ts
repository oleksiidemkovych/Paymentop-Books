import { inject} from "@angular/core";
import { catchError, exhaustMap, finalize, map, mergeMap, of } from 'rxjs';
import { Action } from "@ngrx/store";
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as BookActions from './book.actions';

import { BookApiService } from "../services/book-api.service";
import { BookFacade } from "./book.facade";
import { BookDetailsModel } from "../models/book-details-model";


// Helper function to inject dependencies
function injectDependencies() {
  return {
    actions$: inject(Actions),
    booksService: inject(BookApiService),
    bookFacade: inject(BookFacade)
  };
}

export const getAllBooks$ = createEffect(
  () => {
    const { actions$, booksService } = injectDependencies();
    return actions$.pipe(
      ofType(BookActions.getAllBooks),
      mergeMap(() =>
        booksService.fetchAllBooks().pipe(
          map((books) => BookActions.getAllBooksSuccess(books)),
          catchError((error) => of(BookActions.getAllBooksFailure(error))),
        )
      )
    );
  },
  { functional: true }
);

export const getBook$ = createEffect(
  () => {
    const { actions$, booksService } = injectDependencies();
    return actions$.pipe(
      ofType(BookActions.getBook),
      exhaustMap((action: Action & { payload: number | undefined }) =>
        action.payload !== undefined
          ? booksService.fetchBookById(action.payload).pipe(
              map((book) => BookActions.getBookSuccess(book)),
              catchError((error) => of(BookActions.getBookFailure(error)))
            )
          : of(BookActions.getBookFailure('Invalid book ID'))
      )
    );
  },
  { functional: true }
);

export const createBook$ = createEffect(
  () => {
    const { actions$, booksService, bookFacade } = injectDependencies();
    return actions$.pipe(
      ofType(BookActions.createBook),
      exhaustMap((action: Action & { payload: BookDetailsModel | undefined }) =>
        action.payload
          ? booksService.addBook(action.payload).pipe(
              map((book) => BookActions.createBookSuccess(book)),
              catchError((error) => of(BookActions.createBookFailure(error))),
              finalize(() => bookFacade.fetchAllBooks())
            )
          : of(BookActions.createBookFailure('Invalid book details'))
      )
    );
  },
  { functional: true }
);

export const editBook$ = createEffect(
  () => {
    const { actions$, booksService, bookFacade } = injectDependencies();
    return actions$.pipe(
      ofType(BookActions.editBook),
      exhaustMap((action: Action & { payload: BookDetailsModel | undefined }) =>
        action.payload
          ? booksService.editBook(action.payload).pipe(
              map((book) => BookActions.editBookSuccess(book)),
              catchError((error) => of(BookActions.editBookFailure(error))),
              finalize(() => bookFacade.fetchAllBooks())
            )
          : of(BookActions.editBookFailure('Invalid book details'))
      )
    );
  },
  { functional: true }
);

export const deleteBook$ = createEffect(
  () => {
    const { actions$, booksService, bookFacade } = injectDependencies();
    return actions$.pipe(
      ofType(BookActions.deleteBook),
      exhaustMap((action: Action & { payload: number | undefined }) =>
        action.payload !== undefined
          ? booksService.deleteBookById(action.payload).pipe(
              map(() => BookActions.deleteBookSuccess(action.payload)),
              catchError((error) => of(BookActions.deleteBookFailure(error))),
              finalize(() => bookFacade.fetchAllBooks())
            )
          : of(BookActions.deleteBookFailure('Invalid book ID'))
      )
    );
  },
  { functional: true }
);
