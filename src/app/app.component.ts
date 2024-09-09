import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Solicitar Viaje', url: '/solicitar-viaje', icon: 'car' },
    { title: 'Historial de Viajes', url: '/historial-viajes', icon: 'time' },
    { title: 'Ajustes de Perfil', url: '/perfil-ajustes', icon: 'settings' },
    { title: 'Contactar Soporte', url: '/soporte', icon: 'help-circle' },
    { title: 'Acerca de', url: '/acerca-de', icon: 'information-circle' },
    { title: 'Cerrar Sesión', url: '/logout', icon: 'log-out' }, // Agregamos la opción de cerrar sesión
  ];
  public labels = ['Seguridad', 'Confiabilidad', 'Rapidez', 'Comunidad'];
  
  constructor() {}
}
