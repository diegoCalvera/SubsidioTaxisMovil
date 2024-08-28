import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userRole: string | null = null;

  constructor(private databaseService: DatabaseService) {}

  async login(usuario: string, contrasena: string): Promise<boolean> {
    try {
      const user = await firstValueFrom(
        this.databaseService.loginUsuario(usuario, contrasena)
      );
      if (user.length > 0) {
        this.userRole = user[0].rol;
        localStorage.setItem('userRole', user[0].rol);
        localStorage.setItem('placa', user[0].placa);
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error en la autenticación:', error);
      return false;
    }
  }

  getUserRole(): string | null {
    return this.userRole || localStorage.getItem('userRole');
  }

  getPlaca(): string | null {
    return localStorage.getItem('placa');
  }

  logout(): void {
    this.userRole = null;
    localStorage.removeItem('userRole');
    localStorage.removeItem('placa');
  }
}
