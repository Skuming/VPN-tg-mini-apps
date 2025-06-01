export interface User {
  user_id: bigint;
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
  isOnline: boolean;
}

export interface InfoContextProps {
  info: User | undefined;
  setInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export interface TG {
  tg?: {
    enableClosingConfirmation: () => void;
  };
}

export interface GlobalModal {
  heading: string;
  content: string | undefined | null;
  showModal: boolean;
  setShowModal: () => void;
}
