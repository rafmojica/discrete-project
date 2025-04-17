import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router'
import TruthTable from "./pages/TruthTable";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-table" element={<TruthTable />} />
      </Routes>
    </>
  );
}

export default App;
