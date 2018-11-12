import * as React from 'react';

import Color from '../Components/color';
import ColorSelectionContext from './color-selection-context';
import { ColorSwatch, ColorSection, ColorShade } from './types';

interface ColorRowProps {
  colors: ColorSwatch;
  index: number;
  title: ColorSection;
}

const ColorRow: React.SFC<ColorRowProps> = ({ title, index, colors }) => (
  <ColorSelectionContext.Consumer>
    {({ setCurrentColor }) => (
      <div className="row">
        {[...colors.entries()].map(([shade, color]) => (
          <Color
            key={`${color}-${shade}`}
            shade={shade}
            color={color}
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
          }
        `}</style>
      </div>
    )}
  </ColorSelectionContext.Consumer>
);

export default ColorRow;
