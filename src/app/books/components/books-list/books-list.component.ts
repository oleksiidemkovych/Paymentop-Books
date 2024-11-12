import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { BookFacade } from '../../state/book.facade';
import { filter, map, Observable, combineLatest, startWith, switchMap, take, tap } from 'rxjs';
import { BookModel } from '../../models/book-model';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../book-card/book-card.component';
import { MatButtonModule } from '@angular/material/button';
import { BooksListHeaderComponent } from '../books-list-header/books-list-header.component';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsModel } from '../../models/book-details-model';
import { FormControl } from '@angular/forms';
import { BookEditComponent } from '../book-edit/book-edit.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BookCardComponent,
    BooksListHeaderComponent
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit {

  books$: Observable<BookModel[]>;
  filteredBooks$: Observable<BookModel[]> = new Observable<BookModel[]>();
  searchControl = new FormControl('');
  dialog = inject(MatDialog);

  constructor(private bookFacade: BookFacade) {
    this.books$ = this.bookFacade.books$;
  }

  ngOnInit(): void {
    this.bookFacade.fetchAllBooks();
    this.filterBooks();
  }

  createBook(): void {
    this.openBookDialog().pipe(
      take(1)
    ).subscribe((bookDetails) => {
      this.bookFacade.addBook(bookDetails);
    })
  }

  editBook(bookId: number): void {
    this.bookFacade.fetchBookById(bookId);
    this.bookFacade.selectedBook$.pipe(
      filter(Boolean),
      take(1),
      switchMap((book) => this.openBookDialog(book)),
      tap(() => this.bookFacade.clearSelectedBookState()),
      filter(Boolean)
    ).subscribe((bookDetails) => this.bookFacade.editBook({ ...bookDetails, id: bookId }));
  }

  onSearch(term: string): void {
    this.searchControl.setValue(term);
  }

  deleteBookById(id: number): void {
    this.bookFacade.deleteBook(id);
  }

  openBookDetailsDialog(bookId: number): void {
    this.bookFacade.fetchBookById(bookId);
    this.bookFacade.selectedBook$.pipe(
      filter(Boolean),
      take(1),
      switchMap((book) =>
        this.dialog.open(BookDetailsComponent, {
          data: book
        }).afterClosed()
      ),
      tap(() => this.bookFacade.clearSelectedBookState()),
      filter(Boolean)
    ).subscribe();
  }

  private openBookDialog(bookDetails?: BookDetailsModel): Observable<BookDetailsModel> {
    return this.dialog.open(BookEditComponent, {
      data: bookDetails
    }).afterClosed()
  }

  private filterBooks() {
    this.filteredBooks$ = combineLatest([
      this.books$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([books, searchTerm]) =>
        books.filter(book =>
          searchTerm
            ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.authorName.toLowerCase().includes(searchTerm.toLowerCase())
            : true
        )
      )
    );
  }
}
