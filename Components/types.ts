export type ColorShade = 900 | 800 | 700 | 600 | 500 | 400 | 300 | 100 | 200;

export enum ColorSection {
  primary = 'primary',
  grey = 'grey',
  accent = 'accent'
}

export type ColorSwatch = Map<ColorShade, string>;

export interface ColorMap {
  [ColorSection.primary]: ColorSwatch[];
  [ColorSection.grey]: ColorSwatch[];
  [ColorSection.accent]: ColorSwatch[];
}

export interface ColorSelectionContextShape {
  setCurrentColor: (
    title: ColorSection,
    index: number,
    shade: ColorShade
  ) => void;
  setColor: (
    title: ColorSection,
    index: number,
    shade: ColorShade,
    color: string
  ) => void;
  currentColors: ColorMap;
}
