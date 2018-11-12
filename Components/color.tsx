import * as React from 'react';
import { ColorShade } from './types';

interface ColorProps {
  color?: string;
  shade?: ColorShade;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const Color: React.SFC<ColorProps> = ({ color, onClick, shade }) => (
  <div className="wrapper" onClick={onClick}>
    <div className="color" />
    {shade && <span className="shade">{shade}</span>}

    <style jsx>{`
      .color {
        background-color: ${color};
        height: 50px;
        border-radius: 5px;
      }

      .wrapper:not(:last-of-type) {
        margin-right: 10px;
      }

      .wrapper {
        width: 50px;
        text-align: center;
      }
    `}</style>
  </div>
);

Color.defaultProps = {
  onClick: () => undefined
};

export default Color;
