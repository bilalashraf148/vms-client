import React, { useCallback, useState, useRef } from "react";
import { Modal, Box, Typography, Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { createVehicles } from "../../services/vehicleCalls";
import CircularProgress from "@mui/material/CircularProgress";

const StyledModalBox = styled(Box)({
  backgroundColor: "white",
  borderRadius: 8,
  boxShadow: 24,
  left: "50%",
  minHeight: "100px",
  padding: 4,
  position: "absolute",
  textAlign: "center",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
});

const StyledButtonContainer = styled(Box)({
  marginTop: "20px",
  display: "flex",
  justifyContent: "center",
});

// const StyledSelect = styled(Select)({
//   width: "50%",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
//   marginTop: "10px",
// });

export const VehiclesUpload = ({ handleClose, afterSubmit, open }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [selectedBank, setSelectedBank] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current.click();
  }, []);

  const handleUpload = useCallback(event => {
    // if (!selectedBank) {
    //   setErrorMessage("Please select a value from the dropdown.");
    //   return;
    // }
    const file = event.target.files[0];
    if (file?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      setErrorMessage("");
      setSelectedFile(file.name);
      const formData = new FormData();
      formData.append("file", file);
      // formData.append("bank", selectedBank);
      setLoading(true);
      createVehicles(formData, () => {
        setTimeout(() => {
          setLoading(false);
          afterSubmit();
        }, 1000);
      });
    } 
    else {
      setErrorMessage("Please upload a file in .xlsx format.");
    }
  }, [afterSubmit]);

  // const onBankChange = useCallback(( event ) =>{
  //   const { value } = event.target;
  //   setSelectedBank(value);
  // }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      <StyledModalBox>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {errorMessage && (
              <Typography variant="body2" color="error" gutterBottom>
                {errorMessage}
              </Typography>
            )}
            <Typography variant="h6" gutterBottom>
              Upload Spreadsheet
            </Typography>
            {/* <Box>
              <StyledSelect
                value={selectedBank}
                onChange={onBankChange}
              >
                <MenuItem value="Bank Alfalah">Bank Alfalah</MenuItem>
                <MenuItem value="Bank Al Habib">Bank Al Habib</MenuItem>
              </StyledSelect>
            </Box> */}
            <Box>
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                onClick={handleFileSelect}
              >
                {selectedFile ? selectedFile : "Upload"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              />
            </Box>
            <StyledButtonContainer>
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </StyledButtonContainer>
          </>
        )}
      </StyledModalBox>
    </Modal>
  );
};
