import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HandlerErrorService } from './handler-error.service.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    private url = 'http://localhost:3080';

    constructor(private http: HttpClient, private handlerError: HandlerErrorService) { }

    getUser(userId: string) {
        const sub_url = `/user/${userId}`;
        return this.http.get<any>(this.url + sub_url);
    }

    getUsers(){
        const sub_url = `/users`;
        return this.http.get<any>(this.url + sub_url);
    }

    addItemToCart(userId: string, itemId: string) {
        const sub_url = `/user/${userId}/cart`
        return this.http.put<any>(this.url + sub_url, {itemId});
    }
    
    getCart(id:string) {
        const sub_url = `/user/${id}/cart`
        return this.http.get<any>(this.url + sub_url)
    }

    updateCart(json: {id:string, item: {id: string, quantity: number}}) {
        const sub_url = `/user/${json.id}/cart`
        return this.http.post<any>(this.url + sub_url, { item: json.item })
    }

    finish(json: { id: string, nif: string, residence: string, payOption: string }){
        const sub_url = `/user/${json.id}/cart/finish`
        return this.http.post<any>(this.url + sub_url, json);
    }

    saveProfile(json: { id: string, name: string, profile_image: string | undefined }) {
        const sub_url = `/user/${json.id}`
        return this.http.put<any>(this.url + sub_url, json);
    }
    
    getLibrary(id:string){
        const sub_url = `/user/${id}/library`
        return this.http.get<any>(this.url + sub_url);
    }

    getWishlist(id:string){
        const sub_url = `/user/${id}/wishlist`
        return this.http.get<any>(this.url + sub_url)
    }

    updateWishList(userId:string, itemId: string) {
        const sub_url = `/user/${userId}/wishlist`
        return this.http.post<any>(this.url + sub_url, {itemId})
    }

    addItemToWishList(userId: string, itemId: string) {
        const sub_url = `/user/${userId}/wishlist`
        return this.http.put<any>(this.url + sub_url, {itemId});
    }

    getFollowList(userId: string){
        const sub_url = `/user/${userId}/following`
        return this.http.get<any>(this.url + sub_url);
    }

    addFollowing(userId: string, followId: string){
        const sub_url = `/user/${userId}/following`
        return this.http.post<any>(this.url + sub_url, {followId});
    }

    removeFollowing(userId: string, followId: string){
        const sub_url = `/user/${userId}/following`
        return this.http.put<any>(this.url + sub_url, {followId});
    }



}