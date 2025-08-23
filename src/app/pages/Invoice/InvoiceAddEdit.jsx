import { useEffect, useState } from "react";
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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { createInvoice } from "../../../network/invoiceapi";

const InvoiceAddEdit = ({ mode }) => {
  const initialState = {
    clientName: "",
    amount: "",
    service: "",
    paymentMethod: "",
    invoiceDate: null,
    isPaid: false,
  };

  const [invoice, setInvoice] = useState(initialState);

  useEffect(() => {
    if (mode === "edit") {
    } // Logic to fetch existing invoice data for editing can be added here
  }, [mode]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("INVOICE DATA:", invoice);
    let formattedDate = null;
    if (invoice.invoiceDate) {
      formattedDate = moment(invoice.invoiceDate).format("YYYY-MM-DD");
    }
    const invoiceData = {
      ...invoice,
      invoiceDate: formattedDate,
    };
    await createInvoice(invoiceData);
    setInvoice(initialState); // Reset form after submission
    console.log("INVOICE DATA:", invoiceData);
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

  return (
    <Box maxWidth="sm" mx="auto" py={4}>
      <Typography variant="h5" align="center" gutterBottom>
        {mode === "edit" ? "Edit Invoice" : "Add Invoice"}
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
                Submit Invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default InvoiceAddEdit;
