import "./App.css";
import Home from "./pages/Home";
// added from GPT to resolve npm vite issue
// import { Routes, Route } from 'react-router-dom'
import { Routes, Route} from 'react-router'
import TruthTable from "./pages/TruthTable";
import SetOperations from "./pages/SetOperations";
import PrimeFactorization from "./pages/PrimeFactorization";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/truth-table" element={<TruthTable />} />
        <Route path="/basic-set-operations" element = {<SetOperations/>} />
        <Route path="/prime-factorization" element={<PrimeFactorization />}/>
      </Routes>
    </>
  );
}

export default App;
