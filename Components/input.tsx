import {
  Control,
  Field,
  FieldBody,
  FieldLabel,
  Help,
  Icon,
  Input,
  Label
} from 'bloomer';
import React from 'react';

interface InputProps {
  value: string;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  onChange?(event: React.ChangeEvent<HTMLElement>): void;
}

const InputComponent: React.FunctionComponent<InputProps> = ({
  value,
  label,
  onChange,
  className,
  placeholder,
  error
}) => (
  <Field isHorizontal className={className}>
    {label && (
      <FieldLabel isNormal>
        <Label>{label}</Label>
      </FieldLabel>
    )}
    <FieldBody>
      <Field>
        <Control hasIcons="right">
          <Input
            isSize="medium"
            isColor={error ? 'is-danger' : undefined}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onChange}
          />

          {error && (
            <Icon
              isSize="medium"
              isAlign="right"
              className="fas fa-exclamation-triangle"
            />
          )}
        </Control>
      </Field>
    </FieldBody>

    {error && (
      <Help isColor="danger" className="error-text">
        {error}
      </Help>
    )}

    <style jsx>{`
      :globa(.error-text::first-letter) {
        text-transform: capitalize;
      }
    `}</style>
  </Field>
);

InputComponent.defaultProps = {
  placeholder: undefined,
  value: undefined,
  error: undefined,
  label: undefined,
  className: ''
};

export default InputComponent;
