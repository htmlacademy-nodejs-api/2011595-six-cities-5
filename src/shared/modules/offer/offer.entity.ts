import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import {CityNameType, Goods, HousingType} from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps{
  @prop({ required: true, trim: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public previewImage!: string;

  @prop()
  public images!: string[];

  @prop({ default: false })
  public isPremium!: boolean;

  @prop({ default: false })
  public isFavorite!: boolean;

  @prop()
  public rating!: number;

  @prop()
  public rooms!: number;

  @prop()
  public maxAdults!: number;

  @prop()
  public price!: number;

  @prop()
  public commentsCount!: number;

  @prop()
  public location!: { lat: number; lng: number };

  @prop({ required: true })
  public postDate!: Date;

  @prop({ required: true, enum: CityNameType, type: () => String })
  public city!: CityNameType;

  @prop({ required: true, enum: HousingType, type: () => String })
  public type!: HousingType;

  @prop({ required: true, enum: Goods })
  public goods!: Goods[];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
