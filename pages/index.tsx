import fontColor from 'font-color-contrast';
import * as React from 'react';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { ColorSection, ColorShade, ColorSwatch } from '../Components/types';

import ColorContainer from '../Components/color-container';
import ColorSelectionContext from '../Components/color-selection-context';
import ExportButton from '../Components/export-button';
import MacWindow from '../Components/mac-window';
import PresetButton from '../Components/preset-button';
import { makeColor } from '../Components/utils';

interface PreviewProps {
  children: React.ReactNode;
  color: string;
}

const Preview: React.SFC<PreviewProps> = ({ children, color }) => (
  <section className="header">
    <h1 className="title has-text-centered preview-title">
      Color Palette Helper
    </h1>

    <div className="section">{children}</div>

    <style jsx>{`
      .header .preview-title {
        color: ${fontColor(color)};
      }
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

const calcRange = (color: string, section: ColorSwatch[], index: number) => {
  section[index].set(900, tinycolor.mix(color, '#000', 80).toHexString());
  section[index].set(800, tinycolor.mix(color, '#000', 60).toHexString());
  section[index].set(700, tinycolor.mix(color, '#000', 40).toHexString());
  section[index].set(600, tinycolor.mix(color, '#000', 20).toHexString());
  section[index].set(500, color);
  section[index].set(400, tinycolor.mix(color, '#fff', 20).toHexString());
  section[index].set(300, tinycolor.mix(color, '#fff', 40).toHexString());
  section[index].set(200, tinycolor.mix(color, '#fff', 60).toHexString());
  section[index].set(100, tinycolor.mix(color, '#fff', 80).toHexString());
};

export default class Index extends React.Component {
  public state = {
    currentColor: ['primary', 0, 500] as [ColorSection, number, ColorShade],
    currentColors: {
      [ColorSection.primary]: [makeColor()],
      [ColorSection.grey]: [makeColor()],
      [ColorSection.accent]: [makeColor(), makeColor(), makeColor()]
    },
    setColor: this.setColor,
    setCurrentColor: this.setCurrentColor
  };

  private setColor = (
    section: ColorSection,
    index: number,
    shade: ColorShade,
    color: string
  ) => {
    const currentSection = this.state.currentColors[section];

    if (!currentSection) {
      return;
    }

    currentSection[index].set(shade, color);

    if (shade === 500) {
      calcRange(color, this.state.currentColors[section], index);
    }

    if (section === ColorSection.primary && shade === 500) {
      const mixedGrey = tinycolor.mix(color, '#BEBEBE', 90).toHexString();
      calcRange(mixedGrey, this.state.currentColors[ColorSection.grey], 0);
    }

    this.setState({ currentColors: this.state.currentColors });
  };

  private setCurrentColor = (
    section: ColorSection,
    index: number,
    shade: ColorShade
  ) => {
    this.setState({
      currentColor: [section, index, shade]
    });
  };

  private addRowToColor = (section: ColorSection) => {
    const currentSection = this.state.currentColors[section];
    currentSection.push(makeColor());
    this.setState({ currentColors: this.state.currentColors });
  };

  public render() {
    const [section, index, shade] = this.state.currentColor;
    const primary = this.state.currentColors[ColorSection.primary][0].get(500);

    let currentColor = 'grey';

    if (section && shade) {
      currentColor = this.state.currentColors[section][index].get(shade)!;
    }

    return (
      <ColorSelectionContext.Provider value={this.state}>
        <div className="root">
          <PresetButton />
          <MacWindow hasButtons className="sections has-text-white">
            <ColorContainer
              title={ColorSection.primary}
              colors={this.state.currentColors[ColorSection.primary]}
              maxRows={2}
              addRowToColor={this.addRowToColor}
            />
            <ColorContainer
              title={ColorSection.grey}
              colors={this.state.currentColors[ColorSection.grey]}
            />
            <ColorContainer
              title={ColorSection.accent}
              colors={this.state.currentColors[ColorSection.accent]}
              addRowToColor={this.addRowToColor}
              maxRows={Infinity}
            />
          </MacWindow>

          <Preview color={currentColor}>
            <div className="picker-wrapper">
              <ChromePicker
                color={currentColor}
                onChangeComplete={color =>
                  this.setColor(section, index, shade, color.hex)
                }
              />
            </div>
            <MacWindow className="options">
              <div className="button-wrapper">
                <ExportButton
                  color={primary!}
                  currentColors={this.state.currentColors}
                />
              </div>
            </MacWindow>
          </Preview>
        </div>

        <style jsx>{`
          .root {
            display: flex;
            background-color: ${currentColor};
          }
          :global(.sections) {
            display: flex;
            align-items: center;
            flex-direction: column;
            max-height: 100vh;
            overflow: scroll;
            flex: 1.2;
            padding: 2rem 0;
          }
          :global(.sections::-webkit-scrollbar) {
            display: none;
          }
          .picker-wrapper {
            margin-bottom: 3rem;
          }
          :global(.chrome-picker) {
            width: 30vw !important;
          }
          .button-wrapper {
            margin: 2rem 0;
            text-align: center;
          }
          .export-button {
            border: none;
            color: ${fontColor(primary)};
            background-color: ${primary};
          }
          :global(.options) {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          :global(.options > *) {
            width: 100%;
          }
          .preset-button {
            position: absolute;
            right: 10px;
            top: 10px;
          }
        `}</style>
      </ColorSelectionContext.Provider>
    );
  }
}
