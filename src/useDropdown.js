import React, { useState } from "react";

const useDropdown = (label, defaultValue, options) => {
  const [state, setState] = useState(defaultValue);
  const id = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;

  const Dropdown = () => (
    <label htmlFor={id}>
      <select
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
