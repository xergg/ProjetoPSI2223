import { Item } from "./item";

export interface User {
    _id: string;
    name: string;
    password: string;
    profile_image: string;
    items: Array<[Item, string]>;
    following: Array<User>;
    followers: Array<string>;
    wishlist: Array<Item>;
    cart: Array<[Item, Number]>
}