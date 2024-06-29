export interface Currency {
    id: string;
    symbol: string;
    name: string;
    quote: {
      EUR: {
        price: number;
        percent_change_1h: number;
        // Add other properties as needed
      };
      // Add other quote currencies as needed
    };
    // Add other properties as needed
  }
  