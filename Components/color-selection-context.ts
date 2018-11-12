import * as React from 'react';
import { ColorSelectionContextShape } from './types';

const ColorsSwatches: ColorSelectionContextShape = {
  currentColors: {
    primary: [],
    grey: [],
    accent: []
  },
  setColor: () => undefined,
  setCurrentColor: () => undefined
};

const ColorSelectionContext = React.createContext(ColorsSwatches);

export default ColorSelectionContext;
