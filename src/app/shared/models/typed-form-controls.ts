import { FormArray, FormControl, FormGroup } from '@angular/forms';

export type TypedFormControls<T extends Record<any, any>> = {
  [K in keyof T]: T[K] extends Array<infer R>
    ? FormArray<
        R extends Record<any, any>
          ? FormGroup<TypedFormControls<R>>
          : FormControl<R | null>
      >
    : T[K] extends Date
      ? FormControl<Date | null>
    : T[K] extends Record<any, any>
      ? FormGroup<TypedFormControls<T[K]>>
      : FormControl<T[K] | null>;
};
