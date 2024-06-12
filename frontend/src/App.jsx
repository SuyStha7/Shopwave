import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Admin/Dashboard";
import DashboardLayout from "./pages/Admin/DashboardLayout";
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import Orders from "./pages/Admin/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Categories from "./pages/Admin/Categories";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import AddProduct from "./pages/Admin/AddProduct";

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="tracking-wider">
      {!isAdmin && !isAuthPage && <Navbar />}

      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/about'
          element={<About />}
        />
        <Route
          path='/shop'
          element={<Shop />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
        <Route
          path='/profile'
          element={<Profile />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
        <Route
          path='/login'
          element={<Login />}
        />

        <Route
          path='/admin'
          element={<DashboardLayout />}>
          <Route
            index
            element={<Dashboard />}
          />
          <Route
            path='users'
            element={<Users />}
          />
          <Route
            path='products'
            element={<Products />}
          />
          <Route
            path='products/add'
            element={<AddProduct/>}
          />
          <Route
            path='categories'
            element={<Categories />}
          />
          <Route
            path='categories/update/:slug'
            element={<UpdateCategory />}
          />
          <Route
            path='orders'
            element={<Orders />}
          />
        </Route>
      </Routes>

      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default App;
