import { Link, useLoaderData } from "react-router-dom"
import ListOrder from "../../components/ListOrder"

export default function Pesanan() {

    const data = useLoaderData()

    return (
        <>
            {data.length === 0 ?
                <div className="text-center bg-base-200">
                    <div >
                        Maaf belum anda belum memesan apapun
                    </div>
                    <div className="flex justify-center m-4">
                        <Link to='/products' className="w-40 btn btn-primary">Shop</Link>
                    </div>
                </div>
                :
                <div className="grid items-center grid-cols-7 gap-4 overflow-scroll text-xs max-h-svh text-start sm:text-md">
                    <h4 className="font-bold"></h4>
                    <h4 className="col-span-2 font-bold">Order ID</h4>
                    <h4 className="font-bold">Total</h4>
                    <h4 className="font-bold">Status</h4>
                    <h4 className="font-bold">Metode payment</h4>
                    <h4 className="font-bold">Invoice</h4>
                    {data.map((item, index) => {
                        return (
                            <ListOrder key={index} item={item} />
                        )
                    })}
                </div>
            }
        </>
    )
}