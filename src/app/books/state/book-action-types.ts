import { BaseActionTypes } from "../../shared/state/models/base-action-types";

export class BookActionTypes extends BaseActionTypes {
  public static readonly preamble: string = '[Books]-';

  public static readonly getAllBooks: string = BookActionTypes.preamble + BaseActionTypes.getAll;
  public static readonly getAllBooksSuccess: string = BookActionTypes.getAllBooks + BaseActionTypes.success;
  public static readonly getAllBooksFailure: string = BookActionTypes.getAllBooks + BaseActionTypes.failure;

  public static readonly getBook: string = BookActionTypes.preamble + 'GET Book';
  public static readonly getBookSuccess: string = BookActionTypes.getBook + BaseActionTypes.success;
  public static readonly getBookFailure: string = BookActionTypes.getBook + BaseActionTypes.failure;

  public static readonly createBook: string = BookActionTypes.preamble + BaseActionTypes.create;
  public static readonly createBookSuccess: string = BookActionTypes.createBook + BaseActionTypes.success;
  public static readonly createBookFailure: string = BookActionTypes.createBook + BaseActionTypes.failure;

  public static readonly editBook: string = BookActionTypes.preamble + BaseActionTypes.edit;
  public static readonly editBookSuccess: string = BookActionTypes.editBook + BaseActionTypes.success;
  public static readonly editBookFailure: string = BookActionTypes.editBook + BaseActionTypes.failure;

  public static readonly deleteBook: string = BookActionTypes.preamble + BaseActionTypes.delete;
  public static readonly deleteBookSuccess: string = BookActionTypes.deleteBook + BaseActionTypes.success;
  public static readonly deleteBookFailure: string = BookActionTypes.deleteBook + BaseActionTypes.failure;

  public static readonly clearBooksState: string = BookActionTypes.preamble + BaseActionTypes.clear;
  public static readonly clearSelectedBookState: string = BookActionTypes.preamble + BaseActionTypes.clear + 'Selected Book';
}