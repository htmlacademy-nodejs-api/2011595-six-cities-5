import { Goods } from '../../../types/index.js';
import { HousingType } from '../../../../../dist/shared/types/housing.type.js';
import { CityNameType } from '../../../../../dist/shared/types/city-name.type.js';

export class UpdateOfferDto {
  public title: string;
  public description: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public rooms: number;
  public maxAdults: number;
  public price: number;
  public lat: number;
  public lng: number;
  public postDate: Date;
  public city: CityNameType;
  public type: HousingType;
  public goods: Goods[];
  public userId: string;
}
