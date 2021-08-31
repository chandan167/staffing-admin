

export interface User{
  readonly id: number;
  name: string;
  email: string;
  email_verified_at: string|null;
  ip: string |null;
  image: string|null;
  phone: string|null;
  phone_verified_at: string|null;
  block: string | null;
  created_at: string;
  updated_at: string;
}


