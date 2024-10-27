import { Component, inject } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../Core/Services/users.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RegisterValidator } from '../../Shared/Validators/register.validators';
import { AlertErrorComponent } from "../../Shared/Ui/alert-error/alert-error.component";
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [NavComponent, AlertErrorComponent, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService);

  unSubscribe: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMsg: string = "";
  loginSuccess: string = "";

  ChangePasswordForm: FormGroup = this._FormBuilder.group({
    password: [null, RegisterValidator.password],
    newPassword: [null, RegisterValidator.password],
  });

  ChangePasswordSubmit() {
    if (this.ChangePasswordForm.valid) {
      this.isLoading = true;
      this.unSubscribe.add(this._UsersService.ChangePassword(this.ChangePasswordForm.value).subscribe({
        next: (res) => {
          this.loginSuccess = res.message;
          this.isLoading = false;
          localStorage.setItem("userToken", res.token);
          this._ToastrService.success("Password updated successfully!")
          setTimeout(() => {
            this._Router.navigate(['/profile']);
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
