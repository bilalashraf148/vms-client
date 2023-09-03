import React, { useCallback, useMemo, useState } from "react";
import { Box, Snackbar, TextField, Typography, styled } from "@mui/material";
import { ColorMatrix } from "./colorMatrix";

export const Add = () => {
  const [totalColors, setTotalColors] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const onColorsInputChange = useCallback((event) => {
    setTotalColors(event.target.value);
  }, []);

  const onTitleChange = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const onDescriptionChange = useCallback((event) => {
    setDescription(event.target.value);
  }, []);

  const fieldInputProps = { min: 1 };
  const parsedTotalColors = useMemo(() => parseInt(totalColors), [totalColors]);

  return (
    <StyledFormWrapper>
      <StyledSnack justifyContent={"center"} alignItems={"center"} spacing={2}>
        <Typography>Enter Product Details:</Typography>
        <TextField  
          id="prd-title" 
          label="Product Title" 
          onChange={onTitleChange} 
          type="text"
          value={title} 
          variant="outlined"
        />
        <TextField  
          id="prd-description" 
          label="Product Description" 
          onChange={onDescriptionChange} 
          type="text"
          value={description} 
          variant="outlined"
        />
      </StyledSnack>
      <TextField 
        fullWidth 
        id="colors-input-field" 
        inputProps={fieldInputProps}
        label="Total Colors" 
        onChange={onColorsInputChange} 
        type="number"
        value={totalColors} 
        variant="outlined"
      />
      {
        totalColors && (
        <ColorMatrix totalColors={parsedTotalColors} title={title} description={description} />
      )}
    </StyledFormWrapper>
  );
};

const StyledFormWrapper = styled(Box)({
  marginTop: "20px",
});

const StyledSnack = styled(Snackbar)({
  marginBottom: "10px",
});
