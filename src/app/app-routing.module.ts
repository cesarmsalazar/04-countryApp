import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes : Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries', 
    loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule)  // carga un modulo de manera perezosa
  },
  {
    path: '**', // si es cualquier ruta por defecto que lo envie al home 
    redirectTo: ''
  }
]

@NgModule({
  imports: [
    // si es el router principal usa el forRoot, caso contrario forChild
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
