import { Routes, Route, BrowserRouter } from "react-router-dom"

import Menu from "./routes/Menu"
import Cart from "./routes/Cart"
import CompleteOrder from "./routes/CompleteOrder"
import Orders from "./routes/Orders"

import Header from "./components/Header"

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ paddingTop: '72px' }}> 
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/complete-order" element={<CompleteOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App