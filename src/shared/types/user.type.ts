export enum UserType {
  Simple = 'обычный',
  Pro = 'pro',
}

export type User = {
  firstname: string;
  lastname: string;
  email: string;
  avatarPath: string;
  type: UserType;
};
