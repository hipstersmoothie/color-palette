import * as React from 'react';
import Joyride, { State } from 'react-joyride';

export default class Walkthrough extends React.Component {
  public state = {
    run: false
  };

  private handleClickStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    this.setState({
      run: true
    });
  };

  public render() {
    return (
      <React.Fragment>
        <span
          className="icon is-medium info-icon"
          onClick={this.handleClickStart}
        >
          <i className="far fa-question-circle" />
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
                  <h2 className="title is-4">
                    Welcome to hipstersmoothie's Color Palette Helper
                  </h2>

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
                <h2>Start by choosing the default shade for each color.</h2>
              ),
              target: '.default-shade'
            },
            {
              content: <h2>Then choose the darkest shade</h2>,
              target: '.darkest-shade'
            },
            {
              content: <h2>And the lightest shade</h2>,
              target: '.lightest-shade'
            },
            {
              content: (
                <div>
                  <h2 className="title is-4">
                    After that fill in the rest of the in between values
                  </h2>
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
                <h2>
                  By default this tool will automatically fill in the shades
                  when you pick a default color. To turn off this behavior use
                  this option.
                </h2>
              ),
              target: '#auto-scale-wrapper'
            },
            {
              content: (
                <h2 className="title is-4">
                  Choose some beautiful presets to help get you started or
                  inspire you.
                </h2>
              ),
              target: '.preset-button'
            },
            {
              content: (
                <div>
                  <h2 className="title is-4">
                    Once you're done export your color palette to a variety of
                    formats.
                  </h2>
                </div>
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
