import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { getInvoices } from "../../../network/invoiceapi";

const InvoiceList = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getInvoices().then((data) => {
      if (data && data.length > 0) {
        const formattedRows = data.map((invoice, index) => ({
          id: invoice._id || index, // Use _id or index as a fallback
          clientName: invoice.clientName,
          amount: invoice.amount,
          service: invoice.service,
          paymentMethod: invoice.paymentMethod,
          invoiceDate: new Date(invoice.invoiceDate),
          isPaid: invoice.isPaid,
        }));
        setRows(formattedRows);
      } else {
        setRows([]);
      }
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "clientName", headerName: "Client Name", flex: 1 },
    { field: "amount", headerName: "Amount", type: "number", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "paymentMethod", headerName: "Payment Method", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", type: "date", flex: 1 },
    {
      field: "isPaid",
      headerName: "Paid",
      type: "boolean",
      flex: 1,
      valueFormatter: (params) => (params.value ? "Yes" : "No"),
    },
  ];

  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Invoice List
      </Typography>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </div>
  );
};

export default InvoiceList;
