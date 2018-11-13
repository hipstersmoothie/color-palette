import fontColor from 'font-color-contrast';
import * as React from 'react';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';
import { ColorSection, ColorShade, ColorSwatch } from '../Components/types';

import ColorContainer from '../Components/color-container';
import ColorSelectionContext from '../Components/color-selection-context';
import ExportButton from '../Components/export-button';
import MacWindow from '../Components/mac-window';
import Options from '../Components/options';
import OptionsContext from '../Components/options-context';
import PresetButton from '../Components/preset-button';
import { makeColor } from '../Components/utils';
import Walkthrough from '../Components/walkthrough';

interface PreviewProps {
  children: React.ReactNode;
  color: string;
}

const Preview: React.FunctionComponent<PreviewProps> = ({ children, color }) => (
  <section className="header">
    <h1 className="title has-text-centered preview-title">
      Color Palette Helper
    </h1>

    <div className="section preview-body">{children}</div>

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
      .preview-body {
        display: flex;
        flex-direction: column-reverse;
      }
      @media screen and (min-width: 767px) {
        .preview-body {
          flex-direction: column;
        }
      }
    `}</style>
  </section>
);

const calcRange = (
  color: string,
  section: ColorSwatch[],
  index: number,
  range = 20,
  autoScale = true
) => {
  const mix = (c1: string, c2: string, amount: number) =>
    autoScale ? tinycolor.mix(c1, c2, amount).toHexString() : c1;

  section[index].set(900, mix(color, '#000', 100 - range));
  section[index].set(800, mix(color, '#000', 80 - range));
  section[index].set(700, mix(color, '#000', 60 - range));
  section[index].set(600, mix(color, '#000', 40 - range));
  section[index].set(500, color);
  section[index].set(400, mix(color, '#fff', 40 - range));
  section[index].set(300, mix(color, '#fff', 60 - range));
  section[index].set(200, mix(color, '#fff', 80 - range));
  section[index].set(100, mix(color, '#fff', 100 - range));
};

export default class Index extends React.Component {
  public state = {
    currentColor: ['primary', 0, 500] as [ColorSection, number, ColorShade],
    currentColors: {
      [ColorSection.primary]: [makeColor()],
      [ColorSection.grey]: [makeColor()],
      [ColorSection.accent]: [makeColor(), makeColor(), makeColor()]
    },
    // Options
    showLabels: true,
    autoScale: true
  };

  private readonly setColor = (
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
      calcRange(
        color,
        this.state.currentColors[section],
        index,
        30,
        this.state.autoScale
      );
    }

    if (
      section === ColorSection.primary &&
      shade === 500 &&
      this.state.autoScale
    ) {
      const mixedGrey = tinycolor.mix(color, '#BEBEBE', 90).toHexString();
      calcRange(mixedGrey, this.state.currentColors[ColorSection.grey], 0);
    }

    this.setState({ currentColors: this.state.currentColors });
  };

  private readonly setCurrentColor = (
    section: ColorSection,
    index: number,
    shade: ColorShade
  ) => {
    this.setState({
      currentColor: [section, index, shade]
    });
  };

  private readonly addRowToColor = (section: ColorSection) => {
    const currentSection = this.state.currentColors[section];
    currentSection.push(makeColor());
    this.setState({ currentColors: this.state.currentColors });
  };

  private readonly toggleCheckBox = (key: 'showLabels') => () => {
    this.setState({
      [key]: !this.state[key]
    });
  };

  public render() {
    const [section, index, shade] = this.state.currentColor;
    const primary = this.state.currentColors[ColorSection.primary][0].get(500);

    let currentColor = 'grey';

    if (section && shade) {
      currentColor = this.state.currentColors[section][index].get(shade)!;
    }

    return (
      <OptionsContext.Provider
        value={{ ...this.state, toggleCheckBox: this.toggleCheckBox }}
      >
        <ColorSelectionContext.Provider
          value={{
            ...this.state,
            setColor: this.setColor,
            setCurrentColor: this.setCurrentColor
          }}
        >
          <div className="root">
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
                <Options primaryColor={primary!} />
                <Walkthrough />

                <div className="button-wrapper">
                  <PresetButton />

                  <ExportButton
                    color={primary!}
                    currentColors={this.state.currentColors}
                  />
                </div>
              </MacWindow>
            </Preview>
          </div>

          <style jsx>{`
            :global(body) {
              background-color: ${currentColor};
            }
            .root {
              display: flex;
              flex-direction: column-reverse;
            }
            :global(.sections) {
              display: flex;
              align-items: center;
              flex-direction: column;
              flex: 1.2;
              padding: 2rem 0;
            }
            :global(.sections::-webkit-scrollbar) {
              display: none;
            }

            :global(.chrome-picker) {
              margin: auto;
              width: 80vw !important;
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
              position: relative;
              display: flex;
              align-items: center;
              flex-direction: column;
              margin-bottom: 3rem;
            }
            :global(.options > *) {
              width: 100%;
            }
            .preset-button {
              position: absolute;
              right: 10px;
              top: 10px;
            }

            @media screen and (min-width: 767px) {
              :global(.sections) {
                max-height: 100vh;

                overflow: scroll;
              }
              .root {
                flex-direction: row;
              }
              :global(.chrome-picker) {
                width: 30vw !important;
              }
              .picker-wrapper {
                margin-bottom: 3rem;
              }
             :global(.options) {
                margin-bottom: 0;
              }
            }
          `}</style>
        </ColorSelectionContext.Provider>
      </OptionsContext.Provider>
    );
  }
}
