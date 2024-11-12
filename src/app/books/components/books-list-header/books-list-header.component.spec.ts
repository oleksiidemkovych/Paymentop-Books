import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListHeaderComponent } from './books-list-header.component';

describe('BooksListHeaderComponent', () => {
  let component: BooksListHeaderComponent;
  let fixture: ComponentFixture<BooksListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
