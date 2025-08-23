import axiosInstance from "./interceptor";

export const createInvoice = async (invoice) => {
  try {
    const response = await axiosInstance.post("/invoice/addinvoice", invoice);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateInvoiceReq = async (id, invoice) => {
  //   delete invoice._id;
  try {
    const response = await axiosInstance.put(
      `/invoice/invoices/${id}`,
      invoice
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/invoice/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getInvoices = async () => {
  try {
    const response = await axiosInstance.get("/invoice/invoices");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvoiceReq = async (id) => {
  try {
    const response = await axiosInstance.delete(`/invoice/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// app.get('/',
// app.post('/addinvoice',
// app.get('/invoices',
// app.get('/invoices/:id',
// app.put('/invoices/:id',
// app.patch('/invoices/:id',
// app.delete('/invoices/:id',
