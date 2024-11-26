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
import ShopsPage from "./pages/shop/ShopsPage";
import ShopDescriptionPage from "./pages/shop/ShopDescriptionPage";
import ShopCreatePage from "./pages/shop/ShopCreatePage";
import ShopStoreManager from "./pages/shop/ShopStoreManager";
import ShopEditPage from "./pages/shop/ShopEditPage";
import TransactionsPage from "./pages/transactions/TransactionsPage";
import TSupplyPage from "./pages/transactions/TSupplyPage";
import TSalePage from "./pages/transactions/TSalePage";
import TLossPage from "./pages/transactions/TLossPage";
import {MainPage} from "./pages/main/MainPage";
import {ReportsPage} from "./pages/reports/ReportsPage";
import TMovePage from "./pages/transactions/TMovePage";
import Register from "./pages/auth/Register";
import {RedirectRegister} from "./components/auth/Redirect";

function App() {
  return (
      <Router>
        <Routes>
            { /* orders */}
          <Route path="/orders/:id" element={<OrderPage />} />
          <Route path="/orders/:id/status" element={<OrderSuccessfulPage />} />
          { /* shop */}
          <Route path="/shops/" element={<ShopsPage />} />
          <Route path="/shops/create" element={<ShopCreatePage />} />
          <Route path="/shops/:id" element={<ShopDescriptionPage />} />
          <Route path="/shops/:id/stock/" element={<RemainingPage />} />
          <Route path="/shops/:id/manager/" element={<ShopStoreManager />} />
          <Route path="/shops/:id/edit/" element={<ShopEditPage />} />

           { /* cashiers */}
          <Route path="/cashiers/:id" element={<CashierProfileSettings />} />
          <Route path="/cashiers/:id/edit" element={<CashierProfileSettingsEdit />} />
          <Route path="/cashiers/create" element={<CashierProfileSettingsCreate />} />
          { /* products */ }
          <Route path="/sale" element={<SalePage />} />
          <Route path="/supply" element={<SupplyPage />} />
          <Route path="/loss" element={<LossPage />} />
          <Route path="/products/create" element={<ProductsCreate />} />
          <Route path="/products/:id/edit" element={<ProductsEditPage />} />
          <Route path="/products/:id" element={<ProductsDescPage />} />
          <Route path="/products/" element={<ProductsPage />} />
          {/* transactions */}
          <Route path="/transactions/" element={<TransactionsPage />} />
          <Route path="/transactions/supplies/:id" element={<TSupplyPage />} />
          <Route path="/transactions/sales/:id" element={<TSalePage />} />
          <Route path="/transactions/losses/:id" element={<TLossPage />} />
          <Route path="/transactions/moves/:id" element={<TMovePage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/redirect/register" element={<RedirectRegister />} />

        </Routes>
      </Router>
  );
}

export default App;
