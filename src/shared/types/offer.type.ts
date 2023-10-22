import { CityNameType} from './city-name.type.js';
import { HousingType } from './housing.type.js';
import { Goods} from './goods.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityNameType;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  host: User;
  lat: number;
  lng: number;
  commentsCount:number;
};
