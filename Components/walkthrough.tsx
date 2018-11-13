import { Icon, Title } from 'bloomer';
import * as React from 'react';
import Joyride from 'react-joyride';

export default class Walkthrough extends React.Component {
  public state = {
    run: false
  };

  private readonly handleClickStart = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    this.setState({
      run: true
    });
  };

  public render() {
    return (
      <React.Fragment>
        <span className="info-icon">
          <Icon
            isSize="medium"
            className="far fa-question-circle"
            onClick={this.handleClickStart}
          />
        </span>

        <Joyride
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
          run={this.state.run}
          steps={[
            {
              content: (
                <div>
                  <Title isSize={4}>
                    Welcome to hipstersmoothie's Color Palette Helper
                  </Title>

                  <p>
                    This tool was inspired by{' '}
                    <a href="https://refactoringui.com/previews/building-your-color-palette/">
                      this article.
                    </a>{' '}
                    You will find this tool much more useful if you read that
                    first!
                  </p>
                </div>
              ),
              placement: 'center',
              disableBeacon: true,
              target: 'body'
            },
            {
              content: (
                <p>Start by choosing the default shade for each color.</p>
              ),
              target: '.default-shade'
            },
            {
              content: <p>Then choose the darkest shade</p>,
              target: '.darkest-shade'
            },
            {
              content: <p>And the lightest shade</p>,
              target: '.lightest-shade'
            },
            {
              content: (
                <div>
                  <Title isSize={4}>
                    After that fill in the rest of the in between values
                  </Title>
                  <p style={{ paddingBottom: 10 }}>
                    Once done you will have all the necassary shades of a color
                    to build an expressive UI!
                  </p>

                  <p>Repeat this process for all the remaining colors.</p>
                </div>
              ),
              target: '.color-container'
            },
            {
              content: (
                <p>
                  By default this tool will automatically fill in the shades
                  when you pick a default color. To turn off this behavior use
                  this option.
                </p>
              ),
              target: '#auto-scale-wrapper'
            },
            {
              content: (
                <Title isSize={4}>
                  Choose some beautiful presets to help get you started or
                  inspire you.
                </Title>
              ),
              target: '.preset-button'
            },
            {
              content: (
                <Title isSize={4}>
                  Once you're done export your color palette to a variety of
                  formats.
                </Title>
              ),
              target: '.export-button'
            }
          ]}
        />
        <style jsx>{`
          .info-icon {
            position: absolute;
            top: 5px;
            right: 5px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
