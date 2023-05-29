export interface Card {
  name: string;
  id: string;
  setName: string;
  series: string;
  image: string;
  tcgUrl: string;
  marketPrice: number;
}

export interface UserCard {
    id: number;
    displayname: string;
    email: string;
    cardname: string;
    type: string;
    cardcondition: string;
    defect: string;
    price: string;
    available: string;
    image: number[];
}

export interface MarketCard {
  id: number;
  displayname: string;
  email: string;
  cardname: string;
  type: string;
  cardcondition: string;
  defect: string;
  price: string;
  available: string;
  image: string;
}

export interface OfferCard {
  id: number;
  email: string;
  cardname: string;
  offeremail: string;
  name: string;
  offerprice: string;
}
