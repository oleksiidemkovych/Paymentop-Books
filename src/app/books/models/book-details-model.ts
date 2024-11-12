import { BookModel } from "./book-model";

export interface BookDetailsModel extends BookModel {
  numberOfPages: number;
  publisher: string;
  description: string;
}