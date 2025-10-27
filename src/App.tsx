import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rockets from "./pages/Rockets";
import RocketDetails from "./pages/RocketDetails";
import Launches from "./pages/Launches";
import History from "./pages/History";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <header className="mb-6 md:mb-12">
        <Navbar />
      </header>
      <main className="px-4 sm:px-6 md:px-12 lg:px-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rockets" element={<Rockets />} />
          <Route path="/rockets/:id" element={<RocketDetails />} />
          <Route path="/launches" element={<Launches />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <footer className="mt-12 px-4 sm:px-6 md:px-12 lg:px-24">
        <Footer />
      </footer>
    </BrowserRouter>
  );
}
