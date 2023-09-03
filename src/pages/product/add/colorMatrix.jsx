import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Button, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ImageUploadButton } from "../../../components/ImageUploadButton";
import { createProduct } from "../../../services/productCalls";

export const ColorMatrix = ({ totalColors, title, description }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [colors, setColors] = useState(Array(totalColors).fill(""));
  const [tones, setTones] = useState([]);
  const [shades, setShades] = useState([]);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleToneColorChange = useCallback((index, value) => {
    const updatedTones = [...tones];
    updatedTones[index] = value; 
    setTones(updatedTones);
  }, [tones]);

  const handleColorChange = useCallback((index, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = value; 
    setColors(updatedColors);
  }, [colors]);

  const handleImageUpload = useCallback((rowIndex, index, file) => {
    const updatedShades = [...shades];
    updatedShades[rowIndex][index] = file;
    setShades(updatedShades);
  }, [shades]);

  const handleAddRow = useCallback(() => {
    const updatedTones = [...tones];
    updatedTones.push("");
    setTones(updatedTones);

    const updatedShades = [...shades];
    updatedShades.push(Array(totalColors).fill(""));
    setShades(updatedShades);
  }, [shades, tones, totalColors]);

  const handleSubmission = useCallback(e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(`product`, JSON.stringify({title, description}));
    for (let i = 0; i < shades.length; i++) {
      const currentArr = shades[i];
      for (let j = 0; j < currentArr.length; j++) {
        formData.append(`color-${i}`, colors[j]);
        formData.append(`shade-${i}${j}`, currentArr[j]);
        formData.append(`tone-${i}${j}`, tones[i]);
      }
    }
    
    createProduct(formData, (err, res) => {
      if(res) {
        navigate("/products/view");
      }
      else {
        handleSnackbarOpen("Error: Failed to submit the form.");
      }
    });
  }, [colors, description, navigate, shades, title, tones]);

  const handleRowDelete = useCallback((rowIndex) => {
    const updatedTones = [...tones];
    updatedTones.splice(rowIndex, 1);
    setTones(updatedTones);

    const updatedShades = [...shades];
    updatedShades.splice(rowIndex, 1);
    setShades(updatedShades);
  }, [shades, tones]);

  const { colorInputFields, toneRows } = useMemo(() => {
    const colorInputFields = Array.from({ length: totalColors }, (_, index) => (
            <Grid item key={index} xs={2}>
              <TextField label={`Color ${index + 1}`} onChange={(e) => handleColorChange(index, e.target.value)} />
            </Grid>
            ));
    
    const toneRows = tones.map((tone, rowIndex) => (
      <Grid container item key={rowIndex} xs={12} spacing={2}>
        <Grid item xs={2}>
          <IconButton aria-label="delete" color="error" onClick={e => handleRowDelete(rowIndex)}>
            <DeleteIcon />
          </IconButton>
          <TextField
            name={`color${rowIndex + 1}`}
            label={`Tone Color ${rowIndex + 1}`}
            value={tone}
            onChange={(e) => handleToneColorChange(rowIndex, e.target.value)}
          />
        </Grid>
        {
          shades[rowIndex].map((_, index) => (
            <Grid item key={index} xs={2}>
              <ImageUploadButton mode={"edit"} onImageUpload={file => handleImageUpload(rowIndex, index, file)} />
            </Grid>
          ))
        }
      </Grid>
    ));
    return {colorInputFields, toneRows};
  }, [handleColorChange, handleImageUpload, handleRowDelete, handleToneColorChange, shades, tones, totalColors]);

  const snackbarMarkup = useMemo(() => (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
    >
      <SnackbarContent
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  ), [snackbarMessage, snackbarOpen]);

  return (
    <form onSubmit={handleSubmission} encType="multipart/form-data">
      {snackbarMarkup}
      <div>
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={2} />
            {colorInputFields}
          </Grid>
          {toneRows}
        </Grid>
        <Button variant="contained" color="primary" onClick={handleAddRow}>
          Add Row
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};
