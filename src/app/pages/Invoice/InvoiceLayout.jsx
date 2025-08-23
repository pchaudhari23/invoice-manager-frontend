import AppPage from "../../components/AppPage/AppPage";
import { Outlet } from "react-router-dom";

const InvoiceLayout = () => {
  return (
    <AppPage title={"INVOICES PAGE"} description={""}>
      <Outlet />
    </AppPage>
  );
};

export default InvoiceLayout;
