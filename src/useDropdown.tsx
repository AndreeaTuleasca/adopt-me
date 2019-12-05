import React, {
  useState,
  FunctionComponent,
  Dispatch,
  SetStateAction
} from "react";

const useDropdown = (
  label: string,
  defaultValue: string,
  options: string[]
): [string, FunctionComponent, Dispatch<SetStateAction<string>>] => {
  const [state, setState] = useState(defaultValue);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown: FunctionComponent = () => (
    <label htmlFor={id}>
      <select
        data-testid={id}
        id={id}
        value={state}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;
