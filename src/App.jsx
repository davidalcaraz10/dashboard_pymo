import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import General from './views/General';
import Dashboard from './views/Dashboard';
import Hospitals from './views/Hospitals';
import Warehouse from './views/Warehouse';
import Shipments from './views/Shipments';
import { Privada } from "./routes/Privada";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<General/>}/>
        <Route path="/dashboard" element={
          <Privada>
            <Dashboard/>
          </Privada>
        }/>
        <Route path="/dashboard" element={
          <Privada>
            <Dashboard />
          </Privada>
        }>
          <Route path="hospitals" element={<Hospitals />} />
          <Route path="warehouse" element={<Warehouse />} />
          <Route path="shipments" element={<Shipments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
