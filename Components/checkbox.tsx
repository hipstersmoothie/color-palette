import * as React from 'react';
import fontColor from 'font-color-contrast';

interface CheckBoxProps {
  id: string;
  label: string;
  currentColor: string;
  isChecked: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const CheckBox: React.SFC<CheckBoxProps> = ({
  isChecked,
  id,
  label,
  currentColor,
  onChange
}) => (
  <div className="field check-box">
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
        background-color: ${fontColor(currentColor)};
        border-color: ${fontColor(currentColor)};
      }

      .check-box
        .is-checkradio[type='checkbox'].is-white:checked
        + label::after,
      .check-box
        .is-checkradio[type='checkbox'].is-white:checked
        + label:after {
        border-color: ${currentColor} !important;
      }
    `}</style>
  </div>
);

export default CheckBox;
