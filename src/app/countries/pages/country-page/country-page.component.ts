import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ){


  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode( id )  ),
      )
      .subscribe( country => {   // devuelve los parametros de la url
        console.log( country ); // ya no es un arreglo sino solo un elemento o null

        if ( !country ) {
          return this.router.navigateByUrl('');  // si no existe sale de la ruta o lo redirige  a otra
        }

        this.country = country;

        return;
      }
    )
  }


}
