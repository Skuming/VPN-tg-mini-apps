export interface User {
  id: number;
  user_id: number;
  balance: string;
  have_sub: number;
  vpn: null | string;
  expiry_date: number | null;
  photo_url: string;
  first_name: string;
  lang: string;
  up: number;
  down: number;
  expiryTime: number;
  username: string;
}

export interface InfoContextProps {
  info: User | undefined;
  setInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export interface GlobalModal {
  heading: string;
  content: string | undefined | null;
  showModal: boolean;
  setShowModal: () => void;
}
