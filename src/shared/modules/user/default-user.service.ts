import { UserService } from './user-service.interface.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { Component } from '../../types/index.js';
import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { SortType } from '../../types/sort.enum.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({ email });
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async removeOfferFromFavorite(offerId: string): Promise<void> {
    await this.userModel
      .updateMany({ favoriteOffers: offerId }, { $pull: { favoriteOffers: offerId } })
      .exec();
  }

  public async addOfferToFavorite(
    userId: string,
    offerId: string
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { $addToSet: { favorites: offerId } }, { new: true })
      .exec();
  }

  public async updateById(
    userId: string,
    dto: UpdateUserDto
  ): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, { new: true }).exec();
  }

  public async findUserFavoriteOffers(userId: string): Promise<DocumentType<UserEntity>[] | null> {
    return this.userModel
      .findById(userId, { favoriteOffers: true, _id: false })
      .populate<{ favoriteOffers: DocumentType<UserEntity>[] }>({
        path: 'favoriteOffers',
        options: { sort: { createdAt: SortType.Desc } },
      })
      .exec()
      .then((result) => result?.favoriteOffers ?? null);
  }
}
