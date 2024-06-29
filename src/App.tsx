import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutWebsite from "./components/LayoutWebsite";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import LayoutAdmin from "./components/LayoutAdmin";

import ProductForm from "./pages/admin/ProductForm/ProductForm";
import Notfound from "./pages/Notfound";
import PrivateRouter from "./components/PrivateRouter";
import ListProduct from "./pages/admin/ListProduct/ListProducts";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<LayoutWebsite />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" />} />
          </Route>
          <Route path="/admin" element={<PrivateRouter />}>
            <Route path="/admin" element={<LayoutAdmin />}>
              <Route index element={<ListProduct />} />
              <Route path="product-form/:id" element={<ProductForm />} />
              <Route path="product-form" element={<ProductForm />} />
            </Route>
          </Route>
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
