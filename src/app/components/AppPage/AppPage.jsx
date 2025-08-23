import Header from "../../components/Header/Header";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Footer from "../../components/Footer/Footer";
import PageBody from "./PageBody";
import PageHeader from "./PageHeader";
import "./AppPage.css";

const AppPage = ({ title, description, children }) => {
  return (
    <div className="app">
      <Header />
      <SideDrawer />
      <main id="app-body" className="app-body">
        <PageHeader title={title} description={description} />
        <PageBody>{children}</PageBody>
      </main>
      <Footer />
    </div>
  );
};

export default AppPage;
