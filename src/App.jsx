import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./Layout/Layout";
import Users from "./pages/Users";
import Flights from "./pages/Flights";
import About from "./pages/About";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="flights" element={<Flights />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
