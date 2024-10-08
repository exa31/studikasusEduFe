import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { useState } from "react";
import Logout from "../components/Logout";

export default function Layout() {

    const user = useSelector((state) => state.defaultSlice.login);
    const cart = useSelector((state) => state.defaultSlice.cart);
    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);


    const handleClick = () => {
        setOpen(!open);
    }

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };


    const qtyTotal = cart.reduce((total, item) => total + item.qty, 0);
    const subTotal = cart.reduce((total, item) => total + item.qty * item.product.price, 0);

    return (
        <>
            {open && <Logout handleClick={handleClick} />}
            <div className="sticky top-0 z-50 w-full h-min navbar navbar-center bg-base-100">
                <div className="flex-1">
                    <a className="text-xl font-bold">Exa Store</a>
                </div>
                <div>
                    <label className="md:hidden swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" onClick={() => setIsActive(!isActive)} />

                        {/* hamburger icon */}
                        <svg
                            className="fill-current swap-off"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>

                        {/* close icon */}
                        <svg
                            className="fill-current swap-on"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 512 512">
                            <polygon
                                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                    </label>
                </div>
                <div className={isActive ? 'fixed flex-col items-end z-30 top-16 bg-base-100 w-full right-0' : "flex-none hidden text-center md:flex"}>
                    <NavLink to='/' className={({ isActive }) =>
                        isActive ? 'btn btn-active btn-ghost' : 'btn btn-ghost'
                    }>Home</NavLink>
                    <NavLink to='/products' className={({ isActive }) =>
                        isActive ? 'btn btn-active btn-ghost' : 'btn btn-ghost'
                    }>Products</NavLink>
                </div >
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">{qtyTotal}</span>
                            </div>
                        </div>
                        {user &&
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">{qtyTotal} Items</span>
                                    <span className="text-info">Subtotal: {formatRupiah(subTotal)}</span>
                                    <div className="card-actions">
                                        <Link to='/cart' className="btn btn-primary btn-block">View cart</Link>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {user ?
                                <>
                                    <li>
                                        <Link to='/account/profile' className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><a onClick={() => setOpen(!open)}>Logout</a></li>
                                </>
                                :
                                <>
                                    <li><Link to='/login'>Login</Link></li>
                                    <li><Link to='/register'>Register</Link></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div >
            <Outlet />
            <Footer />
        </>
    );
}