import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout.jsx";
import Category from "./Components/Category/Category.jsx";
import Products from "./Components/Products/Products.jsx";
import Register from "./Components/Redister/Register.jsx";
import Brand from "./Components/Brand/Brand.jsx";
import Login from "./Components/Login/Login.jsx";
import Notfoundpage from "./Components/Notfoundpagr/Notfoundpage.jsx";
import { Toaster } from "react-hot-toast";
import AuthContextprovider from "./Context/AuthContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import ShipingAddress from "./Components/ShipingAddress/ShipingAddress.jsx";
import WishCart from "./Components/WishCart/WishCart.jsx";
import Forget from "./Components/forget/Forget.jsx";
import ResetPaassword from "./Components/forget/ResetPaassword.jsx";
import NewPassword from "./Components/forget/NewPassword.jsx";
function App() {
  const x = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/category",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },{
          path: "/WishCart",
          element: (
            <ProtectedRoute>
              <WishCart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/ShipingAddress/:cartId",
          element: (
            <ProtectedRoute>
              <ShipingAddress />
            </ProtectedRoute>
          ),
        },
        { path: "/register", element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/Forget", element: <Forget /> },
        { path: "/resetPaassword", element: <ResetPaassword /> },
        { path: "/newPassword", element: <NewPassword /> },
        {
          path: "/brand",
          element: (
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <Notfoundpage /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={x}>
      <AuthContextprovider>
        <Toaster position="top-right" reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthContextprovider>
    </QueryClientProvider>
  );
}

export default App;
