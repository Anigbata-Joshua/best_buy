import { Toaster } from 'react-hot-toast';
// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopLayout from './layouts/ShopLayout';
import AdminLayout from './layouts/AdminLayout';

// Admin Pages
import ViewUsers from './pages/admin/ViewUsers';
import CreateUser from './pages/admin/CreateUser';
import ProductGrid from "./components/ProductGrid";
import CreateProducts from "./pages/admin/CreateProducts";
import Register from './pages/admin/Register';
import Login from "./pages/admin/Login";
import Categories from "./pages/admin/Categories";

import ProductCard from './components/ProductCard';
import MerchantDashboard from './pages/admin/MerchantDashBoard';
import ViewProduct from "./pages/admin/ViewProduct";

// Shop Pages
import Home from "./pages/shop/Home";
import Shop from "./pages/shop/Shop";
import Product from './pages/shop/Product';
import Cart from "./pages/shop/Cart";
import DataProvider from './context/DataContext';
import Signup from './pages/shop/Signup';
import LoginUser from "./pages/shop/LoginUser"


function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>

          {/* Shop routes */}
          <Route element={<ShopLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:id" element={<Product />} />
          </Route>
            <Route path='signup' element ={<Signup/>} />
            <Route path='loginUser' element ={<LoginUser/>} />

          {/* Admin routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<MerchantDashboard />} />
            <Route path="product-grid" element={<ProductGrid />} />
            <Route path="users" element={<ViewUsers />} />
            <Route path="view-product" element={<ViewProduct />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="create-category" element={<Categories />} />
            <Route path="create-products" element={<CreateProducts />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="*" element={<div className='text-[70px] font-extrabold flex h-screen items-center justify-center '>404 - Page Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;