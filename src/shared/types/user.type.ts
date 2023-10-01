export enum UserType {
  Simple = 'обычный',
  Pro = 'pro',
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  type: UserType;
};
