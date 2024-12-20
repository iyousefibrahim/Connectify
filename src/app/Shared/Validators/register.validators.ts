import { Validators } from "@angular/forms";

export const RegisterValidator = {
    name: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    email: [Validators.required, Validators.email],
    password: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)],
}