import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BookModel } from '../models/book-model';
import { BookDetailsModel } from '../models/book-details-model';

@Injectable()
export class BookApiService {

  constructor(
    private http: HttpClient
  ) { }

  // In real life scenario server would return only necessary data AKA BookModel
  fetchAllBooks(): Observable<BookModel[]> {
    return this.http.get<BookDetailsModel[]>(`${environment.apiUrl}${environment.books}`)
      .pipe(map((books: BookDetailsModel[]) => {
        return books.map((book: BookDetailsModel) => {
          return {
            id: book.id,
            title: book.title,
            authorName: book.authorName,
            releaseDate: new Date(book.releaseDate),
            coverImage: book.coverImage
          };
        });
      }));
  }

  fetchBookById(id: number): Observable<BookDetailsModel> {
    return this.http.get<BookDetailsModel>(`${environment.apiUrl}${environment.books}/${id}`);
  }

  deleteBookById(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${environment.books}/${id}`);
  }

  addBook(book: BookDetailsModel): Observable<BookDetailsModel> {
    return this.http.post<BookDetailsModel>(`${environment.apiUrl}${environment.books}`, book);
  }

  editBook(book: BookDetailsModel): Observable<BookDetailsModel> {
    return this.http.put<BookDetailsModel>(`${environment.apiUrl}${environment.books}/${book.id}`, book);
  }
}