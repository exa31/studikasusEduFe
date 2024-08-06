import { useState } from "react";
import CardDashboard from "../../components/CardDashboard";
import { useLoaderData } from "react-router-dom";

export default function DashBoardHome() {

    const product = useLoaderData()

    const [data, setData] = useState(product);


    const filterData = (id) => {
        setData(data.filter((item) => item._id !== id))
    }
    return (
        <div className=" bg-gray-300 py-14 px-3 text-black mx-auto w-full sm:pl-80">
            <h1 className="text-4xl font-bold text-center my-10">Data products</h1>
            <label className="input input-bordered mb-8 bg-white flex items-center text-black gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
            <div className="grid gap-7 lg:grid-cols-3 md:grid-cols-2 ">
                {data.products.map((item, index) => {
                    return (
                        <CardDashboard key={item._id} index={index} filterData={filterData}  {...item} />
                    )
                })}
            </div>

        </div>

    )
}