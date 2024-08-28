import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const role = this.authService.getUserRole();

        if (role && role !== '') {
            console.log('Role:', role);
            return true;
        } else {
            console.log('No role found, redirecting to login');
            this.router.navigate(['/login']);
            return false;
        }
    }
}