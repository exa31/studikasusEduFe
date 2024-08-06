import { Link, useLoaderData } from "react-router-dom"
import { addToCart, reduceItemCart, removeItemCart } from "../../app/redux/defaultSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCart, reduceCart, removeCart } from "../../app/api/cart";
import ListCart from "../../components/ListCart";
import { formatRupiah } from "../../utils";

export default function ViewCart() {
    const data = useLoaderData().items;

    const carts = useSelector((state) => state.defaultSlice.cart);

    // const [cart, setCart] = useState(carts);

    const dispatch = useDispatch();


    const handleAdd = (id) => {
        const payload = {
            productId: id
        }
        const productAdd = data.find((item) => item.product._id === id);
        dispatch(addToCart({ product: productAdd.product, qty: 1 }));
        addCart(payload)

    }

    const handleReduce = (id) => {
        const payload = {
            productId: id
        }
        const productReduce = data.find((item) => item.product._id === id);
        dispatch(reduceItemCart({ product: productReduce.product }));
        reduceCart(payload)
    }

    const handleDelete = (id) => {
        const payload = {
            productId: id
        }
        const productDelete = data.find((item) => item.product._id === id);
        dispatch(removeItemCart({ product: productDelete.product }));
        removeCart(payload)
    }

    const totalCart = carts.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    return (
        <div className="container p-4 mx-auto bg-base-200 rounded-2xl">
            <div>
                {
                    carts.length === 0 ? <div className="flex flex-col justify-center text-center">
                        <h1 className="text-center m-10 text-info text-4xl font-bold">Cart is empty</h1>
                        <h3 className="text-2xl mb-6">Add products</h3>
                        <Link to='/products' className="btn m-8 text-2xl btn-outline btn-primary">To shop</Link>
                    </div>
                        :
                        <>
                            <h1 className="text-center text-3xl font-bold">Cart</h1>
                            <div>
                                <div className="p-2 md:text-2xl font-bold text-center grid grid-cols-4">
                                    <p className="">Product</p>
                                    <p className="">Price</p>
                                    <p className="">Quantity</p>
                                    <p className="">Total</p>
                                </div>
                                {
                                    carts.map((item, index) => {
                                        return (
                                            <ListCart key={index} item={item} index={index} handleAdd={handleAdd} handleReduce={handleReduce} handleDelete={handleDelete} />
                                        )
                                    })
                                }
                                <div className="flex justify-between bg-info text-black font-bold px-5 py-2 rounded-b-2xl text-xl">
                                    <h3 className="col-span-3">Sub Total</h3>
                                    <h3 className="col-span-3">{formatRupiah(totalCart)}</h3>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <Link to='/pilih-alamat' className="btn w-full rounded-b-2xl text-xl font-bold btn-primary">Checkout</Link>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>)

}