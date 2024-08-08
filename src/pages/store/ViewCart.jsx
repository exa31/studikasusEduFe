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
        <div className="min-h-screen">

            <div className="container p-4 mx-auto bg-base-200 rounded-2xl">
                <div>
                    {
                        carts.length === 0 ? <div className="flex flex-col justify-center text-center">
                            <h1 className="m-10 text-4xl font-bold text-center text-info">Cart is empty</h1>
                            <h3 className="mb-6 text-2xl">Add products</h3>
                            <Link to='/products' className="m-8 text-2xl btn btn-outline btn-primary">To shop</Link>
                        </div>
                            :
                            <>
                                <h1 className="text-3xl font-bold text-center">Cart</h1>
                                <div>
                                    <div className="grid grid-cols-4 p-2 font-bold text-center md:text-2xl">
                                        <p>Product</p>
                                        <p>Price</p>
                                        <p>Quantity</p>
                                        <p>Total</p>
                                    </div>
                                    {
                                        carts.map((item, index) => {
                                            return (
                                                <ListCart key={index} item={item} index={index} handleAdd={handleAdd} handleReduce={handleReduce} handleDelete={handleDelete} />
                                            )
                                        })
                                    }
                                    <div className="flex justify-between px-5 py-2 text-xl font-bold text-black bg-info rounded-b-2xl">
                                        <h3 className="col-span-3">Sub Total</h3>
                                        <h3 className="col-span-3">{formatRupiah(totalCart)}</h3>
                                    </div>
                                    <div className="flex justify-center mt-6">
                                        <Link to='/pilih-alamat' className="w-full text-xl font-bold btn rounded-b-2xl btn-primary">Checkout</Link>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )

}