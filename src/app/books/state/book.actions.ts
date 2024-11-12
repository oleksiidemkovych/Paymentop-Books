import { createActionHelper } from "../../shared/state/helpers/create-action-helper";
import { BookDetailsModel } from "../models/book-details-model";
import { BookModel } from "../models/book-model";
import { BookActionTypes } from "./book-action-types";


export const getAllBooks = createActionHelper<void>(BookActionTypes.getAllBooks);
export const getAllBooksSuccess = createActionHelper<BookModel[]>(BookActionTypes.getAllBooksSuccess);
export const getAllBooksFailure = createActionHelper<string>(BookActionTypes.getAllBooksFailure);

export const getBook = createActionHelper<number>(BookActionTypes.getBook);
export const getBookSuccess = createActionHelper<BookDetailsModel>(BookActionTypes.getBookSuccess);
export const getBookFailure = createActionHelper<string>(BookActionTypes.getBookFailure);

export const createBook = createActionHelper<BookDetailsModel>(BookActionTypes.createBook);
export const createBookSuccess = createActionHelper<BookDetailsModel>(BookActionTypes.createBookSuccess);
export const createBookFailure = createActionHelper<string>(BookActionTypes.createBookFailure);

export const editBook = createActionHelper<BookDetailsModel>(BookActionTypes.editBook);
export const editBookSuccess = createActionHelper<BookDetailsModel>(BookActionTypes.editBookSuccess);
export const editBookFailure = createActionHelper<string>(BookActionTypes.editBookFailure);

export const deleteBook = createActionHelper<number>(BookActionTypes.deleteBook);
export const deleteBookSuccess = createActionHelper<number>(BookActionTypes.deleteBookSuccess);
export const deleteBookFailure = createActionHelper<string>(BookActionTypes.deleteBookFailure);

export const clearBooksState = createActionHelper<void>(BookActionTypes.clearBooksState);
export const clearSelectedBookState = createActionHelper<void>(BookActionTypes.clearSelectedBookState);
