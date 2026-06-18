import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import AddPO from "./pages/AddPO";
import POList from "./pages/POList";
import EditDispatch from "./pages/EditDispatch";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/add-po" element={<AddPO />} />

        <Route path="/po-list" element={<POList />} />

        <Route
          path="/edit/:id"
          element={<EditDispatch />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;