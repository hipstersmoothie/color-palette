import * as React from 'react';

import ColorRow from '../Components/color-row';
import Message from '../Components/message';
import { ColorSection, ColorSwatch } from './types';

interface ColorContainerProps {
  title: ColorSection;
  message?: string;
  colors: ColorSwatch[];
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
  state = {
    showMessage: false
  };

  toggleMessage = () => this.setState({ showMessage: !this.state.showMessage });

  render() {
    const { title, colors } = this.props;

    return (
      <div className="wrapper">
        <div className="header">
          <h1 className="title has-text-white">{title} </h1>
          <span
            className="icon is-medium info-icon"
            onClick={this.toggleMessage}
          >
            <i className="far fa-question-circle" />
          </span>
        </div>

        {ColorMessaging[title] && this.state.showMessage && (
          <Message message={ColorMessaging[title]} />
        )}

        {colors.map((row, index) => (
          <ColorRow title={title} colors={row} index={index} />
        ))}

        <style jsx>{`
          .wrapper {
            margin-bottom: 2rem;
          }

          .wrapper .title {
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
        `}</style>
      </div>
    );
  }
}
