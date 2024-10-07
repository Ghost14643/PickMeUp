import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsers = [
    { email: 'isa@gmail.com', password: '1630', name: 'Isa Alvarado', role: 'conductor' },
    { email: 'martina@gmail.com', password: '2024', name: 'Martina González', role: 'pasajero' }
  ];

  constructor() {} // No es necesario inyectar Router aquí

  // Método para manejar el inicio de sesión
  login(email: string, password: string): Observable<{ success: boolean, role: string, name?: string }> {
    const user = this.validUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Guardamos la información del usuario en el localStorage
      localStorage.setItem('userName', user.name!);
      localStorage.setItem('userRole', user.role);
      
      return of({ success: true, role: user.role, name: user.name });
    } else {
      return of({ success: false, role: '', name: '' });
    }
  }

  // Método para cerrar sesión
  logout(): Observable<void> {
    // Limpiamos el localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    
    return of(); // Retornamos un observable vacío
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('userName');
  }

  // Método para obtener el nombre del usuario
  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  // Método para obtener el rol del usuario
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
