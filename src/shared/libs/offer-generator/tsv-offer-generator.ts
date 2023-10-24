import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import dayjs from 'dayjs';
import { CityNameType } from '../../types/city-name.type.js';
import { HousingType } from '../../types/housing.type.js';
import { Goods } from '../../types/goods.type.js';
import { CITIES } from '../../const/cities.js';
import { UserType } from '../../types/user.type.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_RATING = 0;
const MAX_RATING = 10;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 8;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 100;

const BOOLEAN_OPTIONS = [true, false];

export class TSVRentOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const mockData = this.mockData;

    const title: string = getRandomItem(mockData.titles);
    const description: string = getRandomItem(mockData.descriptions);
    const postDate: string = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city: CityNameType = getRandomItem(Object.values(CityNameType));
    const previewImage: string = getRandomItem(mockData.images);
    const images: string = getRandomItems(mockData.images).join(';');
    const isPremium: boolean = getRandomItem(BOOLEAN_OPTIONS);
    const isFavorite: boolean = getRandomItem(BOOLEAN_OPTIONS);
    const rating: number = generateRandomValue(MIN_RATING, MAX_RATING);
    const type: HousingType = getRandomItem(Object.values(HousingType));
    const rooms: number = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const maxAdults: number = generateRandomValue(MIN_ADULTS, MAX_ADULTS);
    const price: number = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const goods: string = getRandomItems(Object.values(Goods)).join(';');
    const authorName: string = getRandomItem(mockData.authorNames);
    const email: string = getRandomItem(mockData.emails);
    const authorType: UserType = getRandomItem(Object.values(UserType));
    const authorAvatar: string = getRandomItem(Object.values(mockData.images));
    const commentsCount: number = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

    const lat: number = CITIES[city].lat;
    const lng: number = CITIES[city].lng;
    return [
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
      email,
      authorType,
      authorAvatar,
      commentsCount,
      lat,
      lng,
    ].join('\t');
  }
}
