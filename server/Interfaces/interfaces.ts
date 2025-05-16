export interface User {
  id: number;
  user_id: number;
  balance: string;
  have_sub: number;
  vpn: null | string;
  expiry_date: null | string | number;
  photo_url: string;
  first_name: string;
  lang: string;
  username: string;
}
