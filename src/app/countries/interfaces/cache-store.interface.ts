import { Country } from "./country.interface"
import { region } from "./region.type.interface";

export interface CacheStore {
  byCapital : TermCountries;
  byCountries : TermCountries;
  byRegion : RegionCountries;
}

export interface TermCountries {
    term : string;
    countries: Country[];
}

export interface RegionCountries {
  region: region;
  countries: Country[];
}
