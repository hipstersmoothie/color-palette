export type ColorType = 900 | 800 | 700 | 600 | 500 | 400 | 300 | 100 | 200;

export enum ColorSection {
  primary = 'primary',
  grey = 'grey',
  accent = 'accent'
}

export interface ColorSwatch {
  '900'?: string;
  '800'?: string;
  '700'?: string;
  '600'?: string;
  500?: string;
  '400'?: string;
  '300'?: string;
  '200'?: string;
  '100'?: string;
}
