import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../types/offer.type.js';
import { CityNameType } from '../../types/city-name.type.js';
import { HousingType } from '../../types/housing.type.js';
import { Good } from '../../types/goods.type.js';
import { UserType } from '../../types/user.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private fileName: string) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          description,
          postDate,
          city,
          previewImage,
          images,
          isPremium,
          isFavorite,
          rating,
          type,
          rooms,
          guests,
          price,
          goods,
          authorName,
          authorEmail,
          authorAvatar,
          authorPassword,
          authorType,
          latitude,
          longitude,
        ]) => ({
          title: title,
          description: description,
          postDate: new Date(postDate),
          city: { name: CityNameType[city as keyof typeof CityNameType] },
          previewImage: previewImage,
          images: images.split(','),
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseInt(rating, 10),
          type: HousingType[type as keyof typeof HousingType],
          rooms: Number.parseInt(rooms, 10),
          guests: Number.parseInt(guests, 10),
          price: Number.parseInt(price, 10),
          goods: goods.split(';').map((good) => Good[good as keyof typeof Good]),
          host: {
            name: authorName,
            email: authorEmail,
            avatar: authorAvatar,
            password: authorPassword,
            type: UserType[authorType as keyof typeof UserType],
          },
          location: {
            latitude: Number.parseFloat(latitude),
            longitude: Number.parseFloat(longitude),
          },
        })
      );
  }
}
