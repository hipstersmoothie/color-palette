import React from 'react';

interface InputProps {
  value: string;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FunctionComponent<InputProps> = ({
  value,
  label,
  onChange,
  className,
  placeholder,
  error
}) => (
  <div className={`field is-horizontal ${className}`}>
    {label && (
      <div className="field-label is-normal">
        <label className="label">{label}</label>
      </div>
    )}
    <div className="field-body">
      <div className="field">
        <div className="control has-icons-right">
          <input
            className={`input is-medium ${error ? 'is-danger' : ''}`}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onChange}
          />

          {error && (
            <span className="icon is-medium is-right">
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
      </div>
    </div>

    {error && <p className="help is-danger error-text">{error}</p>}

    <style jsx>{`
      .error-text::first-letter {
        text-transform: capitalize;
      }
    `}</style>
  </div>
);

Input.defaultProps = {
  placeholder: undefined,
  value: undefined,
  error: undefined,
  label: undefined,
  className: ''
};

export default Input;
