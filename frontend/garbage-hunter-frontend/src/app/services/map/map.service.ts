import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';
import { observableHandleError } from 'src/app/middlewares/errorhandler.middleware';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  /**
   * @description Nominatim URL.
   * see documentation: https://nominatim.org/release-docs/develop/
   */
  private nominatimUrl = environment.nominatimUrl;

  /**
   * @description format for the response API-request.
   */
  private format = 'json';

  constructor(private http: HttpClient) {}

  /**
   * @description get data for reverse geocoding from Nominatim API.
   */
  getAddressFromLatLon = (lat: number, lon: number): Observable<any> => {
    const url = `${this.nominatimUrl}/reverse?format=${this.format}&lat=${lat}&lon=${lon}`;
    return this.http.get<object>(url).pipe(
      map((response) => response['address']),
      catchError((err) => observableHandleError(err))
    );
  };
}
