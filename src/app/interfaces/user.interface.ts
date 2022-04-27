export interface User {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
  role?: string;
  occupation?: string;
  biography?: string;
  active?: boolean;
  img?: string;
  favorites?: any[];
  __v?: number;
  _id?: string;
}

export interface UserLogin {
  username: string;
  password: string;
}
