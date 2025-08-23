import { useEffect, useState } from "react";
import { Grid, Typography, Box, Paper, Divider, Chip } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const InvoiceDetails = ({ invoiceId, fetchInvoiceById }) => {
  const [invoice, setInvoice] = useState({
    clientName: "Acme Corporation",
    amount: 1200.5,
    service:
      "Website design and development\nIncluding mobile responsive design and SEO optimization.",
    paymentMethod: "card",
    invoiceDate: "2025-08-01",
    isPaid: true,
  });

  useEffect(() => {
    // Fetch invoice details by ID (you can replace this with your actual fetching logic)
    const loadInvoice = async () => {
      if (fetchInvoiceById && invoiceId) {
        const data = await fetchInvoiceById(invoiceId);
        setInvoice(data);
      }
    };
    loadInvoice();
  }, [invoiceId, fetchInvoiceById]);

  if (!invoice) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Loading invoice details...
      </Typography>
    );
  }

  return (
    <Box maxWidth="sm" mx="auto" py={4}>
      <Typography variant="h5" align="center" gutterBottom>
        Invoice Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={3} direction="column">
          {/* Client Name */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Client Name
            </Typography>
            <Typography variant="body1">{invoice.clientName}</Typography>
          </Grid>

          {/* Service Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Service Description
            </Typography>
            <Typography variant="body1" whiteSpace="pre-line">
              {invoice.service}
            </Typography>
          </Grid>

          {/* Amount + Invoice Date */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Amount
                </Typography>
                <Typography variant="body1">${invoice.amount}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Invoice Date
                </Typography>
                <Typography variant="body1">
                  {invoice.invoiceDate
                    ? moment(invoice.invoiceDate).format("YYYY-MM-DD")
                    : "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          {/* Payment Method */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Payment Method
            </Typography>
            <Chip
              label={invoice.paymentMethod?.toUpperCase() || "-"}
              color="primary"
              variant="outlined"
            />
          </Grid>

          {/* Payment Status */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Payment Status
            </Typography>
            <Chip
              label={invoice.isPaid ? "Paid" : "Unpaid"}
              color={invoice.isPaid ? "success" : "warning"}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default InvoiceDetails;
