import * as React from 'react';
import Modal from './modal';

import palettes from './palettes';
import Color from './color';
import ColorSelectionContext from './color-selection-context';
import { ColorSection } from './types';

interface Palette {
  id: string;
  colors: {
    primary: string;
    accent1: string;
    accent2: string;
    accent3: string;
  };
  date: string;
  likes: string;
}

class PresetButton extends React.Component {
  state: { modalOpen: boolean; selectedPalette?: Palette } = {
    modalOpen: false
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  setPalette = (selectedPalette: Palette) => {
    this.setState({ selectedPalette });
  };

  render() {
    return (
      <React.Fragment>
        <button className="button preset-button" onClick={this.openModal}>
          Presets
        </button>
        <ColorSelectionContext.Consumer>
          {({ setColor }) => {
            const setContextColors = () => {
              if (!this.state.selectedPalette) {
                return;
              }
              const { colors } = this.state.selectedPalette;

              setColor(ColorSection.primary, 0, 500, colors.primary);
              setColor(ColorSection.accent, 0, 500, colors.accent1);
              setColor(ColorSection.accent, 1, 500, colors.accent2);
              setColor(ColorSection.accent, 2, 500, colors.accent3);

              this.setState({
                selectedPalette: undefined
              });
            };

            return (
              <Modal
                submitText="Use Preset"
                title="Choose Preset"
                isOpen={this.state.modalOpen}
                onClose={this.closeModal}
                isSubmitActive={!this.state.selectedPalette}
                onSubmit={setContextColors}
              >
                <div className="palette-wrapper">
                  {palettes.map(palette => (
                    <div className="palette-preview-root">
                      <div
                        className={`card palette-preview badge is-badge-danger is-badge-left ${
                          this.state.selectedPalette &&
                          this.state.selectedPalette.id === palette.id
                            ? 'active'
                            : ''
                        }`}
                        data-badge={`${palette.likes} ♥`}
                        onClick={() => this.setPalette(palette)}
                      >
                        <div className="card-content">
                          <div className="colors-wrapper">
                            <Color color={palette.colors.primary} />
                            <Color color={palette.colors.accent1} />
                            <Color color={palette.colors.accent2} />
                            <Color color={palette.colors.accent3} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>
            );
          }}
        </ColorSelectionContext.Consumer>

        <style jsx>{`
          .preset-button {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .colors-wrapper {
            display: flex;
          }
          .palette-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .palette-preview-root {
            flex-basis: 50%;
          }
          .palette-preview {
            margin: 10px;
          }
          .active {
            box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default PresetButton;
