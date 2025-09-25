import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom"

import Menu from "./routes/Menu"
import Cart from "./routes/Cart"
import Orders from "./routes/Orders"
import HomePage from "./routes/HomePage"
import Header from "./components/Header"
import AdminLogin from "./routes/AdminLogin"
import ProtectedRoute from "./components/ProtectedRoute"

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header />}
      <div style={{ paddingTop: isAdminRoute ? "0" : "72px" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/orders" 
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
);

export default App;