import { Link, NavLink, Outlet } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function DashBoard() {
    const [showNav, setShowNav] = useState(false)
    return (
        <>
            <div className="bg-black fixed top-0 w-full z-20 text-lg flex justify-end shadow-lg shadow-violet-300">
                <button className=" btn btn-ghost m-3" ><Link className="text-xl hover:text-white duration-200" to="/account/profile">To profile</Link></button>
            </div>
            <div className="fixed z-50 md:hidden pt-2 text-3xl mx-2">
                <FontAwesomeIcon onClick={() => setShowNav(!showNav)} className={showNav ? "md:hidden hidden text-white" : "md:hidden text-white"} icon={faBars} />
                <FontAwesomeIcon onClick={() => setShowNav(!showNav)} className={showNav ? "md:hidden text-white" : "md:hidden hidden text-white"} icon={faXmark} />
            </div>
            <div className={showNav ? "fixed z-40 text-center left-0 h-full w-28 sm:w-72 text-white text-wrap bg-slate-900" : "fixed z-10 text-center left-0 h-full w-0 overflow-hidden sm:w-72 text-white text-wrap bg-slate-900"}>
                <div className="p-4">
                    <h1 className="text-lg sm:text-2xl font-bold text-center pt-24">Welcome to Dashboard</h1>
                    <p className=" font-semibold text-center text-sm mt-4">This is a dashboard page, you can add, edit, delete, and view products here</p>
                </div>
                <nav className="py-4 text-start flex flex-col">
                    <NavLink className={({ isActive, isPending }) =>
                        isActive
                            ? " w-full text-lg sm:text-2xl px-1 sm:pl-4 font-bold py-2 bg-white  duration-200 text-black hover:cursor-default"
                            : isPending
                                ? " w-full text-lg sm:text-2xl px-1 sm:pl-4 font-bold py-2  bg-white duration-200 text-black hover:cursor-default"
                                : "duration-200 text-lg sm:text-2xl px-1 sm:pl-4 py-2 font-bold text-white hover:opacity-70"
                    } to="products">
                        Products
                    </NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                        isActive
                            ? " w-full text-lg sm:text-2xl px-1 sm:pl-4 font-bold py-2 duration-200 bg-white text-black hover:cursor-default"
                            : isPending
                                ? " w-full text-lg sm:text-2xl px-1 sm:pl-4 font-bold py-2 duration-200 bg-white text-black hover:cursor-default"
                                : "duration-200 text-lg sm:text-2xl px-1 sm:pl-4 py-2 font-bold text-white hover:opacity-70"
                    } to="add-product">
                        Create Product
                    </NavLink>
                </nav>
            </div >
            <Outlet />
        </>
    )
}