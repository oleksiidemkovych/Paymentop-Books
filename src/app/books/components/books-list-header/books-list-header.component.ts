import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookDialogModel } from '../../models/book-dialog-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-books-list-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  templateUrl: './books-list-header.component.html',
  styleUrl: './books-list-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListHeaderComponent {

  @Output() addBook = new EventEmitter<BookDialogModel>();
  @Output() search = new EventEmitter<string>();

  onAddBookClick(): void {
    this.addBook.emit({ id: 0, isEditMode: true });
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
