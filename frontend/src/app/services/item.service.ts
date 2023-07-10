import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { HandlerErrorService } from './handler-error.service.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = 'http://localhost:3080';

  constructor(private http: HttpClient, private handlerError: HandlerErrorService) { }

  getItem(id: string): Observable<Item> {
    const sub_url = `/item/${id}`;
    return this.http.get<any>(this.url + sub_url)
  }

  getItems(): Observable<Item[]> {
    const sub_url = '/items';
    return this.http.get<any>(this.url + sub_url);
  }

  addRate(id: string, item: { user: string, rate: string, opinion: string }): Observable<any> {
    const sub_url = `/item/${id}/createRate`
    return this.http.post<any>(this.url + sub_url, item);
  }

  addOpinion(opinion: { itemId: string, rateId: string, user: string, flag: boolean }) {
    const sub_url = `/item/${opinion.itemId}/addOpinion`
    return this.http.post<any>(this.url + sub_url, opinion).pipe(
      map((res) => res),
      catchError(this.handlerError.handleError<any>('signup', false))
    );
  }

  addComment(opinion: { itemId: string, rateId: string, user: string, comment: string }) {
    const sub_url = `/item/${opinion.itemId}/addComment`
    return this.http.post<any>(this.url + sub_url, opinion).pipe(
      map((res) => res),
      catchError(this.handlerError.handleError<any>('signup', false))
    );
  }
}
