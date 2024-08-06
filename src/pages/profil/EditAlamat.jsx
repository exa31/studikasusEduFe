import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { getKecamatan, getKelurahan, getKota, getProvinsi } from "../../app/api/wilayah";
import Select from "../../components/Select";
import { updateDeliveryAddress } from "../../app/api/deliveryAddress";
import TextArea from "../../components/TextArea";

export default function EditAlamat() {

    const navigate = useNavigate();

    const [error, setError] = useState({
        name: false
    });
    const defaultData = useLoaderData();
    const [data, setData] = useState({
        provinsi: [],
        kabupaten: [],
        kecamatan: [],
        kelurahan: []
    });
    const [id, setId] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: ''
    });
    const [names, setNames] = useState({});

    function handleName(label, name) {
        setNames({
            ...names,
            [label]: name
        });
    }

    function handleSelect(label, value) {
        setId({
            ...id,
            [label]: value
        });
    }

    useEffect(() => {
        getProvinsi().then((data) => {
            setData((prevData) => ({
                ...prevData,
                provinsi: data
            }));
        });
    }, []);

    useEffect(() => {
        if (id.provinsi) {
            getKota(id.provinsi).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kabupaten: data
                }));
            });
        }
    }, [id.provinsi]);

    useEffect(() => {
        if (id.kabupaten) {
            getKecamatan(id.kabupaten).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kecamatan: data
                }));
            });
        }
    }, [id.kabupaten]);

    useEffect(() => {
        if (id.kecamatan) {
            getKelurahan(id.kecamatan).then((data) => {
                setData((prevData) => ({
                    ...prevData,
                    kelurahan: data
                }));
            });
        }
    }, [id.kecamatan]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;

        if (name.length < 3) {
            return setError({ ...error, name: true });
        } else {
            setError({ ...error, name: false });
        }

        const payload = {
            ...names, name, detail: e.target.detail.value
        }
        updateDeliveryAddress(payload, defaultData._id).then((res) => {
            if (res.statusCode === 200) {
                navigate('/account/alamat');
            } else (
                alert('gagaln update alamat')
            )
        });
    }
    console.log(defaultData.detail);
    return (
        <div className="bg-base-200 p-3 rounded-xl">
            <h1 className="text-3xl font-bold pb-2">Edit Alamat</h1>
            <h4>Alamat Sebelumnya</h4>
            <p>{`${defaultData.provinsi}, ${defaultData.kabupaten}, ${defaultData.kecamatan}, ${defaultData.kelurahan}, ${defaultData.detail}`}</p>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" defaultValue={defaultData.name} name="name" className="input input-bordered" required />
                    {error.name && <p className="text-red-500">Name must be at least 3 characters</p>}
                </div>
                <Select name="provinsi" label="Provinsi" handleName={handleName} handleSelect={handleSelect} options={data.provinsi} />
                {id.provinsi && <Select name="kabupaten" label="Kabupaten" handleName={handleName} handleSelect={handleSelect} options={data.kabupaten} />}
                {id.kabupaten && <Select name="kecamatan" label="Kecamatan" handleName={handleName} handleSelect={handleSelect} options={data.kecamatan} />}
                {id.kecamatan && <Select name="kelurahan" label="Kelurahan" handleName={handleName} handleSelect={handleSelect} options={data.kelurahan} />}
                <TextArea name="detail" label="Detail" value={defaultData.detail} handleName={handleName} />
                <div className="form-control flex-row gap-5 mt-6">
                    <Link to='/account/alamat' className="btn w-20 btn-primary">Back</Link>
                    <button type="submit" className="btn w-40 btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}