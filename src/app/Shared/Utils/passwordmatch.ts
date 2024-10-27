import { FormGroup } from "@angular/forms";

export function passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (!password || password.length === 0) {
      return { emptyPassword: true };
    }

    return password === rePassword ? null : { mismatch: true };
  }