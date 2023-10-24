import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(city?: string, limit?: number): Promise<types.DocumentType<OfferEntity>[]>;
  findFavorite(userId: string, limit?: number): Promise<types.DocumentType<OfferEntity>[]>;
  findMostRated(limit?: number): Promise<types.DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<types.DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  calculateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
}
