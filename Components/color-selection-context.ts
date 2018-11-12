import * as React from 'react';
import { makeColor } from './utils';
import { ColorSelectionContextShape } from './types';

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
