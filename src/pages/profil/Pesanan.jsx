import { useLoaderData } from "react-router-dom"
import ListOrder from "../../components/ListOrder"

export default function Pesanan() {
    const data = useLoaderData()
    return (
        <>
            {data.length === 0 ?
                <div>
                    <h1 >Maaf anda belum memesan apapun</h1>
                </div>
                :
                <div className="grid gap-4 items-center text-start sm:text-md text-xs grid-cols-7">
                    <h4 className="font-bold"></h4>
                    <h4 className="font-bold col-span-2">Order ID</h4>
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