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
        <div key={index} className="p-6 text-center items-center grid grid-cols-4">
            <div>
                <img className="object-fill h-48 w-72" src={item.product.image_url} alt={item.product.name} />
                <h1 className="text-xl font-bold">{item.product.name}</h1>
            </div>
            <p className="text-2xl">{formatRupiah(item.product.price)}</p>
            <div className="flex justify-center items-center gap-4">
                <button onClick={() => handleAdd(item.product._id)} className="btn text-2xl btn-primary">+</button>
                <p className="text-2xl">{item.qty}</p>
                <button onClick={() => handleReduce(item.product._id)} className="btn text-2xl btn-primary">-</button>
                <button onClick={() => handleDelete(item.product._id)} className="btn text-2xl btn-primary"><FontAwesomeIcon icon={faTrash} /></button>
            </div>
            <p className="text-2xl">{formatRupiah(item.product.price * item.qty)}</p>
        </div>
    )
}