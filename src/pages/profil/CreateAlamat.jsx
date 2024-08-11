
import { Link, useNavigate } from "react-router-dom";
import Select from "../../components/Select";
import { getKecamatan, getKelurahan, getKota, getProvinsi } from "../../app/api/wilayah";
import { useEffect, useState } from "react";
import { createDeliveryAddress } from "../../app/api/deliveryAddress";
import TextArea from "../../components/TextArea";

export default function CreateAlamat() {

    const navigate = useNavigate();

    const [submit, setSubmit] = useState(false);

    const [error, setError] = useState({
        name: false,
        detail: false
    });

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
    const [names, setNames] = useState({
        provinsi: '',
        kabupaten: '',
        kecamatan: '',
        kelurahan: '',
    });


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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmit(true);
        const detail = e.target.detail.value;
        const name = e.target.name.value;
        const error = {
            name: false,
            detail: false
        }

        if (name.length < 3) {
            error.name = true;
        }

        if (detail.length < 3) {
            error.detail = true;
        }

        if (error.name || error.detail) {
            setError(error);
            return;
        } else {
            createDeliveryAddress({ ...names, name: name, detail: detail }).then((data) => {
                if (data.statusCode === 201) {
                    navigate('/account/alamat');
                } else {
                    alert('Failed to create alamat');
                }
            })
        }
    }

    return (
        <div className="p-3 bg-base-200 rounded-xl">
            <h1>Create Alamat</h1>
            <form className="card-body" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" name="name" className="input input-bordered" required />
                    {error.name && <p className="text-red-500">Name must be at least 3 characters</p>}
                </div>
                <Select name="provinsi" label="Provinsi" handleName={handleName} handleSelect={handleSelect} options={data.provinsi} />
                {id.provinsi && <Select name="kabupaten" label="Kabupaten" handleName={handleName} handleSelect={handleSelect} options={data.kabupaten} />}
                {id.kabupaten && <Select name="kecamatan" label="Kecamatan" handleName={handleName} handleSelect={handleSelect} options={data.kecamatan} />}
                {id.kecamatan && <Select name="kelurahan" label="Kelurahan" handleName={handleName} handleSelect={handleSelect} options={data.kelurahan} />}
                <TextArea label="Detail" name="detail" />
                {error.detail && <p className="text-red-500">Detail is required</p>}
                <div className="flex-row gap-5 mt-6 form-control">
                    <Link to='/account/alamat' className="w-20 btn btn-primary">Back</Link>
                    {id.kelurahan &&
                        <button disabled={submit} type="submit" className="w-40 btn btn-primary">Save</button>
                    }
                </div>
            </form>
        </div>
    )
}