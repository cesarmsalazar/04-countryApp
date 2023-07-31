import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) {  }
  
  searchCapital( term: string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/capital/${term}`)
    .pipe(
      catchError( () => of([]) )  // atrapando error y devuelve arreglo vacio 
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/alpha/${code}`)
    .pipe(
      catchError( () => of([]) )  // atrapando error y devuelve arreglo vacio 
    );
  }

  searchContry(term: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${ this.apiUrl }/name/${term}`)
    .pipe(
      catchError( () => of([]) )  // atrapando error y devuelve arreglo vacio 
    );

  }

  searchRegion(region: string): Observable<Country[]> {

    return this.http.get<Country[]>(`${ this.apiUrl }/region/${region}`)
    .pipe(
      catchError( () => of([]) )  // atrapando error y devuelve arreglo vacio 
    );

  } 

}