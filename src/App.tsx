import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rockets from "./pages/Rockets";
import RocketDetails from "./pages/RocketDetails";
import Launches from "./pages/Launches";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rockets" element={<Rockets />} />
        <Route path="/rockets/:id" element={<RocketDetails />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
