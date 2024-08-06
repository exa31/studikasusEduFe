import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import proptype from "prop-types";
import { useState } from "react";

ListOrder.propTypes = {
    item: proptype.object.isRequired
}

export default function ListOrder({ item }) {
    const [show, setShow] = useState(false);
    return (
        <>
            <p className="w-min"><FontAwesomeIcon onClick={() => setShow(!show)} className={show ? 'rotate-0 sm:text-3xl text-xl duration-200' : 'rotate-180 sm:text-3xl text-xl duration-200'} icon={faAngleUp} /></p>
            <p className="col-span-2 overflow-x-auto">{item._id}</p>
            <p>{item.total}</p>
            <p>{item.payment_status}</p>
            <p>{item.metode_payment}</p>
            <p>
                <Link to={`/invoice/${item.order._id}`} className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Invoice</Link>
            </p>

            {show &&
                <>
                    <h4 className="col-start-2 col-span-2 font-bold">Product</h4>
                    <h4 className="col-span-2 font-bold">Qty</h4>
                    <h4 className="col-span-2 font-bold">Total Price</h4>
                    {item.order.orderItems.map((item, index) => {
                        return (
                            <>
                                <p key={index} className="col-start-2 col-span-2">{item.name}</p>
                                <p className="col-span-2">{item.qty}</p>
                                <p className="col-span-2">{item.price}</p>
                            </>

                        )
                    })}
                </>
            }
        </>
    )
}