import { Rate } from "./rate";

export interface Item {
  _id: string;
  name: string;
  type: string;
  description: string;
  platform: Array<string>;
  languages: Array<string>;
  price: number;
  principal_image?: string;
  rates: Array<Rate>;
}