import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
  findUserFavoriteOffers(userId: string): Promise<DocumentType<UserEntity>[] | null>;
  addOfferToFavorite(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
  removeOfferFromFavorite(userId: string, offerId: string): Promise<void>;
}
