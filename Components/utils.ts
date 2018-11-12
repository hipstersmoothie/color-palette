import { ColorShade, ColorSwatch } from './types';

export const makeColor = (): ColorSwatch =>
  new Map<ColorShade, string>([
    [900, 'grey'],
    [800, 'grey'],
    [700, 'grey'],
    [600, 'grey'],
    [500, 'grey'],
    [400, 'grey'],
    [300, 'grey'],
    [200, 'grey'],
    [100, 'grey']
  ]);
