/**
 * Middleware for error handler
 */

 /** Package imports */
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
 
 /**
   * @description error handling for Observables.
   * @private
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof MessageService
   */
export const observableHandleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with the HttpErrorResponse
    return throwError(error);
  }