export interface Type {
  type: {
    name: string;
  };
}
export interface PokeDetails {
  name: string;
  height: string;
  weight: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: Type[];
}
export interface Pokemnos {
  name: string;
  url: string;
  details: PokeDetails;
}
