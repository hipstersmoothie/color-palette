import { Button, Icon, Message, MessageBody, Title } from 'bloomer';
import * as React from 'react';

import ColorRow from '../Components/color-row';
import { ColorSection, ColorSwatch } from './types';

interface ColorContainerProps {
  title: ColorSection;
  message?: string;
  maxRows?: number;
  colors: ColorSwatch[];
  addRowToColor?(section: ColorSection): void;
}

const ColorMessaging = {
  primary:
    'Most sites need one, maybe two colors that are used for primary actions, emphasizing navigation elements, etc. These are the colors that determine the overall look of a site — the ones that make you think of Facebook as "blue", even though it\'s really mostly grey.',
  grey:
    "Text, backgrounds, panels, form controls — almost everything in an interface is grey.\n\nYou'll need more greys than you think, too — three or four shades might sound like plenty but it won't be long before you wish you had something a little darker than shade #2 but a little lighter than shade #3.",
  accent:
    'On top of primary colors, every site needs a few accent colors for communicating different things to the user.\n\nFor example, you might want to use an eye-grabbing color to highlight a new feature, use red for confirming a destructive action, yellow for a warning message, or green to highlight a positive trend.'
};

export default class ColorContainer extends React.Component<
  ColorContainerProps
> {
  public state = {
    showMessage: false
  };

  public static defaultProps = {
    maxRows: 1,
    addRowToColor: () => undefined
  };

  public render() {
    const { title, colors } = this.props;

    return (
      <div className="color-container">
        <div className="header">
          <Title className="has-text-white">{title}</Title>
          <span className="info-icon">
            <Icon
              isSize="medium"
              className="far fa-question-circle"
              onClick={this.toggleMessage}
            />
          </span>
        </div>

        {ColorMessaging[title] && this.state.showMessage && (
          <Message isColor="info" style={{ maxWidth: 530 }}>
            <MessageBody>{ColorMessaging[title]}</MessageBody>
          </Message>
        )}

        {colors.map((row, index) => (
          <ColorRow
            key={`title-${index}`}
            title={title}
            colors={row}
            index={index}
          />
        ))}

        {this.props.maxRows !== 1 &&
          (colors.length < this.props.maxRows! ||
            this.props.maxRows === Infinity) && (
            <Button
              isColor="dark"
              className="add-button"
              onClick={() => this.props.addRowToColor!(title)}
            >
              Add
            </Button>
          )}

        <style jsx>{`
          .color-container {
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
          }

          .color-container .title {
            margin-bottom: 0;
          }

          .header {
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid white;
            padding-bottom: 0.75rem;
          }
          .info-icon:hover {
            color: #42abf3;
          }

          :global(.add-button) {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  private readonly toggleMessage = () =>
    this.setState({ showMessage: !this.state.showMessage });
}
