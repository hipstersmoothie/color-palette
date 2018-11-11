import * as React from 'react';
import { ChromePicker } from 'react-color';
import { ColorSection, ColorType } from '../Components/types';

import { makeColor } from '../Components/utils';
import ColorSelectionContext from '../Components/color-selection-context';
import ColorContainer from '../Components/color-container';

const Preview = ({ 
children }) => (
  <section className="header">
    <h1 className="title has-text-white  has-text-centered">
      Color Palette Helper
    </h1>

    <div className="section">{children}</div>

    <style jsx>{`
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        flex-direction: column;
      }
    `}</style>
  </section>
);

const PseudoButtons = () => (
  <div className="mac-buttons">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="14"
      viewBox="0 0 54 14"
    >
      <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
        <circle
          cx="6"
          cy="6"
          r="6"
          fill="#FF5F56"
          stroke="#E0443E"
          stroke-width=".5"
        />
        <circle
          cx="26"
          cy="6"
          r="6"
          fill="#FFBD2E"
          stroke="#DEA123"
          stroke-width=".5"
        />
        <circle
          cx="46"
          cy="6"
          r="6"
          fill="#27C93F"
          stroke="#1AAB29"
          stroke-width=".5"
        />
      </g>
    </svg>

    <style jsx>{`
      .mac-buttons {
    position: absolute;
    top: 10px;
    margin-left: 18px;
    z-index: 2;
    left: 0;
      }
    `}</style>
  </div>
);

export default class Index extends React.Component {
  setColor = (
    section: ColorSection,
    index: number,
    type: ColorType,
    color: string
  ) => {
    const currentSection = this.state.currentColors[section];

    if (!currentSection) {
      return;
    }

    currentSection[index][type] = color;

    if (type === '500') {
      currentSection[index]['900'] = color;
      currentSection[index]['800'] = color;
      currentSection[index]['700'] = color;
      currentSection[index]['600'] = color;
      currentSection[index]['400'] = color;
      currentSection[index]['300'] = color;
      currentSection[index]['200'] = color;
      currentSection[index]['100'] = color;

      console.log(currentSection);
    }

    this.setState({
      [section]: currentSection
    });
  };

  setCurrentColor = (section: ColorSection, index: number, type: ColorType) => {
    this.setState({
      currentColor: [section, index, type]
    });
  };

  state = {
    currentColor: ['primary', 0, '500'] as [ColorSection, number, ColorType],
    currentColors: {
      [ColorSection.primary]: [makeColor()],
      [ColorSection.grey]: [makeColor()],
      [ColorSection.accent]: [makeColor(), makeColor(), makeColor()]
    },
    setColor: this.setColor,
    setCurrentColor: this.setCurrentColor
  };

  render() {
    const [section, index, type] = this.state.currentColor;

    let currentColor = 'grey';

    if (
      section &&
      index !== undefined &&
      type &&
      this.state.currentColors[section][index][type] !== undefined
    ) {
      currentColor = this.state.currentColors[section][index][type]!;
    }

    return (
      <ColorSelectionContext.Provider value={this.state}>
        <div className="root">
          <div className="sections">
            <div className="mac-wrapper has-text-white">
            <PseudoButtons />
              {Object.entries(this.state.currentColors).map(
                ([section, colors]) => (
                  <ColorContainer
                    title={section as ColorSection}
                    colors={colors}
                  />
                )
              )}
            </div>
          </div>

          <Preview>
            <div className="picker-wrapper">
              <ChromePicker
                color={currentColor}
                onChangeComplete={color =>
                  this.setColor(section, index, type, color.hex)
                }
              />
            </div>
          </Preview>
        </div>

        <style jsx>{`
          .root {
            display: flex;
            min-height: 100vh;
            background-color: ${currentColor};
          }
          .sections {
            display: flex;
            align-items: center;
            flex-direction: column;
            max-height: 100vh;
            overflow: scroll;
            padding: 2rem 0;
            flex: 1.2;
          }
          .mac-wrapper {
            background: #292a2b;
            border-radius: 5px;
            padding: 48px 2rem 0;
            position: relative;
          }
          .picker-wrapper {
            margin-bottom: 3rem;
          }
          :global(.chrome-picker) {
            width: 30vw !important;
          }
        `}</style>
      </ColorSelectionContext.Provider>
    );
  }
}
