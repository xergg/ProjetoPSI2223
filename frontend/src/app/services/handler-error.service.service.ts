import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HandlerErrorService {
    handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            return of(result as T)
        }
    }
}