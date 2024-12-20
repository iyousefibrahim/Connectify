import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { TimelineComponent } from './Components/timeline/timeline.component';
import { loggedinGuard } from './Core/Guards/loggedin.guard';
import { authGuard } from './Core/Guards/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

export const routes: Routes = [

    {
        path: "", component: AuthLayoutComponent, canActivate: [loggedinGuard],
        children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: LoginComponent, title: "Login" },
            { path: "register", component: RegisterComponent, title: "Register" },
        ]
    },
    {
        path: "", component: MainLayoutComponent, canActivate: [authGuard],
        children: [
            { path: "home", component: TimelineComponent, title: "Home" },
            { path: "profile", component: ProfileComponent, title: "My Profile" },
            { path: "changepassword", component: ChangePasswordComponent, title: "Change Passowrd" }
        ]
    },
    { path: "**", component: NotfoundComponent, title: "NotFound 404!" }
];
