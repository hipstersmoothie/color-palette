import fontColor from 'font-color-contrast';
import * as React from 'react';

interface CheckBoxProps {
  id: string;
  label: string;
  primaryColor: string;
  isChecked: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  isChecked,
  id,
  label,
  primaryColor,
  onChange
}) => (
  <div className="field check-box" id={`${id}-wrapper`}>
    <input
      className="is-checkradio is-white radio"
      id={id}
      type="checkbox"
      name={id}
      checked={isChecked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>

    <style jsx>{`
      .check-box label::before {
        background-color: ${fontColor(primaryColor)};
        border-color: ${fontColor(primaryColor)};
      }

      .check-box
        .is-checkradio[type='checkbox'].is-white:checked
        + label::after,
      .check-box
        .is-checkradio[type='checkbox'].is-white:checked
        + label:after {
        border-color: ${primaryColor} !important;
      }
    `}</style>
  </div>
);

export default CheckBox;
