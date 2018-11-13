import React from 'react';

interface SelectProps {
  tags: string[];
  placeholder: string;
  className?: string;
  tag?: string;
  onChooseTag(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const Select: React.FunctionComponent<SelectProps> = ({
  tags,
  onChooseTag,
  tag,
  className,
  placeholder
}) => (
  <div className={`field ${className}`}>
    <label className="label">Format</label>

    <div className="control">
      <div className="select is-medium is-fullwidth">
        <select value={tag} onChange={onChooseTag}>
          <option value="none">{placeholder}</option>

          {tags.map(tagOption => (
            <option key={tagOption}>{tagOption}</option>
          ))}
        </select>
      </div>
    </div>

    <style jsx>{`
      .wrapper {
        max-width: 800px;
      }
      :global(.search) {
        flex: 1;
        margin-right: 20px;
      }
    `}</style>
  </div>
);

export default Select;
