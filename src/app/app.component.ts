import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Solicitar Viaje', url: '/solicitar-viaje', icon: 'car' },
    { title: 'Historial de Viajes', url: '/historial-viajes', icon: 'time' },
    { title: 'Ajustes de Perfil', url: '/perfil-ajustes', icon: 'settings' },
    { title: 'Contactar Soporte', url: '/soporte', icon: 'help-circle' },
    { title: 'Acerca de', url: '/acerca-de', icon: 'information-circle' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' }, // Agregamos la opción de cerrar sesión
  ];
  public labels = ['Seguridad', 'Confiabilidad', 'Rapidez', 'Comunidad'];

  showSplash: boolean = true; // Controla la visualización de la pantalla de presentación

  constructor(private router: Router) {}

  ngOnInit() {
    // Simula un tiempo de carga de 3 segundos
    setTimeout(() => {
      this.showSplash = false;
      this.router.navigate(['/home']); // Redirige a la página principal
    }, 3000); // Cambia el tiempo según sea necesario
  }
}
