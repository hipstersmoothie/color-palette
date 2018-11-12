import * as React from 'react';

import CheckBox from './checkbox';
import OptionsContext from './options-context';

interface OptionsProps {
  primaryColor: string;
}

const Options: React.SFC<OptionsProps> = ({ primaryColor }) => (
  <OptionsContext.Consumer>
    {({ showLabels, autoScale, toggleCheckBox }) => (
      <React.Fragment>
        <CheckBox
          id="auto-scale"
          label="Automatically Scale Colors"
          isChecked={autoScale}
          primaryColor={primaryColor}
          onChange={toggleCheckBox('autoScale')}
        />
        <CheckBox
          id="show-labels"
          label="Show Shade Labels"
          isChecked={showLabels}
          primaryColor={primaryColor}
          onChange={toggleCheckBox('showLabels')}
        />
      </React.Fragment>
    )}
  </OptionsContext.Consumer>
);

export default Options;
