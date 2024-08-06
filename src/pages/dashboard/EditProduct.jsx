import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { updateProduct } from "../../app/api/products"
import { useEffect, useState } from "react"
import { categoriesByName } from "../../app/api/category"
import Checkbox from "../../components/Checkbox"


export default function EditProduct() {

    const data = useLoaderData()
    const navigate = useNavigate()
    const [categories, setCategories] = useState(null)
    const [error, setError] = useState({})
    const [tags, setTags] = useState([])

    useEffect(() => {
        if (categories === "Makanan" || categories === "Minuman") {
            categoriesByName(categories).then((res) => {
                setTags(res.tags);
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [categories]);

    function onSubmit(e) {
        e.preventDefault()
        const name = e.target.name.value
        const price = e.target.price.value
        const description = e.target.description.value
        const image = e.target.image.files[0]
        const category = e.target.category.value

        const errors = {}

        if (name.length < 3) {
            errors.name = true
        }

        setError(errors)

        if (Object.keys(errors).length > 0) {
            return
        } else {
            setError({})
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', price)
            formData.append('description', description)
            formData.append('image', image)
            formData.append('category', category)

            e.target.tags.forEach((item) => {
                if (item.checked) {
                    formData.append('tags', item.value)
                }
            })
            updateProduct(data._id, formData).then(() => {
                navigate('/dashboard/products')
            })
        }
    }

    return (
        <div className="bg-gray-300 py-14 px-3 mx-auto text-black w-full sm:pl-80" >
            <h1 className="text-4xl font-bold text-center my-10">Edit</h1>
            <form onSubmit={onSubmit} action="">
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="name">Name</label>
                    <input defaultValue={data.name} className="mx-auto bg-white block w-full my-5 p-3 rounded-ss-2xl rounded-ee-2xl " type="text" name="name" id="name" />
                </div>
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="price">Price</label>
                    <input defaultValue={data.price} className="mx-auto bg-white block w-full my-5 p-3 rounded-ss-2xl rounded-ee-2xl " type="number" name="price" id="price" />
                </div>
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="description">Description</label>
                    <textarea defaultValue={data.description} className="mx-auto bg-white block w-full my-5 p-3 rounded-ss-2xl rounded-ee-2xl " name="description" id="description" rows="6"></textarea>
                </div>
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="category">Category</label>
                    <select onChange={(e) => setCategories(e.target.value)} defaultValue='Category' id="category" name="category" className="select bg-white select-bordered w-full max-w-xs rounded-ss-2xl rounded-ee-2xl">
                        <option disabled >Category</option>
                        <option>Makanan</option>
                        <option>Minuman</option>
                    </select>
                    {error.category && <p className="text-red-500">Category must be selected</p>}
                </div>
                {categories !== null &&
                    tags.map((item, index) => {
                        return (
                            <Checkbox key={index} label={item.name} name={item.name} value={item.name} />
                        )
                    })
                }
                {error.tags && <p className="text-red-500">Tags must be selected</p>}
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="image">Image</label>
                    <input className="w-full h-min block  my-5 rounded-ss-2xl rounded-ee-2xl " type="file" name="image" id="image" />
                    <img className="object-contain  h-48 w-64" src={data.image_url} alt="" />
                </div>
                <div className="flex gap-8">
                    <Link to={'/dashboard/products'} className="bg-cyan-400 py-2 px-6 hover:bg-cyan-300 duration-200 font-bold rounded-md my-3" type="button" >Back</Link>
                    <button className="bg-cyan-400 py-2 px-6 hover:bg-cyan-300 duration-200 font-bold rounded-md my-3 " type="submit">Change</button>
                </div>
            </form>
        </div>
    )
}