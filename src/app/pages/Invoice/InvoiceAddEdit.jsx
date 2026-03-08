import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {
  createInvoice,
  getInvoiceDetails,
  updateInvoiceReq,
} from "../../../network/invoiceapi";

const InvoiceAddEdit = ({ mode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialState = {
    clientName: "",
    amount: "",
    service: "",
    paymentMethod: "",
    invoiceDate: null,
    isPaid: false,
  };

  const [invoice, setInvoice] = useState(initialState);
  const [loading, setLoading] = useState(mode === "EDIT");

  useEffect(() => {
    if (mode === "EDIT" && id) {
      fetchInvoiceDetails();
    }
  }, [mode, id]);

  const fetchInvoiceDetails = async () => {
    try {
      const data = await getInvoiceDetails(id);
      if (data) {
        setInvoice({
          clientName: data.clientName,
          amount: data.amount,
          service: data.service,
          paymentMethod: data.paymentMethod,
          invoiceDate: moment(data.invoiceDate),
          isPaid: data.isPaid,
        });
      }
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let formattedDate = null;
    if (invoice.invoiceDate) {
      formattedDate = moment(invoice.invoiceDate).format("YYYY-MM-DD");
    }
    const invoiceData = {
      ...invoice,
      invoiceDate: formattedDate,
    };

    try {
      if (mode === "EDIT" && id) {
        await updateInvoiceReq(id, invoiceData);
      } else {
        await createInvoice(invoiceData);
      }
      navigate("/invoices");
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoice((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (event) => {
    setInvoice({ ...invoice, isPaid: event.target.value === "true" });
  };

  const handleDateChange = (date) => {
    setInvoice({ ...invoice, invoiceDate: date });
  };

  if (loading) {
    return (
      <Box
        maxWidth="sm"
        mx="auto"
        py={4}
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)"
      flex={1}
      paddingTop={"20px"}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 1,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          background: "rgba(255,255,255,0.98)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {mode === "EDIT" ? "Edit Invoice" : "Add Invoice"}
        </Typography>

        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={3} direction="column">
            {/* Client Name */}
            <Grid item xs={12}>
              <TextField
                label="Client Name"
                name="clientName"
                value={invoice.clientName}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>

            {/* Service (TextArea) */}
            <Grid item xs={12}>
              <TextField
                label="Service Description"
                name="service"
                value={invoice.service}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>

            {/* Amount + Invoice Date */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={invoice.amount}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      label="Invoice Date"
                      value={invoice.invoiceDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth required />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            {/* Payment Method + Payment Status */}

            {/* Payment Method Dropdown */}
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={invoice.paymentMethod}
                  onChange={handleInputChange}
                  label="Payment Method"
                  fullWidth
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="card">Card</MenuItem>
                  <MenuItem value="upi">UPI</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Payment Status (Radio Buttons) */}
            <Grid item xs={6}>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  name="isPaid"
                  value={invoice.isPaid.toString()}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Paid"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Unpaid"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button variant="contained" color="primary" type="submit">
                  {mode === "EDIT" ? "Update Invoice" : "Submit Invoice"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default InvoiceAddEdit;
