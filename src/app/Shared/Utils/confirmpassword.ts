import { AbstractControl } from "@angular/forms"

export function confirmPassword(registerForm: AbstractControl) {
  if (registerForm.get('password')?.value === registerForm.get('rePassword')?.value) {
    return null
  }
  else {
    return { mismatch: true }
  }
}