import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { categoriesByName } from "../../app/api/category";
import Checkbox from "../../components/Checkbox";
import { createProduct } from "../../app/api/products";



export default function CreateProduct() {


    const navigate = useNavigate()

    const [image, setImage] = useState(null)
    const [error, setError] = useState({})
    const [categories, setCategories] = useState(null)
    const [data, setData] = useState([])
    const [submited, setSubmited] = useState(false)

    function handleChange(e) {
        // mengubah image menjadi URL dari input file
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    useEffect(() => {
        if (categories === "Makanan" || categories === "Minuman") {
            categoriesByName(categories).then((res) => {
                console.log(res.tags.map((item) => item))
                setData(res.tags);
            }).catch((err) => {
                console.log(err)
            });
        }
    }, [categories]);



    function onSubmit(e) {
        e.preventDefault()
        setSubmited(true)
        const name = e.target.name.value
        const price = e.target.price.value
        const description = e.target.description.value
        const image = e.target.image.files[0]
        const category = e.target.category.value

        const errors = {}

        if (name.length < 3) {
            errors.name = true
        }

        if (price === 0 || price < 0 || price === "") {
            errors.price = true
        }

        if (description.length === 0) {
            errors.description = true
        }

        if (image === undefined) {
            errors.image = true
        }

        if (category === 'Category') {
            errors.category = true
        }

        if (category !== 'Category') {
            let checked = []
            e.target.tags.forEach((item) => {
                if (item.checked) {
                    checked.push(item.value)
                }
                console.log(checked)
                console.log(checked.length)
            })
            if (checked.length === 0) {
                errors.tags = true
            } else {
                checked = []
            }
        }

        setError(errors)

        if (Object.keys(errors).length > 0) {
            return setSubmited(false)
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
            createProduct(formData).then(() => {
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
                    <input className="mx-auto bg-white block w-full my-5 p-3 rounded-ss-2xl rounded-ee-2xl " type="text" name="name" id="name" />
                    {error.name && <p className="text-red-500">Name must be more than 3 characters</p>}
                </div>
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="price">Price</label>
                    <input className="mx-auto bg-white block w-full my-5 p-3 rounded-ss-2xl rounded-ee-2xl " type="number" name="price" min={0} id="price" />
                    {error.price && <p className="text-red-500">Price must be more than 0</p>}
                </div>
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="description">Description</label>
                    <textarea className="mx-auto bg-white block w-full my-5 p-3 rounded-ss-2xl rounded-ee-2xl" name="description" id="description" rows="6"></textarea>
                    {error.description && <p className="text-red-500">Description must be filled</p>}
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
                    data.map((item, index) => {
                        return (
                            <Checkbox key={index} label={item.name} name={item.name} value={item.name} />
                        )
                    })
                }
                {error.tags && <p className="text-red-500">Tags must be selected</p>}
                <div className="flex flex-col gap-3 my-6">
                    <label className="font-semibold" htmlFor="image">Image</label>
                    <input onChange={handleChange} className="w-full h-min block my-5 rounded-ss-2xl rounded-ee-2xl " type="file" name="image" id="image" />
                    {error.image && <p className="text-red-500">Image must be uploaded</p>}
                    <p>Preview</p>
                    <img className="object-contain  h-48 w-64" src={image} alt="" />
                </div>
                <div className="flex gap-8">
                    <Link to={'/dashboard/products'} className="bg-cyan-400 py-2 px-6 hover:bg-cyan-300 duration-200 font-bold rounded-md my-3" type="button" >Back</Link>
                    <button className={submited ? "bg-cyan-400 py-2 px-6 hover:bg-cyan-300 duration-200 font-bold rounded-md my-3 btn-disabled" : "bg-cyan-400 py-2 px-6 hover:bg-cyan-300 duration-200 font-bold rounded-md my-3 "} type="submit">Create</button>
                </div>
            </form >
        </div >
    )
}