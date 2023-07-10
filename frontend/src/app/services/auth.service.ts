import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, first, map, tap } from 'rxjs';

import { HandlerErrorService } from './handler-error.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3080/auth';
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private handlerError: HandlerErrorService) {
    this.isLoggedIn();
  }

  signup(user: { name: string, password: string }): Observable<boolean> {
    return this.http.post<any>(this.url + '/signup', user)
      .pipe(
        map(() => true),
        catchError(this.handlerError.handleError<any>('signup', false))
      );
  }

  login(user: { name: string, password: string }) {
    return this.http.post<any>(this.url + '/login', user, { withCredentials: true })
      .pipe(
        first(),
        tap(() => this.isUserLoggedIn$.next(true)),
        map((token) => {
          sessionStorage.setItem("userId", token.id);
          return true;
        }),
        catchError(this.handlerError.handleError<any>('login', false))
      );
  }

  logout() {
    return this.http.post<any>(this.url + '/logout', {}, { withCredentials: true })
      .pipe(map((res) => {
        if (res) sessionStorage.removeItem("userId");
        return res;
      }));
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<any>(this.url + '/login', { withCredentials: true })
      .pipe(map((res) => {
        sessionStorage.setItem("userId", res.token)
        return res.bool
      }))
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<any>(this.url + '/login', { withCredentials: true })
      .pipe(map((res) => {
        sessionStorage.setItem("userId", res.token)
        return !res.bool}))
  }
}