import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import CashierProfileSettings from './pages/casheir/CashierProfileSettings';
import CashierProfileSettingsEdit from './pages/casheir/CashierProfileSettingsEdit';
import CashierProfileSettingsCreate from './pages/casheir/CashierProfileSettingsCreate';
import './App.css';
import SalePage from "./pages/sale/SalePage";

function App() {
  return (
      <Router>
        <Routes>
            { /* orders */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
            { /* cashiers */}
          <Route path="/cashiers/:id" element={<CashierProfileSettings />} />
          <Route path="/cashiers/:id/edit" element={<CashierProfileSettingsEdit />} />
          <Route path="/cashiers/:id/create" element={<CashierProfileSettingsCreate />} />
          <Route path="/sale" element={<SalePage />} />
        </Routes>
      </Router>
  );
}

export default App;
