import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { BookDetailsModel } from '../../models/book-details-model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import { DATEPICKER_FORMATS } from '../../../shared/models/date-picker-formats';
import { TypedFormControls } from '../../../shared/models/typed-form-controls';
import { Base64ImagePipe } from '../../../shared/pipes/base64.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    Base64ImagePipe
  ],
  providers: [provideMomentDateAdapter(DATEPICKER_FORMATS)],
  templateUrl: './book-edit.component.html',
  styleUrl: './book-edit.component.scss'
})
export class BookEditComponent implements OnInit {
  bookDetails: BookDetailsModel | undefined = inject<BookDetailsModel>(MAT_DIALOG_DATA);

  form: FormGroup<TypedFormControls<BookDetailsModel>> =
    new FormGroup<TypedFormControls<BookDetailsModel>>({
      title: new FormControl<string | null>('', Validators.required),
      authorName: new FormControl<string | null>('', Validators.required),
      description: new FormControl<string | null>('', Validators.required),
      releaseDate: new FormControl<Date | null>(new Date(), Validators.required),
      coverImage: new FormControl<string | null>(''),
      numberOfPages: new FormControl<number | null>(null, Validators.min(1)),
      publisher: new FormControl<string | null>(''),
    });

    constructor(
      private cdr: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    if (this.bookDetails) {
      this.form.patchValue(this.bookDetails);
    }
  }

  onYearSelect(
    event: Moment,
    datePicker: MatDatepicker<Moment>,
  ): void {
    // Set `releaseDate` to the beginning of the selected year
    this.form.controls.releaseDate.setValue(event.startOf('year').toDate());
    datePicker.close();
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.form.controls.coverImage.setValue(base64String); // Set base64 in form control
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }
}
