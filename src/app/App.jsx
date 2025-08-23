import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "../utils/routes";
import { AuthProvider } from "./components/Auth/AuthProvider";

// Flatten the routes structure so that children routes are not nested
function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
