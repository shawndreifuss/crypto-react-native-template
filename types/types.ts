export interface CryptoData {
  name: string;
  title: string;
  description: string;
  currentPrice: string;
  previousPrice: string;
  avatar: any;
};

export interface Currency {
  id: string;
  symbol: string;
  name: string;
  quote: {
    EUR: {
      price: number;
      percent_change_1h: number;
    };
  };
};


export interface Coin {
  id: number; // Adjusted to number
  image: string; // Adjusted the type to string for the URI
  currency: string;
  amount: string; // Adjusted to string
  changes: string;
  type: 'I' | 'D';
}

