import { Response } from "./base.interface";


export interface Admin {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  ip: string;
  image: string;
  super_admin: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface TokenData {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthData {
  token_data: TokenData;
  admin: Admin;
}

export interface ProfileData {
  admin: Admin;
}



export interface AuthResponse extends Response{
  data: AuthData;
};


export interface ProfileResponse extends Response{
  data: ProfileData;
};
