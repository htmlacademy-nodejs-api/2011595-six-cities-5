import { City } from './city-name.type.js';
import { HousingType } from './housing.type.js';
import { Good } from './goods.type.js';
import { User } from './user.type.js';
import { LocationType } from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  guests: number;
  price: number;
  goods: Good[];
  host: User;
  location: LocationType;
};
