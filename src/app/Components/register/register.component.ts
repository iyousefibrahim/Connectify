import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterValidator } from '../../Shared/Validators/register.validators';
import { confirmPassword } from '../../Shared/Utils/confirmpassword';
import { AlertErrorComponent } from "../../Shared/Ui/alert-error/alert-error.component";
import { UsersService } from '../../Core/Services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _UsersService = inject(UsersService);
  private readonly _Router = inject(Router);
  private readonly _ToastrService = inject(ToastrService)

  isLoading : boolean = false;
  errorMsg : string = "";

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, RegisterValidator.name],
    email: [null, RegisterValidator.email],
    password: [null, RegisterValidator.password],
    rePassword: [null],
    dateOfBirth: [null, [Validators.required]],
    gender: [null, [Validators.required]]
  }, { validators: [confirmPassword] });

  RegisterSubmit() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this._UsersService.SignUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this._ToastrService.success("You have successfully registered! Enjoy your experience!")
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 2500);
        },
        error:(err)=>{
          this.errorMsg = err.error.error;
          this._ToastrService.error(this.errorMsg);
          
        }
        
      })
    }
  }

}
