import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import RoutingPaths from "./pages/RoutingPaths";

function App() {
  return (
    <>
      <NavBar />
      <div className="p-2" />
      <RoutingPaths />
      <Footer />
    </>
  );
}

export default App;
