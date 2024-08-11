import { Link, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { formatRupiah } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../app/api/order";


export default function Checkout() {

    const data = useLoaderData();

    const [error, setError] = useState({ paymentMethod: false })

    const [paymentMethod, setPaymentMethod] = useState('')

    const idAddress = useParams().id

    const navigate = useNavigate();

    const cart = useSelector(state => state.defaultSlice.cart)


    const subtotal = cart.reduce((total, item) => total + item.qty * item.product.price, 0)
    const deliveryFee = 20000
    const total = subtotal + deliveryFee

    const handleCheckOut = () => {
        if (paymentMethod === '') {
            setError({ paymentMethod: true })
            return
        }
        const order = {
            delivery_address: idAddress,
            metode_payment: paymentMethod
        }

        return createOrder(order).then((res) => {
            navigate(`/invoice/${res._id}`)
        })
    }

    return (
        <div className="container h-screen pt-12 mx-auto">
            < div className="container m-auto bg-base-200 rounded-2xl" >
                <div className="bg-base-300">
                    <h1 className="p-4 text-lg font-bold opacity-50 text-start">Checkout</h1>
                </div>
                <h1 className="py-4 text-3xl font-bold text-center">Konfirmasi</h1>
                <div className="p-12 overflow-x-auto">

                    <div className='grid grid-cols-2 gap-6'>
                        <h4 className='font-bold'>Alamat</h4>
                        <p>Desa {data.kelurahan}, Kecamatan {data.kecamatan}, {data.kabupaten}, {data.provinsi}, {data.detail}</p>
                        <h4 className='font-bold'>Sub Total</h4>
                        <p>{formatRupiah(subtotal)}</p>
                        <h4 className='font-bold'>Delivery fee</h4>
                        <p>{formatRupiah(deliveryFee)}</p>
                        <h4 className='font-bold'>Metode Pembayaran</h4>
                        <div>
                            <select name="payment" onChange={(e) => setPaymentMethod(e.target.value)} defaultValue='Pilih Metode Pembayaran' id="payment" className="select select-bordered w-fit">
                                <option disabled>Pilih Metode Pembayaran</option>
                                <option value="tunai">Tunai</option>
                                <option value="transfer">Transfer</option>
                            </select>
                            {error.paymentMethod && <p className="text-red-500">Metode Pembayaran harus diisi</p>}
                        </div>
                        <h4 className='font-bold'>Total</h4>
                        <p className='font-bold'>{formatRupiah(total)}</p>

                    </div>
                    <div className="flex justify-between m-4">
                        <Link to='/cart' className="w-40 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Back</Link>
                        <button onClick={handleCheckOut} className="w-40 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Checkout</button>
                    </div>
                </div>
            </div >
        </div >
    )

}