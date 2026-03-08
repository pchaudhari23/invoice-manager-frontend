import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { getInvoices, deleteInvoiceReq } from "../../../network/invoiceapi";

const InvoiceList = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    getInvoices().then((data) => {
      if (data && data.length > 0) {
        const formattedRows = data.map((invoice, index) => ({
          id: invoice.id || index,
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
  };

  const handleEdit = (id) => {
    navigate(`/invoices/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      await deleteInvoiceReq(id);
      fetchInvoices();
    }
  };

  const handleClientClick = (id) => {
    navigate(`/invoices/${id}`);
  };

  const columns = [
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      renderCell: (params) => (
        <Box
          onClick={() => handleClientClick(params.row.id)}
          sx={{
            cursor: "pointer",
            color: "primary.main",
            textDecoration: "underline",
            "&:hover": {
              fontWeight: "bold",
            },
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "amount", headerName: "Amount", type: "number", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "paymentMethod", headerName: "Payment Method", flex: 1 },
    { field: "invoiceDate", headerName: "Invoice Date", type: "date", flex: 1 },
    {
      field: "isPaid",
      headerName: "Paid",
      flex: 0.8,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row.id)}
            title="Edit"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            title="Delete"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
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
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/invoices/add")}
        >
          Add New Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceList;
