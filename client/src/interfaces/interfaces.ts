export interface User {
  first_name: string;
  photo_url: string;
  balance: string;
  lang: string;
  vpn?: string;
  // Can be more
}

export interface ModalFund {
  handleClickFund: () => void;
  lang: string | null;
}
