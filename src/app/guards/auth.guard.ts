import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      // Si no está autenticado, redirige a la página de error 404
      this.router.navigate(['/not-found']);
      return false;
    }

    // Verifica si el usuario tiene el rol adecuado para acceder a la ruta
    const requiredRole = route.data['role'] as string;
    const userRole = this.authService.getUserRole();

    if (requiredRole && userRole !== requiredRole) {
      // Si el rol no coincide, redirige a la página de error 404
      this.router.navigate(['/not-found']);
      return false;
    }

    // Si pasa todas las verificaciones, permite el acceso
    return true;
  }
}
