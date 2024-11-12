import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CashierProfileSettings from './pages/casheir/CashierProfileSettings';
import CashierProfileSettingsEdit from './pages/casheir/CashierProfileSettingsEdit';
import CashierProfileSettingsCreate from './pages/casheir/CashierProfileSettingsCreate';
import './App.css';
import SalePage from "./pages/sale/SalePage";
import OrderSuccessfulPage from "./pages/orders/OrderSuccessPage";
import ProductsCreate from "./pages/products/ProductsCreate";
import ProductsDescPage from "./pages/products/ProductsDescPage";
import OrderPage from "./pages/orders/OrderPage";
import RemainingPage from "./pages/shop/RemainingPage";
import SupplyPage from "./pages/supply/SupplyPage";
import LossPage from "./pages/loss/LossPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductsEditPage from "./pages/products/ProductsEditPage";

function App() {
  return (
      <Router>
        <Routes>
            { /* orders */}
          <Route path="/orders/:id" element={<OrderPage />} />
          <Route path="/orders/:id/status" element={<OrderSuccessfulPage />} />
          <Route path="/shops/:id/remaining/" element={<RemainingPage />} />

            { /* cashiers */}
          <Route path="/cashiers/:id" element={<CashierProfileSettings />} />
          <Route path="/cashiers/:id/edit" element={<CashierProfileSettingsEdit />} />
          <Route path="/cashiers/create" element={<CashierProfileSettingsCreate />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="/supply" element={<SupplyPage />} />
          <Route path="/loss" element={<LossPage />} />
          <Route path="/products/create" element={<ProductsCreate />} />
          <Route path="/products/:id/edit" element={<ProductsEditPage />} />
          <Route path="/products/:id" element={<ProductsDescPage />} />
          <Route path="/products/" element={<ProductsPage />} />
        </Routes>
      </Router>
  );
}

export default App;
