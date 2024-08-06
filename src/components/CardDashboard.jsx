import proptypes from "prop-types"
import { Link } from "react-router-dom"
import { deleteProduct } from "../app/api/products";
import Badge from "./Badge";
// import { Animated } from 'react-animated-css'
// import { useState } from "react"


CardDashboard.propTypes = {
    name: proptypes.string,
    description: proptypes.string,
    price: proptypes.number,
    image_url: proptypes.string,
    _id: proptypes.string,
    filterData: proptypes.func,
    tags: proptypes.array
}

export default function CardDashboard({ filterData, name, _id, description, price, image_url, tags }) {

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    function handleDelete() {
        // setVisible(false)
        setTimeout(() => {
            filterData(_id)
        }, 700);
        deleteProduct(_id).then((res) => {
            console.log(res)
        })
    }

    return (
        <div className=" rounded-lg p-2 flex h-card bg-white text-black flex-col">
            <img className="object-contain mx-auto h-48 w-64" src={image_url} alt={name} />
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="flex justify-between">
                        <p className="font-semibold">{formatRupiah(price)}</p>
                    </div>
                    <h1 className="text-2xl line-clamp-2 font-bold">{name}</h1>
                    {tags.map((tag, index) => {
                        return (
                            <Badge key={index + 99} tag={tag} />
                        )
                    })}
                    <p className='line-clamp-3'>{description}</p>
                </div>
                <div className="mt-auto flex justify-between">
                    <Link to={`/dashboard/products/edit/${_id}`} className="btn btn-neutral" > Edit</Link >
                    <button onClick={handleDelete} className="btn btn-warning" >Delete</button>
                </div>
            </div>
        </div >
    )
}