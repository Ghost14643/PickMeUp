import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-conductor-dashboard',
  templateUrl: './conductor-dashboard.component.html',
  styleUrls: ['./conductor-dashboard.component.scss']
})
export class ConductorDashboardComponent implements OnInit {
  trips: any[] = [];
  isLoading: boolean = false;
  error: string = '';
  userName: string = ''; // Añadido para almacenar el nombre del usuario

  // Propiedades para el mapa
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 }; // Ajusta según sea necesario
  zoom: number = 8;

  constructor(
    private router: Router,
    private tripService: TripService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadTrips();
    this.userName = localStorage.getItem('userName') || 'Invitado'; // Obtén el nombre del usuario del almacenamiento local

    // Opcional: Configura la ubicación inicial del mapa si es necesario
    this.setInitialMapLocation();
  }

  loadTrips() {
    this.isLoading = true;
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información de los viajes.';
        this.isLoading = false;
      }
    });
  }

  setInitialMapLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.zoom = 12; // Ajusta el nivel de zoom si es necesario
      }, () => {
        this.center = { lat: -41.469903, lng: -72.925592 }; // Ubicación de respaldo
      });
    } else {
      this.center = { lat: -41.469903, lng: -72.925592 }; // Ubicación de respaldo
    }
  }
  

  viewRoutes() {
    this.router.navigate(['/routes']);
  }

  requestHelp() {
    // Lógica para solicitar ayuda
    console.log('Solicitar ayuda');
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    // Elimina el nombre del usuario del almacenamiento local y realiza otras acciones necesarias para el cierre de sesión
    localStorage.removeItem('userName');
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
