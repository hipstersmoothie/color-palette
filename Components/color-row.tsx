import * as React from 'react';

import Color from '../Components/color';
import ColorSelectionContext from './color-selection-context';
import { ColorSwatch, ColorSection, ColorShade } from './types';
import OptionsContext from './options-context';

interface ColorRowProps {
  colors: ColorSwatch;
  index: number;
  title: ColorSection;
}

const ColorRow: React.SFC<ColorRowProps> = ({ title, index, colors }) => (
  <OptionsContext.Consumer>
    {options => (
      <ColorSelectionContext.Consumer>
        {({ setCurrentColor }) => (
          <div className="row">
            {[...colors.entries()].map(([shade, color]) => (
              <Color
                key={`${color}-${shade}`}
                shade={shade}
                color={color}
                showLabel={options.showLabels}
                onClick={() =>
                  setCurrentColor(title, index, Number(shade) as ColorShade)
                }
              />
            ))}

            <style jsx>{`
              .row {
                display: flex;
                margin: auto;
                justify-content: space-between;
                margin-bottom: 1rem;
                flex-wrap: wrap;
              }

              .row > :global(*) {
                flex-basis: 29%;
                margin-right: 1%;
              }

              @media screen and (min-width: 767px) {
                .row > :global(*) {
                  flex-basis: 20%;
                }
              }

              @media screen and (min-width: 1100px) {
                .row {
                  flex-wrap: unset;
                }
                .row > :global(*) {
                  flex-basis: 50px;
                }
              }
            `}</style>
          </div>
        )}
      </ColorSelectionContext.Consumer>
    )}
  </OptionsContext.Consumer>
);

export default ColorRow;
