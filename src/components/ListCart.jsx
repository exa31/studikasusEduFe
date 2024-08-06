import { formatRupiah } from '../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import proptype from 'prop-types'

ListCart.propTypes = {
    item: proptype.object,
    index: proptype.number,
    handleAdd: proptype.func,
    handleReduce: proptype.func,
    handleDelete: proptype.func
}


export default function ListCart({ item, index, handleAdd, handleReduce, handleDelete }) {
    return (
        <div key={index} className="p-1 text-center items-center grid grid-cols-4">
            <div>
                <img className="object-fill md:h-48 w-72" src={item.product.image_url} alt={item.product.name} />
                <h1 className="md:text-xl text-xs font-bold">{item.product.name}</h1>
            </div>
            <p className="md:text-2xl text-xs">{formatRupiah(item.product.price)}</p>
            <div className="flex justify-center items-center gap-1">
                <button onClick={() => handleAdd(item.product._id)} className="btn text-xs md:text-2xl btn-xs sm:btn-sm md:btn-md lg:btn-lg  btn-primary">+</button>
                <p className="text-xs md:text-2xl">{item.qty}</p>
                <button onClick={() => handleReduce(item.product._id)} className="btn text-xs md:text-2xl btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">-</button>
                <button onClick={() => handleDelete(item.product._id)} className="btn text-xs md:text-2xl btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <p className="md:text-2xl text-xs">{formatRupiah(item.product.price * item.qty)}</p>
        </div>
    )
}