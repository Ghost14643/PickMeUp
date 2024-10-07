import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './pasajero-dashboard.component.html',
  styleUrls: ['./pasajero-dashboard.component.scss']
})
export class PasajeroDashboardComponent implements AfterViewInit {
  direccion: string = '';
  center = { lat: -41.469903, lng: -72.925592 };
  zoom = 12;
  markers: { lat: number, lng: number }[] = [];
  mapLoaded: boolean = false;
  userName: string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.userName = localStorage.getItem('userName') || 'Pasajero';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mapLoaded = true;
    }, 500);
  }

  encontrarAuto() {
    if (!this.direccion) {
      console.error('La dirección no puede estar vacía');
      return;
    }

    this.geocodeAddress(this.direccion).then(coords => {
      const autos = this.obtenerAutosCercanos(coords);
      this.markers = autos.map(auto => ({
        lat: auto.latitude,
        lng: auto.longitude
      }));
    }).catch(error => {
      console.error('Error al geocodificar la dirección:', error);
    });
  }

  seleccionarAuto() {
    console.log('Auto seleccionado');
    this.router.navigate(['/seleccion-auto']);
  }

  openSettings() {
    console.log('Abrir configuración');
  }

  viewProfile() {
    console.log('Ver perfil');
  }

  viewHistory() {
    console.log('Ver historial');
  }

  requestRide() {
    console.log('Solicitar un viaje');
  }

  private async geocodeAddress(address: string): Promise<{ lat: number, lng: number }> {
    try {
      const apiKey = 'YOUR_API_KEY';
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

      const response: any = await this.http.get(geocodeUrl).toPromise();

      if (response.status === 'OK') {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('Geocoding failed');
      }
    } catch (error) {
      console.error('Error en la solicitud de geocodificación:', error);
      throw error;
    }
  }

  private obtenerAutosCercanos(coords: { lat: number, lng: number }) {
    return [
      { latitude: -41.4700, longitude: -72.9250 },
      { latitude: -41.4705, longitude: -72.9255 }
    ];
  }
}
