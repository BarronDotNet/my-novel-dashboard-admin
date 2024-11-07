export enum UserRoleEnum {
  ADMIN = 'Admin',
  EDITER = 'Editer',
  PUBLISHER = 'Publisher',
  USER = 'User',
}

export interface IUsers {
  _id?: string;
  migrationDocumentId: string;
  email: string;
  facebookId?: string;
  facebookToken?: string;
  facebookTokenExpure?: string;
  gender?: string;
  imageTemp?: string;
  imageUrl?: string;
  password: string;
  role: UserRoleEnum;
  tel: string;
  timestamp: Date;
  type: string;
  userLogin: string;
  userOldId: string;
  username: string;
}
