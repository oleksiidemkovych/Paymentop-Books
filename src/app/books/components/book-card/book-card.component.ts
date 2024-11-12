import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BookModel } from '../../models/book-model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Base64ImagePipe } from '../../../shared/pipes/base64.pipe';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    Base64ImagePipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {

  @Input({ required: true }) book: BookModel = {} as BookModel;
  @Output() editBookClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteBookClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() openBookDetailsClick: EventEmitter<void> = new EventEmitter<void>();
}
