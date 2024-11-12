import { Route } from '@angular/router';
import { BooksListComponent } from './books/components/books-list/books-list.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  {
    path: 'books',
    component: BooksListComponent,
    providers: [
    
    ]
  },
  { path: '**', redirectTo: 'books' }
];