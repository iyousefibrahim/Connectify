import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../Core/Services/users.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterValidator } from '../../Shared/Validators/register.validators';
import { AlertErrorComponent } from "../../Shared/Ui/alert-error/alert-error.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AlertErrorComponent, ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  unSubscribe: Subscription = new Subscription(); 
  isLoading: boolean = false;
  errorMsg: string = "";
  loginSuccess : string = "";

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, RegisterValidator.email],
    password: [null, RegisterValidator.password],
  });

  LoginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.unSubscribe.add(this._UsersService.SignIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginSuccess = res.message;
          this.isLoading = false;
          localStorage.setItem("userToken", res.token);
          this._ToastrService.success("Login successful!")
          setTimeout(() => {
            this._Router.navigate(['/home']);
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
