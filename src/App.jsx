import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./Layout/Layout";
import Users from "./pages/Users";
import Flights from "./pages/Flights";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="flights" element={<Flights />} />
      </Route>
    </Routes>
  );
}

export default App;
