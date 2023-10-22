import { Offer } from '../types/index.js';
import { CityNameType } from '../types/index.js';
import { HousingType } from '../types/index.js';
import { Goods } from '../types/index.js';
import { UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
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
    maxAdults,
    price,
    goods,
    authorName,
    authorEmail,
    authorType,
    authorAvatar,
    commentsCount,
    lat,
    lng,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title: title,
    description: description,
    postDate: new Date(postDate),
    city: CityNameType[city as keyof typeof CityNameType],
    previewImage: previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseInt(rating, 10),
    type: HousingType[type as keyof typeof HousingType],
    rooms: Number.parseInt(rooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';').map((good) => Goods[good as keyof typeof Goods]),
    host: {
      firstname: authorName,
      lastname: authorName,
      email: authorEmail,
      avatarPath: authorAvatar,
      type: UserType[authorType as keyof typeof UserType],
    },
    location: {
      lat: Number.parseFloat(lat),
      lng: Number.parseFloat(lng),
    },
    commentsCount: Number.parseInt(commentsCount, 10),
  };
}
