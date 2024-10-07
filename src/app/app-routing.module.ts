// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PasajeroDashboardComponent } from './pasajero-dashboard/pasajero-dashboard.component';

// Importa los módulos para las páginas
import { ConductorDashboardModule } from './conductor-dashboard/conductor-dashboard.module';
import { PasajeroDashboardModule } from './pasajero-dashboard/pasajero-dashboard.module';
import { SeleccionAutoModule } from './seleccion-auto/seleccion-auto.module'; // Importa el módulo sin la extensión '.ts'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash-screen/splash-screen.module').then(m => m.SplashScreenModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'conductor-dashboard',
    loadChildren: () => import('./conductor-dashboard/conductor-dashboard.module').then(m => m.ConductorDashboardModule)
  },
  {
    path: 'pasajero-dashboard',
    loadChildren: () => import('./pasajero-dashboard/pasajero-dashboard.module').then(m => m.PasajeroDashboardModule)
  },
  {
    path: 'seleccion-auto',
    loadChildren: () => import('./seleccion-auto/seleccion-auto.module').then(m => m.SeleccionAutoModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
