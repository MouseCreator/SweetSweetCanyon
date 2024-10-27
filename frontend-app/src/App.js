import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CashierProfileSettings from './pages/casheir/CashierProfileSettings';
import CashierProfileSettingsEdit from './pages/casheir/CashierProfileSettingsEdit';
import CashierProfileSettingsCreate from './pages/casheir/CashierProfileSettingsCreate';
import './App.css';
import SalePage from "./pages/sale/SalePage";
import OrderSuccessfulPage from "./pages/orders/OrderSuccessPage";

function App() {
  return (
      <Router>
        <Routes>
            { /* orders */}
          <Route path="/orders/status/:id" element={<OrderSuccessfulPage />} />
            { /* cashiers */}
          <Route path="/cashiers/:id" element={<CashierProfileSettings />} />
          <Route path="/cashiers/:id/edit" element={<CashierProfileSettingsEdit />} />
          <Route path="/cashiers/create" element={<CashierProfileSettingsCreate />} />
          <Route path="/sale" element={<SalePage />} />
        </Routes>
      </Router>
  );
}

export default App;
