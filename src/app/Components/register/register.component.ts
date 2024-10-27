import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterValidator } from '../../Shared/Validators/register.validators';
import { confirmPassword } from '../../Shared/Utils/confirmpassword';
import { AlertErrorComponent } from "../../Shared/Ui/alert-error/alert-error.component";
import { UsersService } from '../../Core/Services/users.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { passwordMatchValidator } from '../../Shared/Utils/passwordmatch';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent, RouterLink, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);
  unSubscribe: Subscription = new Subscription();
  registerSuccess: string = "";

  isLoading: boolean = false;
  errorMsg: string = "";

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, RegisterValidator.name],
    email: [null, RegisterValidator.email],
    password: [null, RegisterValidator.password],
    rePassword: [null],
    dateOfBirth: [null, [Validators.required]],
    gender: [null, [Validators.required]]
  }, { validators: [confirmPassword, passwordMatchValidator] });



  RegisterSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.unSubscribe.add(this._UsersService.SignUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.registerSuccess = res.message;
          this.isLoading = false;
          this._ToastrService.success("You have successfully registered! Enjoy your experience!")
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 2500);
        },
        error: (err) => {
          this.errorMsg = err.error.error;
          this.isLoading = false;
          this._ToastrService.error(this.errorMsg);
        }
      }));
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
