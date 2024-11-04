import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsers = [
    { email: 'isa@gmail.com', password: '1630', name: 'Isa Alvarado', role: 'conductor' },
    { email: 'martina@gmail.com', password: '2024', name: 'Martina González', role: 'pasajero' }

    
  ];

  constructor(private http: HttpClient) {}

  registrar(nombre: string, correo: string, contrasena: string, rol: string): Observable<any> {
    const userData = { nombre, correo, contrasena, rol };
    return this.http.post('/api/registro', userData); // Asegúrate de que esta ruta sea la correcta
  }

  // Método para limpiar el localStorage
  private clearStorage(): void {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }

  // Método para manejar el inicio de sesión
  login(email: string, password: string): Observable<{ success: boolean, role: string, name?: string }> {
    const user = this.validUsers.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Guardamos la información del usuario en el localStorage
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userRole', user.role);
      console.log('User logged in:', { name: user.name, role: user.role });
      return of({ success: true, role: user.role, name: user.name });
    } else {
      console.log('Login failed for:', email);
      return of({ success: false, role: '', name: '' });
    }
  }

  // Método para cerrar sesión
  logout(): Observable<void> {
    this.clearStorage(); // Llamar al método para limpiar el almacenamiento
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
