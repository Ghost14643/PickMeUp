import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouteReuseStrategy } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps'; // Importa GoogleMapsModule
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule

@NgModule({
  declarations: [
    AppComponent
    // otros componentes si los tienes
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    BrowserAnimationsModule 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    // otros proveedores si los tienes
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
