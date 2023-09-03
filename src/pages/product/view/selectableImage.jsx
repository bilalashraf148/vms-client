import React, { useState } from "react";
import { Checkbox, FormControlLabel, styled } from "@mui/material";

export const SelectableImage = ({ src, alt, onChange }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <div>
      <StyledImageWrapper src={src} alt={alt}/>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Add to Cart"
      />
    </div>
  );
}

const StyledImageWrapper = styled("img")({
  maxWidth: "100%", 
});
