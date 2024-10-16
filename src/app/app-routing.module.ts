import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; 

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
    loadChildren: () => import('./conductor-dashboard/conductor-dashboard.module').then(m => m.ConductorDashboardModule),
    canActivate: [AuthGuard], // Aplica el guard aquí
    data: { role: 'conductor' } // Especifica que solo conductores pueden acceder
  },
  {
    path: 'pasajero-dashboard',
    loadChildren: () => import('./pasajero-dashboard/pasajero-dashboard.module').then(m => m.PasajeroDashboardModule),
    canActivate: [AuthGuard], 
    data: { role: 'pasajero' } 
  },
  {
    path: 'seleccion-auto',
    loadChildren: () => import('./seleccion-auto/seleccion-auto.module').then(m => m.SeleccionAutoModule),
    canActivate: [AuthGuard], 
    data: { role: 'pasajero' } 
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule)
  },
  {
    path: '**', // Cualquier ruta no definida
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
