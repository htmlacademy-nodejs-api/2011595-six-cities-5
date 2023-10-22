import { CityNameType, Goods, HousingType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public rooms: number;
  public maxAdults: number;
  public price: number;
  public commentsCount: number;
  public location: { lat: number; lng: number };
  public postDate: Date;
  public city: CityNameType;
  public type: HousingType;
  public goods: Goods[];
  public userId: string;
}
