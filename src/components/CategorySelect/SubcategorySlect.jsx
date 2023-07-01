import React from "react";
import { StSelect } from "../styledcomponents/Styled";

const SubcategorySelect = ({ value, onChange, options }) => {
  return (
    <StSelect value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StSelect>
  );
};

export default SubcategorySelect;
