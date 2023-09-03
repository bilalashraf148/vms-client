import React, { useState } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

export const CartToast = ({ isOpen, cartItems }) => {
  const [open, setOpen] = useState(isOpen);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={null} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="info">
          Current Items in Cart:
          {cartItems.map(( {item, quantity} , index) => (
            <div key={index}>
              {item.color}: {quantity}
            </div>
          ))}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
