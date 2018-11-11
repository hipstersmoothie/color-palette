import * as React from 'react';
import { makeColor } from './utils';

const ColorsSwatches = {
  currentColors: { primary: [makeColor()] }
};

const ColorSelectionContext = React.createContext(ColorsSwatches);

export default ColorSelectionContext;
