import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Menu from "./routes/Menu"
import Cart from "./routes/Cart"
import Orders from "./routes/Orders"
import HomePage from "./routes/HomePage"
import Header from "./components/Header"
import AdminLogin from "./routes/AdminLogin"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const homePage = location.pathname === '/';

  return (
    <>
      {!isAdminRoute && !homePage && <Header />}
      <div style={{ paddingTop: isAdminRoute || homePage ? "0" : "72px" }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/menu"
              element={
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Menu />
                </motion.div>
              }
            />
            <Route
              path="/cart"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                >
                  <Cart />
                </motion.div>
              }
            />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Orders />
                  </motion.div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <Layout />
    <ToastContainer position="top-right" autoClose={3000} />
  </BrowserRouter>
);

export default App;
