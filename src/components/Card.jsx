import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import typeprops from 'prop-types';
import Badge from './Badge';

Card.propTypes = {
    img: typeprops.string.isRequired,
    title: typeprops.string.isRequired,
    description: typeprops.string.isRequired,
    price: typeprops.number.isRequired,
    tags: typeprops.array.isRequired,
    handleCart: typeprops.func.isRequired,
    id: typeprops.string.isRequired
};

export default function Card({ img, tags, id, title, description, price, handleCart }) {
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };
    return (
        <div className=" rounded-lg p-2 flex h-card bg-base-100 flex-col">
            <img className="object-contain mx-auto h-48 w-64" src={img} alt={title} />
            <div className="flex flex-col justify-between p-4 h-full">
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-3xl line-clamp-2 font-bold">{title}</h1>
                        <p className="font-semibold text-2xl">{formatRupiah(price)}</p>
                    </div>
                    {tags.map((tag, index) => {
                        return (
                            <Badge key={index + 99} tag={tag} />
                        )
                    })}
                    <p className='line-clamp-3 text-xl'>{description}</p>
                </div>
                <div className="mt-auto flex justify-between">
                    <button onClick={() => handleCart(id)} className="px-3 hover:opacity-90 text-2xl duration-200 font-bold btn btn-info rounded-md my-3 "><FontAwesomeIcon icon={faCartPlus} /></button>
                </div>
            </div>
        </div >
    )
}