import * as React from 'react';

import Color from '../Components/color';
import ColorSelectionContext from './color-selection-context';
import { ColorSwatch } from './types';

interface ColorRowProps {
  colors: ColorSwatch;
  index: number;
  title: string;
}

const ColorRow: React.SFC<ColorRowProps> = ({ title, index, colors }) => {
  return (
    <ColorSelectionContext.Consumer>
      {({ currentColors, setCurrentColor }) => {
        return (
          <div className="row">
            {Object.entries(colors).map(([state, color]) => (
              <Color
                state={state}
                color={color}
                onClick={() => setCurrentColor(title, index, state)}
              />
            ))}

            <style jsx>{`
              .row {
                display: flex;
                margin: auto;
                justify-content: space-between;
                flex-direction: row-reverse;
                margin-bottom: 1rem;
              }
            `}</style>
          </div>
        );
      }}
    </ColorSelectionContext.Consumer>
  );
};

export default ColorRow;
