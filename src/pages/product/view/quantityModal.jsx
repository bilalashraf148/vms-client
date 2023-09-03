import React, { useState } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";

const wrapperStyles = {
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  left: "50%",
  p: 4,
  position: "absolute",
  textAlign: "center",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
}
export const QuantityModal = ({ isOpen, onSubmitQuantity }) => {
  const [open, setOpen] = useState(isOpen);
  const [quantity, setQuantity] = useState(0);

  const handleClose = () => {
    setOpen(false);
    onSubmitQuantity(0);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = () => {
    handleClose(quantity);
    onSubmitQuantity(quantity);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="quantity-modal-title"
        aria-describedby="quantity-modal-description"
      >
        <Box sx={wrapperStyles}>
          <Typography id="quantity-modal-title" variant="h6" component="div">
            Enter Quantity
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

