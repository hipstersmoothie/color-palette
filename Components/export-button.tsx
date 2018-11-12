import FileSaver from 'file-saver';
import fontColor from 'font-color-contrast';
import * as React from 'react';

import Input from './input';
import Modal from './modal';
import Select from './select';
import { ColorMap, ColorShade, ColorSwatch } from './types';

interface PreviewButtonProps {
  color: string;
  currentColors: ColorMap;
}

const FILE_OPTIONS = {
  type: 'text/plain;charset=utf-8'
};

interface ExportState {
  modalOpen: boolean;
  format: 'JSON' | 'CSS' | 'SASS' | undefined;
  fileName: string;
  shadeLabels: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  colorLabels: {
    [label: string]: string;
  };
}

const saveCSS = (colors: { [key: string]: { [key: string]: string } }) => {
  let file = ': root {';

  Object.entries(colors).map(([section, shades]) => {
    Object.entries(shades).map(([shade, color]) => {
      file += `\n\t--${section}-${shade}: ${color};`;
    });
  });

  file += '\n}';

  const blob = new Blob([file], FILE_OPTIONS);
  FileSaver.saveAs(blob, 'variables.css');
};

const times = (n: number, func: (i: number) => any) => {
  const result = [];

  for (let i = 0; i < n; i++) {
    result.push(func(i));
  }

  return result;
};

const saveSass = (colors: { [key: string]: { [key: string]: string } }) => {
  let file = '';

  Object.entries(colors).map(([section, shades]) => {
    Object.entries(shades).map(([shade, color]) => {
      file += `$${section}-${shade}: ${color};\n`;
    });
  });

  const blob = new Blob([file], FILE_OPTIONS);
  FileSaver.saveAs(blob, 'variables.scss');
};

class ExportButton extends React.Component<PreviewButtonProps> {
  public state: ExportState;

  constructor(props: PreviewButtonProps) {
    super(props);

    const colorLabels: { [key: string]: string } = {};

    if (props.currentColors.primary.length === 1) {
      colorLabels['primary-color-0'] = 'primary';
    } else {
      colorLabels['primary-color-0'] = 'primary-0';
      colorLabels['primary-color-1'] = 'primary-1';
    }

    colorLabels.grey = 'grey';

    times(props.currentColors.accent.length, i => {
      colorLabels[`accent-color-${i}`] = `accent-${i}`;
    });

    this.state = {
      modalOpen: false,
      format: undefined,
      fileName: 'variables',
      shadeLabels: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900'
      },
      colorLabels
    };
  }

  public openModal = () => {
    this.setState({ modalOpen: true });
  };

  public closeModal = () => {
    this.setState({ modalOpen: false });
  };

  public setFormat = (event: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({ format: event.currentTarget.value });

  public useLabels = (color: ColorSwatch) => {
    return {
      [this.state.shadeLabels[100]]: color.get(100)!,
      [this.state.shadeLabels[200]]: color.get(200)!,
      [this.state.shadeLabels[300]]: color.get(300)!,
      [this.state.shadeLabels[400]]: color.get(400)!,
      [this.state.shadeLabels[500]]: color.get(500)!,
      [this.state.shadeLabels[600]]: color.get(600)!,
      [this.state.shadeLabels[700]]: color.get(700)!,
      [this.state.shadeLabels[800]]: color.get(800)!,
      [this.state.shadeLabels[900]]: color.get(900)!
    };
  };

  public save = () => {
    const colors: { [key: string]: { [key: string]: string } } = {};

    this.props.currentColors.primary.map((color, index) => {
      colors[this.state.colorLabels[`primary-color-${index}`]] = this.useLabels(
        color
      );
    });

    colors[this.state.colorLabels.grey] = this.useLabels(
      this.props.currentColors.grey[0]
    );

    this.props.currentColors.accent.map((color, index) => {
      colors[this.state.colorLabels[`accent-color-${index}`]] = this.useLabels(
        color
      );
    });

    switch (this.state.format) {
      case 'JSON': {
        const blob = new Blob([JSON.stringify(colors, null, 2)], FILE_OPTIONS);
        FileSaver.saveAs(blob, 'variables.json');
        break;
      }
      case 'CSS':
        saveCSS(colors);
        break;
      case 'SASS':
        saveSass(colors);
        break;
      default:
    }
  };

  public setLabel = (type: 'color' | 'shade', key: string | ColorShade) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (type === 'color') {
      this.state.colorLabels[key] = event.currentTarget.value;
      this.setState({ colorLabels: this.state.colorLabels });
    } else {
      this.state.shadeLabels[key as ColorShade] = event.currentTarget.value;
      this.setState({ shadeLabels: this.state.shadeLabels });
    }
  };

  public render() {
    return (
      <React.Fragment>
        <button className="button export-button" onClick={this.openModal}>
          Export
        </button>
        <Modal
          submitText="Save"
          isOpen={this.state.modalOpen}
          title="Export"
          onClose={this.closeModal}
          onSubmit={this.save}
          isSubmitActive={!this.state.format}
        >
          <div className="columns field shades">
            <Input
              label="File Name"
              value={this.state.fileName}
              className="column is-half"
              onChange={e => this.setState({ fileName: e.currentTarget.value })}
            />
            <Select
              className="column is-half"
              tags={['JSON', 'CSS', 'SASS']}
              placeholder="Select a format"
              tag={this.state.format}
              onChooseTag={this.setFormat}
            />
          </div>

          <label className="label">Color Labels</label>
          <div className="columns is-multiline field shades">
            {times(this.props.currentColors.primary.length, index => (
              <Input
                key={`primary-color-${index}`}
                label={`Primary Color${
                  this.props.currentColors.primary.length === 1 ? '' : index
                }`}
                value={this.state.colorLabels[`primary-color-${index}`]}
                className="column is-one-third"
                onChange={this.setLabel('color', `primary-color-${index}`)}
              />
            ))}
            <Input
              label="Grey"
              key="grey"
              value={this.state.colorLabels.grey}
              className="column is-one-third"
              onChange={this.setLabel('color', 'grey')}
            />
            {times(this.props.currentColors.accent.length, index => (
              <Input
                key={`accent-color-${index}`}
                label={`Accent Color ${index}`}
                value={this.state.colorLabels[`accent-color-${index}`]}
                className="column is-one-third"
                onChange={this.setLabel('color', `accent-color-${index}`)}
              />
            ))}
          </div>

          <label className="label">Shade Labels</label>

          <div className="columns is-multiline field shades">
            <Input
              value={this.state.shadeLabels[100]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 100)}
            />
            <Input
              value={this.state.shadeLabels[200]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 200)}
            />
            <Input
              value={this.state.shadeLabels[300]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 300)}
            />
            <Input
              value={this.state.shadeLabels[400]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 400)}
            />
            <Input
              value={this.state.shadeLabels[500]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 500)}
            />
            <Input
              value={this.state.shadeLabels[600]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 600)}
            />
            <Input
              value={this.state.shadeLabels[700]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 700)}
            />
            <Input
              value={this.state.shadeLabels[800]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 800)}
            />
            <Input
              value={this.state.shadeLabels[900]}
              className="column is-one-third"
              onChange={this.setLabel('shade', 900)}
            />
          </div>
        </Modal>
        <style jsx>{`
          .export-button {
            border: none;
            color: ${fontColor(this.props.color)};
            background-color: ${this.props.color};
          }
          .shades > :global(*) {
            margin: 0 !important;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default ExportButton;
