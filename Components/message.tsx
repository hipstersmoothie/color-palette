import * as React from 'react';

interface MessageProps {
  message: string;
}

const Message: React.FunctionComponent<MessageProps> = ({ message }) => (
  <article className="message wrapper is-info">
    <div className="message-body">{message}</div>

    <style jsx>{`
      .wrapper {
        max-width: 530px;
      }
    `}</style>
  </article>
);

export default Message;
