import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../Core/Services/users.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterValidator } from '../../Shared/Validators/register.validators';
import { AlertErrorComponent } from "../../Shared/Ui/alert-error/alert-error.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertErrorComponent, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  isLoading: boolean = false;
  errorMsg: string = "";

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, RegisterValidator.email],
    password: [null, RegisterValidator.password],
  });

  LoginSubmit() {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this._UsersService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          localStorage.setItem("userToken", res.token);
          this._ToastrService.success("Login successful!")
          setTimeout(() => {
            this._Router.navigate(['/home']);
          }, 2500);
        },
        error: (err) => {
          this.errorMsg = err.error.error;
          this._ToastrService.error(this.errorMsg);
        }

      })
    }
  }

}
