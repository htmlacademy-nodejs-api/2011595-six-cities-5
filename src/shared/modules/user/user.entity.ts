import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import { User, UserType } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';
import {OfferEntity} from "../offer/index.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: false, default: '' })
  public avatarPath?: string;

  @prop({ required: true, default: '' })
  public firstname: string;

  @prop({ required: false, default: '' })
  public lastname?: string;

  @prop({ required: false, default: UserType.Simple, enum: UserType, type: () => String })
  public type!: UserType;

  @prop({ required: true, default: '' })
  private password?: string;


  @prop({
    required: true,
    ref: () => OfferEntity,
    _id: false,
    default: [],
    type: () => [OfferEntity],
  })
  public favoriteOffers: Ref<OfferEntity>[];

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstname = userData.firstname;
    this.lastname = userData.lastname;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    return createSHA256(password, salt) === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
