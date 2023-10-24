import { UserType } from '../../../types/index.js';

export class UpdateUserDto {
  public email?: string;
  public avatarPath?: string;
  public firstname?: string;
  public lastname?: string;
  public type?: UserType;
}
