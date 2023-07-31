import { CacheStore, RegionCountries } from './../interfaces/cache-store.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { region } from '../interfaces/region.type.interface';

@Injectable({providedIn: 'root'})

export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'
  public cacheStore: CacheStore = {
    byCapital : { term: '', countries: []},
    byCountries : { term: '', countries: []},
    byRegion : { region: '', countries: []},
  }

  constructor(private http: HttpClient) {
    console.log('Countries Service Init');
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url: string = `${ this.apiUrl }/alpha/${code}`;

    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null) )  // atrapando error y devuelve arreglo vacio
    );
  }

  searchCapital( term: string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/capital/${term}`)
    .pipe(
      catchError( () => of([]) ),  // atrapando error y devuelve arreglo vacio
      // delay( 2000 ),  pausa de dos segundos solo para el ejemplo
    ).pipe (
      tap( countries => this.cacheStore.byCapital = {term: term, countries: countries} )  // devuelve lo que hay en cacheStore
    );
  }

  searchContry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/name/${term}`)
    .pipe(
      catchError( () => of([]) ),  // atrapando error y devuelve arreglo vacio
    ).pipe(
      tap( countries => this.cacheStore.byCountries = {term: term, countries: countries} )  // devuelve lo que hay en cacheStore
    );
  }

  searchRegion(region: region): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/region/${region}`)
    .pipe(
      catchError( () => of([]) )  // atrapando error y devuelve arreglo vacio
    ).pipe(
      tap( countries => this.cacheStore.byRegion = {region: region, countries: countries} )  // devuelve lo que hay en cacheStore
    );
  }

}
