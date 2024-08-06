import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useLoaderData } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { products } from "../../app/api/products";
import Skelaton from "../../components/Skelaton";
import SelectCategory from "../../components/SelectCategory";
import { categories, categoriesByName } from "../../app/api/category";
import { tags } from "../../app/api/tags/tags";
import BadgeTag from "../../components/BadgeTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { addCart } from "../../app/api/cart";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/redux/defaultSlice";


export default function Products() {

    const data = useLoaderData();
    const [product, setProduct] = useState(data);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(Math.ceil(data.data / 8));
    const [tag, setTag] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowHeight, setWindowHeight] = useState(0);
    const [category, setCategory] = useState([]);
    const [criteria, setCriteria] = useState({
        q: "",
        category: "Pilih Category",
        tag: [],
        limit: 12,
        skip: 0
    });

    useEffect(() => {
        setLoading(true);
        products(criteria).then((data) => {
            const totalProduct = data.data;
            setProduct(data);
            setLoading(false);
            setTotalPage(Math.ceil(totalProduct / 12));
        });
    }, [criteria]);

    useEffect(() => {
        categories().then((data) => {
            setCategory(data);
        })
    }, []);

    useEffect(() => {
        const handleResize = () => {

            return setWindowHeight(window.pageYOffset);

        };

        window.addEventListener("scroll", handleResize);
        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleResize);
        };
    }
        , []);

    useEffect(() => {
        tags().then((data) => {
            setTag(data);
        })
    }, []);


    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        e.target.search.value = "";
        setCurrentPage(1);
        setCriteria({ ...criteria, q: e.target.search.value });
    }

    function handleChangeCategory(value) {
        setCriteria({ ...criteria, category: value, tag: [] });
        setCurrentPage(1);
        categoriesByName(value).then((data) => {
            // console.log(data.tags.map((tag) => console.log(tag)));
            setTag(data.tags);
            // setFilter({ ...filter, category: data });
        });
    }


    function handleClick(tags) {
        if (criteria.tag.includes(tags)) {
            const newTag = criteria.tag.filter((tag) => tag !== tags);
            setCriteria({ ...criteria, tag: newTag, skip: 0 });
            setCurrentPage(1);
            return;
        } else {
            setCriteria({ ...criteria, tag: [...criteria.tag, tags], skip: 0 });
            setCurrentPage(1);
        }
    }


    function handleChangePage(e) {
        setCriteria({ ...criteria, skip: (e - 1) * 12 });
    }

    const dispatch = useDispatch();



    function handleCart(id) {
        const payload = {
            productId: id
        }
        const productAdd = product.products.find((product) => product._id === id);
        dispatch(addToCart({ product: productAdd, qty: 1 }));
        addCart(payload)
    }

    const handleReset = () => {
        setCriteria({ q: "", category: "Pilih Category", tag: [], limit: 12, skip: 0 });
        setCurrentPage(1);
    }

    return (
        <>
            <div className="bg-base-300">
                <form onSubmit={handleSubmit} className="flex justify-center p-5">
                    <input type="text" placeholder="Type here" defaultValue={criteria.q} name="search" className="input input-bordered w-6/12 " />
                    <button type="submit" className="btn btn-primary">Search</button>
                    <button onClick={handleReset} type="button" className="btn btn-info">Reset</button>
                </form>
                <div className="flex justify-center w-full">
                    <SelectCategory category={category} valueCategory={criteria.category} handleChange={handleChangeCategory} />
                </div>
                <div className="flex gap-2 flex-wrap items-center justify-center">
                    <h1 className="text-3xl">Tag:</h1>
                    {tag.map((tag) => {
                        return (
                            <BadgeTag criteria={criteria.tag} handleClick={handleClick} key={tag._id} tag={tag} />
                        )
                    })}
                </div>

                <div className="grid gap-6 p-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    {loading ?
                        Array.from({ length: 8 }).map((_, i) => {
                            return <Skelaton key={i} />
                        })
                        :
                        product.products.map((product) => {
                            return (
                                <Card
                                    key={product._id}
                                    id={product._id}
                                    img={product.image_url}
                                    title={product.name}
                                    description={product.description}
                                    price={product.price}
                                    handleCart={handleCart}
                                    tags={product.tags}
                                />
                            );
                        })
                    }
                </div>
                <div className="flex justify-center p-5">
                    <Pagination currentPage={currentPage} handleChangePage={handleChangePage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
                </div>
                {windowHeight > 200 &&
                    <div className=" fixed z-50 bottom-10 animate-bounce right-10 flex justify-center items-center bg-base-100 k rounded-full w-8 h-8 md:w-12 md:h-12">
                        <a href="#" ><FontAwesomeIcon className="text-2xl md:text-4xl rotate-180 text-info" icon={faArrowDown} /></a>
                    </div>
                }
            </div >
        </>
    )
}