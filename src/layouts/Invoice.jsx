import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { paidInvoice } from "../app/api/order"
import { setCart } from "../app/redux/defaultSlice"
import { useDispatch } from "react-redux"

export default function Invoice() {
    const data = useLoaderData()

    const params = useParams()

    const dispatch = useDispatch()

    const paid = data.payment_status === 'paid'

    dispatch(setCart([]))


    const navigate = useNavigate()

    const handlePaid = () => {
        paidInvoice(params.order_id).then(() => {
            navigate('/account/pesanan')
        })
    }

    return (
        <div className="container h-screen pt-12 mx-auto">
            < div className="container m-auto bg-base-200 rounded-2xl" >
                <div className="bg-base-300">
                    <h1 className="p-4 text-lg font-bold opacity-50 text-start">Invoices</h1>
                </div>
                <div className="p-12 overflow-x-auto">
                    <div className='grid grid-cols-2 gap-6'>
                        <h4 className='font-bold'>Status</h4>
                        <p>{data.payment_status}</p>
                        <h4 className='font-bold'>Order ID</h4>
                        <p>{data._id}</p>
                        <h4 className='font-bold'>Total Amount</h4>
                        <p>{data.total}</p>
                        <h4 className='font-bold'>Billed to</h4>
                        <div className="flex flex-col gap-6">
                            <div>
                                <h4>{data.user.full_name}</h4>
                                <p>{data.user.email}</p>
                            </div>
                            <div>
                                <p>Desa {data.delivery_address.kelurahan}, Kecamatan {data.delivery_address.kecamatan}, {data.delivery_address.kabupaten}, {data.delivery_address.provinsi}, {data.delivery_address.detail}</p>
                            </div>
                        </div>
                        <h4 className='font-bold'>Metode payment</h4>
                        <p className='font-bold'>{data.metode_payment}</p>
                    </div>
                    {paid ?
                        <div className="flex justify-center m-4">
                            <Link to='/account/pesanan' className="w-40 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Close</Link>
                        </div>
                        :
                        <div className="flex justify-between m-4">
                            <Link to='/account/pesanan' className="w-40 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Close</Link>
                            <button onClick={handlePaid} className="w-40 btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Paid</button>
                        </div>
                    }
                </div>
            </div >
        </div >
    )
}