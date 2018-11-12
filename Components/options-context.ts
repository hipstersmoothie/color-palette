import * as React from 'react';
import { OptionsContextShape } from './types';

const OptionsContextDefault: OptionsContextShape = {
  showLabels: true,
  autoScale: true,
  toggleCheckBox: () => () => undefined
};

const OptionsContext = React.createContext(OptionsContextDefault);

export default OptionsContext;
