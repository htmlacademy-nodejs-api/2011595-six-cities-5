import { CityNameType } from '../types/city-name.type.js';

export const CITIES: Record<CityNameType, {name:string;lat:number;lng:number}> = {
  Paris: {
    name: CityNameType.Paris,
    lat: 48.85661,
    lng: 2.351499,
  },
  Cologne: {
    name: CityNameType.Cologne,
    lat: 50.938361,
    lng: 6.959974,
  },
  Brussels: {
    name: CityNameType.Brussels,
    lat: 50.846557,
    lng: 4.351697,
  },
  Amsterdam: {
    name: CityNameType.Amsterdam,
    lat: 52.370216,
    lng: 4.895168,
  },
  Hamburg: {
    name: CityNameType.Hamburg,
    lat: 53.550341,
    lng: 10.000654,
  },
  Dusseldorf: {
    name: CityNameType.Dusseldorf,
    lat: 51.225402,
    lng: 6.776314,
  },
} as const;
