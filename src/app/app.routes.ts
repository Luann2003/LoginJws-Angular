import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "login", component:LoginComponent
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [AuthGuardService]
    }
];
