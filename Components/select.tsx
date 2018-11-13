import { Control, Field, FieldBody, FieldLabel, Label, Select } from 'bloomer';
import React from 'react';

interface SelectProps {
  tags: string[];
  placeholder: string;
  className?: string;
  tag?: string;
  onChooseTag(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const SelectComponent: React.FunctionComponent<SelectProps> = ({
  tags,
  onChooseTag,
  tag,
  className,
  placeholder
}) => (
  <Field isHorizontal className={className}>
    <FieldLabel isNormal>
      <Label>Format</Label>
    </FieldLabel>

    <FieldBody>
      <Field>
        <Control>
          <Select
            value={tag}
            onChange={onChooseTag}
            isFullWidth
            isSize="medium"
          >
            <option value="none">{placeholder}</option>

            {tags.map(tagOption => (
              <option key={tagOption}>{tagOption}</option>
            ))}
          </Select>
        </Control>
      </Field>
    </FieldBody>

    <style jsx>{`
      .wrapper {
        max-width: 800px;
      }
      :global(.search) {
        flex: 1;
        margin-right: 20px;
      }
    `}</style>
  </Field>
);

export default SelectComponent;
