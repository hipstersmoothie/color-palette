import * as React from 'react';
import { ColorShade } from './types';

interface ColorProps {
  color?: string;
  shade?: ColorShade;
  showLabel: boolean;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
}

const Color: React.FunctionComponent<ColorProps> = ({ color, onClick, shade, showLabel }) => {
  const className =
    shade === 500
      ? 'default-shade'
      : shade === 900
      ? 'darkest-shade'
      : shade === 100
      ? 'lightest-shade'
      : '';

  return (
    <div className={`wrapper ${className}`} onClick={onClick}>
      <div className="color" />
      {shade && showLabel && <span className="shade">{shade}</span>}

      <style jsx>{`
        .color {
          background-color: ${color};
          height: 50px;
          border-radius: 5px;
        }

        .wrapper {
          margin-right: 1%;
        }

        .wrapper {
          width: 50px;
          text-align: center;
        }

        @media screen and (min-width: 1100px) {
        .wrapper:not(:last-of-type) {
          margin-right: 10px;
        }
        }
      `}</style>
    </div>
  );
};

Color.defaultProps = {
  onClick: () => undefined
};

export default Color;
