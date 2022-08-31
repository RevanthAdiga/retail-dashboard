import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for data
   */
  get data$(): Observable<any> {
    return this._data.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get data
   */
  shotByRace(): Observable<any> {
    return this._httpClient
      .get('http://127.0.0.1:5000/charts/1')
      .pipe(
        tap((response: any) => {
          this._data.next(response);
        })
      );
  }
 topCityShootings():Observable<any>{
  return this._httpClient
  .get('http://127.0.0.1:5000/charts/2')
  .pipe(
    tap((response: any) => {
      this._data.next(response);
    })
  );
}
 mannerOfDeath():Observable<any>{
  return this._httpClient
  .get('http://127.0.0.1:5000/charts/7')
  .pipe(
    tap((response: any) => {
      this._data.next(response);
    })
  );
 }
 ageDistribution():Observable<any>{
  return this._httpClient
  .get('http://127.0.0.1:5000/charts/8')
  .pipe(
    tap((response: any) => {
      this._data.next(response);
    })
  );
 }
 mentalIllness():Observable<any>{
  return this._httpClient
  .get('http://127.0.0.1:5000/charts/3')
  .pipe(
    tap((response: any) => {
      this._data.next(response);
    })
  );
 }
 threatLevel():Observable<any>{
  return this._httpClient
  .get('http://127.0.0.1:5000/charts/4')
  .pipe(
    tap((response: any) => {
      this._data.next(response);
    })
  );
 }
 armsCategory():Observable<any>{
  return this._httpClient
  .get('http://127.0.0.1:5000/charts/6')
  .pipe(
    tap((response: any) => {
      this._data.next(response);
    })
  );
 }
}