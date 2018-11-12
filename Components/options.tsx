import * as React from 'react';

import CheckBox from './checkbox';
import OptionsContext from './options-context';

interface OptionsProps {
  currentColor: string;
}

const Options: React.SFC<OptionsProps> = ({ currentColor }) => (
  <OptionsContext.Consumer>
    {({ showLabels, autoScale, toggleCheckBox }) => (
      <React.Fragment>
        <CheckBox
          id="auto-scale"
          label="Automatically Scale Colors"
          isChecked={autoScale}
          currentColor={currentColor}
          onChange={toggleCheckBox('autoScale')}
        />
        <CheckBox
          id="show-labels"
          label="Show Shade Labels"
          isChecked={showLabels}
          currentColor={currentColor}
          onChange={toggleCheckBox('showLabels')}
        />
      </React.Fragment>
    )}
  </OptionsContext.Consumer>
);

export default Options;
