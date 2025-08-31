
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export type Language = 'en' | 'fr' | 'de';

export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  amazonDomain: string;
  currencySymbol: string;
}

export interface PcPart {
  name: string;
  price: number;
}

export interface PowerSupply extends PcPart {
  wattage: number;
}

export interface PcBuild {
  cpu: PcPart;
  gpu: PcPart;
  motherboard: PcPart;
  ram: PcPart;
  ssd: PcPart;
  psu: PowerSupply;
  case: PcPart;
  cooler: PcPart;
  totalPrice: number;
  totalWattage: number;
}

export interface GeneratorOptions {
    budget: number;
    usage: string;
    resolution: string;
    platform: string;
}
