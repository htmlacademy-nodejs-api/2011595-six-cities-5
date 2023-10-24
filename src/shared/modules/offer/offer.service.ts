import { inject } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { OfferService } from './offer-service.interface.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { SortType } from '../../types/sort.enum.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

const DEFAULT_OFFER_LIMIT = 60;

export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId', 'categories']).exec();
  }

  public async deleteById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    const offer = await this.offerModel.exists({ _id: offerId });

    return offer !== null;
  }

  public async find(limit = DEFAULT_OFFER_LIMIT): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate<DocumentType<OfferEntity>>([
        {
          $lookup: {
            from: 'users',
            pipeline: [{ $project: { _id: false, favoriteOffers: true } }],
            as: 'host',
          },
        },
        { $unwind: { path: '$host', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            isFavorite: {
              $cond: [
                {
                  $and: [
                    { $ne: [{ $type: '$host.favoriteOffers' }, 'missing'] },
                    { $in: ['$_id', '$host.favoriteOffers'] },
                  ],
                },
                true,
                false,
              ],
            },
            id: { $toString: '$_id' },
          },
        },
        { $unset: 'host' },
        { $sort: { createdAt: SortType.Desc } },
        { $limit: limit },
      ])
      .exec();
  }

  public async findFavorite(
    userId: string,
    limit = 3
  ): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate<DocumentType<OfferEntity>>([
        {
          $lookup: {
            from: 'users',
            pipeline: [
              { $match: { $expr: { $eq: [userId, { $toString: '$_id' }] } } },
              { $project: { _id: false, favoriteOffers: true } },
            ],
            as: 'host',
          },
        },
        { $unwind: { path: '$host', preserveNullAndEmptyArrays: true } },
        { $match: { $expr: { $in: ['$_id', '$host.favoriteOffers'] } } },
        { $addFields: { isFavorite: true, id: { $toString: '$_id' } } },
        { $unset: 'host' },
        { $sort: { createdAt: SortType.Desc } },
        { $limit: limit },
      ])
      .exec();
  }

  public async findMostRated(
    limit = DEFAULT_OFFER_LIMIT
  ): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate<DocumentType<OfferEntity>>([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'host',
          },
        },
        { $unwind: { path: '$host', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            isFavorite: {
              $cond: [
                {
                  $and: [
                    { $ne: [{ $type: '$host.favoriteOffers' }, 'missing'] },
                    { $in: ['$_id', '$host.favoriteOffers'] },
                  ],
                },
                true,
                false,
              ],
            },
            id: { $toString: '$_id' },
          },
        },
        { $unset: 'host' },
        { $sort: { createdAt: SortType.Desc } },
        { $limit: limit },
      ])
      .exec();
  }

  public async findPremium(
    city?: string,
    limit = DEFAULT_OFFER_LIMIT,
  ): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate<DocumentType<OfferEntity>>([
        {
          $match: {
            $and: [{ $expr: { $eq: ['$city', city] } }, { $expr: { $eq: ['$isPremium', true] } }],
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'host',
          },
        },
        { $unwind: { path: 'host', preserveNullAndEmptyArrays: true } },
        {
          $addFields: {
            isFavorite: {
              $cond: [
                {
                  $and: [
                    { $ne: [{ $type: 'host.favoriteOffers' }, 'missing'] },
                    { $in: ['$_id', 'host.favoriteOffers'] },
                  ],
                },
                true,
                false,
              ],
            },
            id: { $toString: '$_id' },
          },
        },
        { $unset: 'host' },
        { $sort: { createdAt: SortType.Desc } },
        { $limit: limit },
      ])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, { $inc: { commentsCount: 1 } }).exec();
  }

  public async calculateRating(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .aggregate([
        { $match: { $expr: { $eq: [offerId, { $toString: '$_id' }] } } },
        {
          $lookup: {
            from: 'comments',
            let: { commentsCount: '$commentsCount' },
            pipeline: [
              { $match: { $expr: { $eq: [offerId, { $toString: '$offerId' }] } } },
              { $group: { _id: null, rating: { $sum: '$rating' } } },
              { $project: { _id: false, rating: { $divide: ['$rating', '$$commentsCount'] } } },
            ],
            as: 'commentsRatings',
          },
        },
        { $unwind: { path: '$commentsRatings' } },
        { $project: { _id: false, commentsRatings: true } },
      ])
      .exec()
      .then((res) => res[0].commentsRatings.rating);
    const newRating: number = result.toFixed(1);

    return this.offerModel.findByIdAndUpdate(offerId, { $set: { rating: newRating } });
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true, returnDocument: 'after' })
      .exec();

    return result;
  }
}
