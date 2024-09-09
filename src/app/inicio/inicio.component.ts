import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements AfterViewInit {
  direccion: string = '';
  center = { lat: -41.469903, lng: -72.925592 }; // Coordenadas por defecto
  zoom = 12;
  markers: { lat: number, lng: number }[] = [];
  mapLoaded: boolean = false; // Estado para la animación de carga del mapa

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    // Espera a que el mapa se cargue para aplicar la animación
    setTimeout(() => {
      this.mapLoaded = true;
    }, 500); // Ajusta el tiempo según sea necesario
  }

  encontrarAuto() {
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
    // Aquí puedes agregar la lógica que necesites para seleccionar el auto
  }

  private geocodeAddress(address: string): Promise<{ lat: number, lng: number }> {
    const apiKey = 'AIzaSyDdiMuBIWLyHk2hwBTkgqML0zIelLgjUZs'; // Usa la API key de forma segura
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    return this.http.get(geocodeUrl).toPromise().then((response: any) => {
      if (response.status === 'OK') {
        const location = response.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        throw new Error('Geocoding failed');
      }
    });
  }

  private obtenerAutosCercanos(coords: { lat: number, lng: number }) {
    // Lógica para obtener autos cercanos desde tu base de datos
    // Esto es solo un ejemplo, reemplaza con tu lógica real
    return [
      { latitude: -41.4700, longitude: -72.9250 },
      { latitude: -41.4705, longitude: -72.9255 }
    ];
  }
}
