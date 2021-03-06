import { Button, Card, CardContent } from 'bloomer';
import * as React from 'react';
import Modal from './modal';

import Color from './color';
import ColorSelectionContext from './color-selection-context';
import palettes from './palettes';
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
  public state: { modalOpen: boolean; selectedPalette?: Palette } = {
    modalOpen: false
  };

  public openModal = () => {
    this.setState({ modalOpen: true });
  };

  public closeModal = () => {
    this.setState({ modalOpen: false });
  };

  public setPalette = (selectedPalette: Palette) => {
    this.setState({ selectedPalette });
  };

  public render() {
    return (
      <React.Fragment>
        <Button className="preset-button" onClick={this.openModal}>
          Presets
        </Button>
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
                    <div className="palette-preview-root" key={palette.id}>
                      <Card
                        className={`palette-preview badge is-badge-danger is-badge-left ${
                          this.state.selectedPalette &&
                          this.state.selectedPalette.id === palette.id
                            ? 'active'
                            : ''
                        }`}
                        data-badge={`${palette.likes} ♥`}
                        onClick={() => this.setPalette(palette)}
                      >
                        <CardContent>
                          <div className="colors-wrapper">
                            <Color color={palette.colors.primary} />
                            <Color color={palette.colors.accent1} />
                            <Color color={palette.colors.accent2} />
                            <Color color={palette.colors.accent3} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </Modal>
            );
          }}
        </ColorSelectionContext.Consumer>

        <style jsx>{`
          :global(.preset-button) {
            margin-right: 15px;
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
          :global(.palette-preview) {
            margin: 10px;
          }
          :global(.active) {
            box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default PresetButton;
