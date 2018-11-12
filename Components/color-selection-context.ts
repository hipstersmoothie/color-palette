import * as React from 'react';
import { ColorSelectionContextShape } from './types';
import { makeColor } from './utils';

const ColorsSwatches: ColorSelectionContextShape = {
  currentColors: {
    primary: [makeColor()],
    grey: [makeColor()],
    accent: [makeColor(), makeColor(), makeColor()]
  },
  setColor: () => undefined,
  setCurrentColor: () => undefined
};

const ColorSelectionContext = React.createContext(ColorsSwatches);

export default ColorSelectionContext;
