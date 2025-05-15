import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom'
import TruthTable from "./pages/TruthTable";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-table" element={<TruthTable />} />
        <Route path="/basic-set-operations" element = {<SetOperations/>} />
      </Routes>
    </>
  );
}

export default App;
