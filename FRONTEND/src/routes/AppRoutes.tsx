import { BrowserRouter, Routes, Route } from "react-router-dom";

import LanguageSelection from "../pages/LanguageSelection";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguageSelection />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}