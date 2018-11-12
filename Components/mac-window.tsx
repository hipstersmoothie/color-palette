import * as React from 'react';

const PseudoButtons = () => (
  <div className="mac-buttons">
    <svg width="54" height="14" viewBox="0 0 54 14">
      <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
        <circle
          cx="6"
          cy="6"
          r="6"
          fill="#FF5F56"
          stroke="#E0443E"
          stroke-width=".5"
        />
        <circle
          cx="26"
          cy="6"
          r="6"
          fill="#FFBD2E"
          stroke="#DEA123"
          stroke-width=".5"
        />
        <circle
          cx="46"
          cy="6"
          r="6"
          fill="#27C93F"
          stroke="#1AAB29"
          stroke-width=".5"
        />
      </g>
    </svg>

    <style jsx>{`
      .mac-buttons {
        position: absolute;
        top: 10px;
        margin-left: 18px;
        z-index: 2;
        left: 0;
      }
    `}</style>
  </div>
);

interface MacWindowProps {
  className?: string;
  children: React.ReactNode;
  hasButtons?: boolean;
}

const MacWindow: React.SFC<MacWindowProps> = ({
  className,
  hasButtons,
  children
}) => (
  <div className={className}>
    <div className="mac-wrapper has-text-white">
      {hasButtons && <PseudoButtons />}
      {children}
    </div>

    <style jsx>{`
      .mac-wrapper {
        background: #292a2b;
        border-radius: 5px;
        padding: 48px 2rem 0;
        position: relative;
      }
    `}</style>
  </div>
);

export default MacWindow;
