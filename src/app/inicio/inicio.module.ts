import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule, // Añade FormsModule aquí
    InicioRoutingModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule {}
