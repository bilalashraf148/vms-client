import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  styled
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { debounce } from "lodash";
import { getVehicles, deleteVehicles } from "../../services/vehicleCalls";
import { VehiclesUpload } from "../vehiclesUpload";

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  borderRight: '1px solid #ddd',
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledSearchBar = styled(TextField)({
  width: "50%",
});

const StyledTableContainer = styled(TableContainer)({
  maxHeight: "calc(83dvh - 140px)",
  overflowY: "auto",
  marginTop: "20px",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  "& .MuiToolbar-root": {
    color: "#fff !important",
  }
});

const StyledButton = styled(Button)({
  marginBottom: "5px",
});

const ROWS_PER_PAGE = 25;

export const VehicleTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSheetModal, setOpenSheetModal] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleSheetModal = useCallback(() => {
    setOpenSheetModal(!openSheetModal);
  }, [openSheetModal]);

  const debouncedSearch = debounce(value => setSearchTerm(value), 100);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        getVehicles((err, data) => {
          if (err) {
            setVehicles([]);
          } 
          else {
            setVehicles(data);
          }
          setLoading(false);
        });
      }, 1000);
    } 
    catch (error) {
      setVehicles([]);
      setLoading(false);
      console.error("Error fetching vehicles:", error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = useCallback(() => {
    setOpenSheetModal(false);
    setShowAlert(true);
    fetchVehicles();
  }, []);

  const handleChangePage = useCallback((_, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleSearchChange = useCallback(event => {
      debouncedSearch(event.target.value);
    }, [debouncedSearch]
  );

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      return vehicle.registration?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.bankName?.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, vehicles]);

  const handleSelectAllClick = useCallback((event) => {
    if (event.target.checked) {
      const newSelected = filteredVehicles.map((vehicle) => vehicle.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, [filteredVehicles]);

  const handleSelectClick = useCallback((_, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }, [selected]);

   const handleDeleteSelected = useCallback(() => {
    deleteVehicles(selected, (err, res) => {
      if (res) {
        setSelected([]);
        fetchVehicles();
      }
      else {
        // Need to handle error case
        console.log("Error deleting records: ", err);
      }
    });
  }, [selected]);

  const paginatedVehicles = useMemo(() => {
    return filteredVehicles.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredVehicles, page, rowsPerPage]);

  const tableBody = useMemo(() => {
    if(loading) {
      return <StyledTableRow>
        <StyledTableCell sx={{ textAlign: "center" }} colSpan={5}>
          <CircularProgress />
        </StyledTableCell> 
      </StyledTableRow>;
    }
    const markup = paginatedVehicles.map(
      ({ id, registration, bankName, make, city }, index) => (
        <StyledTableRow key={index}>
          <StyledTableCell width={"20px"}>{page * rowsPerPage + index + 1}</StyledTableCell>
          <StyledTableCell width={"117px"}>
                    <input
                      type="checkbox"
                      onChange={(event) => handleSelectClick(event, id)}
                      checked={selected.indexOf(id) !== -1}
                    />
                  </StyledTableCell>
          <StyledTableCell>{registration}</StyledTableCell>
          <StyledTableCell>{make}</StyledTableCell>
          <StyledTableCell>{bankName}</StyledTableCell>
          <StyledTableCell>{city}</StyledTableCell>
        </StyledTableRow>
      )
    );

    if (markup.length === 0) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={4} align="center">
            No records found
          </StyledTableCell>
        </StyledTableRow>
      );
    }
    return markup;
  }, [loading, paginatedVehicles, page, rowsPerPage, selected, handleSelectClick]);

  if (!vehicles) return <></>;
  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px", minHeight: "93.5vh" }}>
      {showAlert && <Alert severity="success">Data uploaded successfully</Alert>}
      <StyledButton variant="contained" startIcon={<CloudUploadIcon />} onClick={toggleSheetModal}>
        Insert data
      </StyledButton>
      <StyledSearchBar
        id="search-bar"
        label="Search by Registration Number or Bank Name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Box style={{ width: "70%", marginTop: "20px" }}>
        <Button disabled={selected.length === 0} variant="contained" color="secondary" onClick={handleDeleteSelected}>
          Delete Selected
        </Button>
        <StyledTableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  Index
                </StyledTableCell>
                <StyledTableCell>
                  <Box style={{ marginBottom: "10px" }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAllClick}
                      checked={selected.length === filteredVehicles.length && filteredVehicles.length > 0}
                    />
                    Select All
                  </Box>
                </StyledTableCell>
                <StyledTableCell>Registration</StyledTableCell>
                <StyledTableCell>Model</StyledTableCell>
                <StyledTableCell>Bank</StyledTableCell>
                <StyledTableCell>City</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
      <TablePagination
        rowsPerPageOptions={[25, 50]}
        component="div"
        count={filteredVehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {
        openSheetModal && <VehiclesUpload afterSubmit={handleSubmit} open={openSheetModal} handleClose={toggleSheetModal} />
      }
    </Box>
  );
};
