import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router'
import TruthTable from "./pages/TruthTable";
import PrimeFactorization from "./pages/PrimeFactorization";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-table" element={<TruthTable />} />
        <Route path="/prime-factorization" element={<PrimeFactorization />}/>
      </Routes> 
    </>
  );
}

export default App;
