import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BlockExplorer from './pages/BlockExplorer';
import History from './pages/History';
import MemPool from './pages/MemPool';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="block-explorer" element={<BlockExplorer />} />
          <Route path="history" element={<History />} />
          <Route path="mempool" element={<MemPool />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
