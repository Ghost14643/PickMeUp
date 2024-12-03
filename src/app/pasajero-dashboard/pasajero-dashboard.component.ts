import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GoogleMapsService } from '../services/google-maps.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './pasajero-dashboard.component.html',
  styleUrls: ['./pasajero-dashboard.component.scss']
})
export class PasajeroDashboardComponent implements AfterViewInit {
  direccion: string = ''; // Dirección ingresada por el usuario
  center = { lat: -41.469903, lng: -72.925592 }; // Centro inicial del mapa
  zoom = 12; // Nivel de zoom del mapa
  markers: { lat: number; lng: number }[] = []; // Lista de marcadores
  mapLoaded: boolean = false; // Bandera para verificar si el mapa está cargado
  userName: string = ''; // Nombre de usuario del localStorage

  // Nuevas propiedades
  origen: string = '';
  destino: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private googleMapsService: GoogleMapsService
  ) {
    this.userName = localStorage.getItem('userName') || 'Pasajero'; // Carga el nombre de usuario del almacenamiento local
  }

  async ngAfterViewInit() {
    try {
      await this.googleMapsService.loadMapsAPIFunction(['places']); // Carga la API de Google Maps con las bibliotecas necesarias
      this.initMap(); // Inicializa el mapa
      this.mapLoaded = true; // Marca que el mapa está listo
    } catch (error) {
      console.error('Error al cargar la API de Google Maps:', error);
    }
  }

  logout() {
    localStorage.removeItem('userName'); // Limpia el almacenamiento local
    this.router.navigate(['/home']); // Navega a la página de inicio
  }

  requestRide() {
    console.log('Solicitar un viaje');
    this.router.navigate(['/seleccion-auto']); // Navega a la página de selección de autos
  }

  // Nuevo método
  calcularRuta() {
    if (!this.origen || !this.destino) {
      console.error('Debes ingresar un origen y un destino');
      return;
    }

    console.log(`Calculando ruta de ${this.origen} a ${this.destino}`);
    // Aquí puedes implementar la lógica para calcular la ruta utilizando la API de Google Maps
  }

  private initMap() {
    const mapElement = document.getElementById('map') as HTMLElement;
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: this.center,
      zoom: this.zoom
    });

    // Agrega los marcadores iniciales
    this.markers.forEach(marker => {
      new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: map
      });
    });
  }

  encontrarAuto() {
    if (!this.direccion.trim()) {
      console.error('La dirección no puede estar vacía');
      return;
    }

    this.geocodeAddress(this.direccion)
      .then(coords => {
        const autos = this.obtenerAutosCercanos(coords);
        this.markers = autos.map(auto => ({
          lat: auto.latitude,
          lng: auto.longitude
        }));

        if (this.mapLoaded) {
          this.updateMarkers();
        }
      })
      .catch(error => {
        console.error('Error al geocodificar la dirección:', error);
      });
  }

  private updateMarkers() {
    const mapElement = document.getElementById('map') as HTMLElement;
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado para actualizar los marcadores');
      return;
    }

    const map = new google.maps.Map(mapElement, {
      center: this.center,
      zoom: this.zoom
    });

    this.markers.forEach(marker => {
      new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: map
      });
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

  private async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${environment.googleMapsApiKey}`;

      const response: any = await this.http.get(geocodeUrl).toPromise();

      if (response.status === 'OK') {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error(`Geocodificación fallida: ${response.status}`);
      }
    } catch (error) {
      console.error('Error en la solicitud de geocodificación:', error);
      throw error;
    }
  }

  private obtenerAutosCercanos(coords: { lat: number; lng: number }) {
    // Simulación de autos cercanos
    return [
      { latitude: coords.lat + 0.001, longitude: coords.lng + 0.001 },
      { latitude: coords.lat - 0.001, longitude: coords.lng - 0.001 }
    ];
  }
}
