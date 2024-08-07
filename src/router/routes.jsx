import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts";
import Home from "../pages/store";
import Products from "../pages/store/Products";
import Dashboard from "../layouts/Account";
import Profile from "../pages/profil/Profile";
import Pesanan from "../pages/profil/Pesanan";
import Alamat from "../pages/profil/Alamat.jsx";
import { productById, products, productsDashboard } from "../app/api/products";
import Login from "../layouts/Login";
import Registrasi from "../layouts/Registrasi";
import { getDeliveryAddress, getDeliveryAddressById } from "../app/api/deliveryAddress";
import { auth } from "../app/api/auth";
import CreateAlamat from "../pages/profil/CreateAlamat";
import EditAlamat from "../pages/profil/EditAlamat";
import DashBoard from "../layouts/Dashboard";
import DashBoardHome from "../pages/dashboard";
import EditProduct from "../pages/dashboard/EditProduct";
import CreateProduct from "../pages/dashboard/CreateProduct";
import ViewCart from "../pages/store/ViewCart";
import { getCart } from "../app/api/cart";
import PilihAlamat from "../layouts/PilihAlamat.jsx";
import Checkout from "../layouts/CheckOut.jsx";
import Invoice from "../layouts/Invoice.jsx";
import { getAllInvoices, getInvoices } from "../app/api/invoice/index.js";
import NotFound from "../pages/NotFound.jsx";
import ErrorLoader from "../pages/ErrorLoader.jsx";
// import { products } from "../app/api/products";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorLoader />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />,
                loader: products,
            },
            {
                path: '/cart',
                element: <ViewCart />,
                loader: getCart
            }
        ],
    },
    {
        path: "/account",
        element: <Dashboard />,
        errorElement: <ErrorLoader />,
        children: [
            {
                path: "profile",
                element: <Profile />,
                loader: auth
            },
            {
                path: "pesanan",
                element: <Pesanan />,
                loader: getAllInvoices
            },
            {
                path: "alamat",
                element: <Alamat />,
                loader: getDeliveryAddress
            },
            {
                path: "alamat/create-alamat",
                element: <CreateAlamat />,
            },
            {
                path: "alamat/edit-alamat/:id",
                element: <EditAlamat />,
                loader: getDeliveryAddressById
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Registrasi />,
    },
    {
        path: '/dashboard',
        element: <DashBoard />,
        errorElement: <ErrorLoader />,
        children: [
            {
                path: "products",
                element: <DashBoardHome />,
                loader: productsDashboard
            },
            {
                path: "products/edit/:id",
                element: <EditProduct />,
                loader: productById
            },
            {
                path: "add-product",
                element: <CreateProduct />,
            }
        ]
    },
    {
        path: "pilih-alamat",
        element: <PilihAlamat />,
        errorElement: <ErrorLoader />,
        loader: getDeliveryAddress
    },
    {
        path: "checkout/:id",
        element: <Checkout />,
        errorElement: <ErrorLoader />,
        loader: getDeliveryAddressById
    },
    {
        path: 'invoice/:order_id',
        element: <Invoice />,
        errorElement: <ErrorLoader />,
        loader: getInvoices
    },
    {
        path: "*",
        element: <NotFound />
    }


])

export default router;