import "./App.css";
import Home from "./pages/Home";
// added from GPT to resolve npm vite issue
// import { Routes, Route } from 'react-router-dom'
import { Routes, Route} from 'react-router'
import TruthTable from "./pages/TruthTable";
import SetOperations from "./pages/SetOperations";

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
