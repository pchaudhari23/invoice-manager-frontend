import { useEffect, useState } from "react";
import { Grid, Typography, Box, Paper, Divider, Chip } from "@mui/material";
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
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 700,
          borderRadius: 4,
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight={700}
          color="primary"
          gutterBottom
        >
          Invoice Details
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Client Name */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Client Name
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              {invoice.clientName}
            </Typography>
          </Grid>

          {/* Service Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              Service Description
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", fontStyle: "italic" }}
            >
              {invoice.service}
            </Typography>
          </Grid>

          {/* Amount + Invoice Date */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={6}
              py={2}
            >
              <Box textAlign="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Amount
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="success.main"
                  mt={0.5}
                >
                  ${invoice.amount}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box textAlign="center">
                <Typography variant="subtitle2" color="text.secondary">
                  Invoice Date
                </Typography>
                <Typography variant="h6" fontWeight={600} mt={0.5}>
                  {invoice.invoiceDate
                    ? moment(invoice.invoiceDate).format("YYYY-MM-DD")
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Payment Method */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Payment Method
            </Typography>
            <Chip
              label={invoice.paymentMethod?.toUpperCase() || "-"}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, mt: 1 }}
            />
          </Grid>

          {/* Payment Status */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Payment Status
            </Typography>
            <Chip
              label={invoice.isPaid ? "Paid" : "Unpaid"}
              color={invoice.isPaid ? "success" : "warning"}
              variant="outlined"
              sx={{ fontWeight: 600, mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default InvoiceDetails;
