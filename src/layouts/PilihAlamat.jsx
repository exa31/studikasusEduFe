import { Link, useLoaderData } from "react-router-dom";
import Checkbox from "../components/Checkbox";
import { useState } from "react";


export default function PilihAlamat() {

    const [alamat, setAlamat] = useState('');

    function handleCheckbox(value) {
        if (alamat === value) {
            return setAlamat('');
        }
        setAlamat(value);
    }

    const data = useLoaderData();
    return (
        <div className="h-screen container mx-auto pt-12">
            {data.statusCode === 404 ?
                <div className="bg-base-200 text-center">
                    <div >
                        Maaf belum ada alamat yang dibuat
                    </div>
                    <div className="flex m-4 justify-center">
                        <Link to='/account/alamat/create-alamat' className="btn w-40 btn-primary">Create</Link>
                    </div>
                </div>
                :
                < div className="container bg-base-200 m-auto rounded-2xl" >
                    <div className="bg-base-300">
                        <h1 className="text-start text-lg opacity-50 p-4 font-bold">Checkout</h1>
                    </div>
                    <div className="overflow-x-auto">
                        <h1 className="text-center text-3xl py-4 font-bold">Pilih Alamat</h1>
                        <table className="table table-zebra">
                            <thead className="text-xl">
                                <tr>
                                    <th></th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Alamat
                                    </th>
                                </tr>
                            </thead>
                            <tbody >
                                {data.map((data, index) =>
                                    <tr key={index}>
                                        <td>
                                            <Checkbox disabled={alamat !== data._id && alamat !== ''} value={data._id} handleCheckbox={handleCheckbox} />
                                        </td>
                                        <td>
                                            {data.name}
                                        </td>
                                        <td> Desa {data.kelurahan}, Kecamatan {data.kecamatan}, {data.kabupaten}, {data.provinsi}, {data.detail}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="flex m-4 justify-between">
                            <Link to='/cart' className="btn w-40 btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Back</Link>
                            <Link to={{
                                pathname: '/checkout/' + alamat,
                                // state: { alamat: alamat }                                
                            }} className="btn w-40 btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg">Lanjut</Link>
                        </div>
                    </div>
                </div >
            }
        </div>
    )

}