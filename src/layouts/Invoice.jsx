import { Link, useLoaderData, useParams } from "react-router-dom"
import { paidInvoice } from "../app/api/order"

export default function Invoice() {
    const data = useLoaderData()

    const params = useParams()

    const paid = data.payment_status === 'paid'

    const handlePaid = () => {
        paidInvoice(params.order_id)
    }

    return (
        <div className="h-screen container mx-auto pt-12">
            < div className="container bg-base-200 m-auto rounded-2xl" >
                <div className="bg-base-300">
                    <h1 className="text-start text-lg opacity-50 p-4 font-bold">Invoices</h1>
                </div>
                <div className="overflow-x-auto p-12">
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
                        <div className="flex m-4 justify-center">
                            <Link to='/account/pesanan' className="btn w-40 btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Close</Link>
                        </div>
                        :
                        <div className="flex m-4 justify-between">
                            <Link to='/account/pesanan' className="btn w-40 btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Close</Link>
                            <button onClick={handlePaid} className="btn w-40 btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Paid</button>
                        </div>
                    }
                </div>
            </div >
        </div >
    )
}