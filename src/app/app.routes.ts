import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { TimelineComponent } from './Components/timeline/timeline.component';

export const routes: Routes = [

    {
        path: "", component: AuthLayoutComponent,
        children: [
            { path: "", redirectTo: "login", pathMatch: "full" },
            { path: "login", component: LoginComponent, title: "Login" },
            { path: "register", component: RegisterComponent, title: "Register" },
        ]
    },
    {
        path: "", component: MainLayoutComponent,
        children: [
            { path: "home", component: TimelineComponent, title: "Home" },
        ]
    },
    { path: "**", component: NotfoundComponent, title: "NotFound 404!" }
];
