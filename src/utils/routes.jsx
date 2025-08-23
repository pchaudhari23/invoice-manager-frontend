import { lazy, Suspense } from "react";
import ProtectedRoute from "../app/components/Auth/ProtectedRoute";

const Loadable = (Component) => {
  return (props) => (
    <Suspense fallback={<div>Loading.....</div>}>
      <Component {...props} />
    </Suspense>
  );
};

const Login = Loadable(lazy(() => import("../app/pages/Login/Login")));
const Signup = Loadable(lazy(() => import("../app/pages/Signup/Signup")));
const Dashboard = Loadable(
  lazy(() => import("../app/pages/Dashboard/Dashboard"))
);
const InvoiceLayout = Loadable(
  lazy(() => import("../app/pages/Invoice/InvoiceLayout"))
);
const InvoiceList = Loadable(
  lazy(() => import("../app/pages/Invoice/InvoiceList"))
);
const InvoiceAddEdit = Loadable(
  lazy(() => import("../app/pages/Invoice/InvoiceAddEdit"))
);
const InvoiceDetails = Loadable(
  lazy(() => import("../app/pages/Invoice/InvoiceDetails"))
);
const Clients = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Clients,
    }))
  )
);
const Estimates = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Estimates,
    }))
  )
);
const Payments = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Payments,
    }))
  )
);
const Expenses = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Expenses,
    }))
  )
);
const Profile = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Profile,
    }))
  )
);
const Settings = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Settings,
    }))
  )
);
const Help = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Help,
    }))
  )
);
const Logout = Loadable(
  lazy(() =>
    import("../app/pages/DummyPages").then((module) => ({
      default: module.Logout,
    }))
  )
);

export const routes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/dashboard", element: <ProtectedRoute element={<Dashboard />} /> },
  {
    path: "/invoices",
    element: <ProtectedRoute element={<InvoiceLayout />} />,
    children: [
      {
        path: "",
        element: <InvoiceList />,
      },
      {
        path: "add",
        element: <InvoiceAddEdit mode="ADD" />,
      },
      {
        path: ":id/edit",
        element: <InvoiceAddEdit mode="EDIT" />,
      },
      {
        path: ":id",
        element: <InvoiceDetails />,
      },
    ],
  },
  { path: "/clients", element: <ProtectedRoute element={<Clients />} /> },
  { path: "/estimates", element: <ProtectedRoute element={<Estimates />} /> },
  { path: "/payments", element: <ProtectedRoute element={<Payments />} /> },
  { path: "/expenses", element: <ProtectedRoute element={<Expenses />} /> },
  { path: "/profile", element: <ProtectedRoute element={<Profile />} /> },
  { path: "/settings", element: <ProtectedRoute element={<Settings />} /> },
  { path: "/help", element: <ProtectedRoute element={<Help />} /> },
  { path: "/logout", element: <ProtectedRoute element={<Logout />} /> },
];
