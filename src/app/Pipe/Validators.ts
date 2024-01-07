// password-match.validator.ts

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPass = control.get('confirmPass');

  if (!password || !confirmPass || password.value === confirmPass.value) {
    return null; 
  }

  return { passwordMismatch: true };
};
