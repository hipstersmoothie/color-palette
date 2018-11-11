import * as React from 'react';
import { ColorType } from './types';

interface ColorProps {
  color?: ColorType;
  state: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Color: React.SFC<ColorProps> = ({ color, onClick, state }) => {
  return (
    <div className="wrapper" onClick={onClick}>
      <div className="color" />
      <span className="state">{state}</span>

      <style jsx>{`
        .color {
          background-color: ${color};
          height: 50px;
          border-radius: 5px;
        }

        .wrapper:not(:first-of-type) {
          margin-right: 10px;
        }

        .wrapper {
          width: 50px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Color;
