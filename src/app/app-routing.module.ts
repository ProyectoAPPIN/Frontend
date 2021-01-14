import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'verificacion/:codUsuario',
    loadChildren: () => import('./pages/verificacion/verificacion.module').then( m => m.VerificacionPageModule)
  },
  {
    path: 'registro-entrada',
    loadChildren: () => import('./pages/registro-entrada/registro-entrada.module').then( m => m.RegistroEntradaPageModule)
  },
  {
    path: 'politica',
    loadChildren: () => import('./pages/politica-tratamiento-datos/politica-tratamiento-datos.module').then( m => m.PoliticaTratamientoDatosPageModule)
  },
  {
    path: 'registrar-sintomas',
    loadChildren: () => import('./pages/registrar-sintomas/registrar-sintomas.module').then( m => m.RegistrarSintomasPageModule)
  },
  {
    path: 'pagina-inicio',
    loadChildren: () => import('./pages/pagina-inicio/pagina-inicio.module').then( m => m.PaginaInicioPageModule)
  },
  {
    path: 'registrar-lavado',
    loadChildren: () => import('./pages/registrar-lavado/registrar-lavado.module').then( m => m.RegistrarLavadoPageModule)
  },
  {
    path: 'cuidados',
    loadChildren: () => import('./pages/cuidados/cuidados.module').then( m => m.CuidadosPageModule)
  },
  {
    path: 'alertas',
    loadChildren: () => import('./pages/alertas/alertas.module').then( m => m.AlertasPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
