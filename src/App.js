import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./pages/Footer";
import { AuthContextProvider } from "./context/authContext";

import RoutingPaths from "./pages/RoutingPaths";
import OverviewDialog from "./components/OverviewDialog";

function App() {
  return (
    <>
      <AuthContextProvider>
        <div className="App">
          <NavBar />
          <div className="my-5" />
          <OverviewDialog />
          <RoutingPaths />
          <br />
        </div>
        <Footer />
      </AuthContextProvider>
    </>
  );
}

export default App;
