import { Link, useLoaderData } from "react-router-dom"
import { deleteDeliveryAddress } from "../../app/api/deliveryAddress";
import { useState } from "react";

export default function Alamat() {

    const data = useLoaderData();
    console.log(data);

    const [alamat, setAlamat] = useState(data);

    function handleDelete(id) {
        deleteDeliveryAddress(id).then(() => {
            const newAlamat = alamat.filter((data) => {
                return data._id !== id
            })
            return setAlamat(newAlamat)
        })
    }

    return (
        <>
            {alamat.statusCode === 404 ?
                <div className="bg-base-200 text-center">
                    <div >
                        Maaf belum ada alamat yang dibuat
                    </div>
                    <div className="flex m-4 justify-center">
                        <Link to='/account/alamat/create-alamat' className="btn w-40 btn-primary">Create</Link>
                    </div>
                </div>
                :
                < div className="overflow-x-auto  bg-base-200 mx-auto" >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Alamat
                                </th>
                            </tr>
                        </thead>
                        {alamat.map((data, index) =>
                            <tbody key={index}>
                                <tr>
                                    <td>{data.name}</td>
                                    <td> Desa {data.kelurahan}, Kecamatan {data.kecamatan}, {data.kabupaten}, {data.provinsi}, {data.detail}</td>
                                    <td><Link to={`/account/alamat/edit-alamat/${data._id}`}>Edit</Link></td>
                                    <td><button onClick={() => handleDelete(data._id)}>Delete</button></td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                    <div className="flex m-4 justify-start">
                        <Link to='/account/alamat/create-alamat' className="btn w-40 btn-primary">Create alamat</Link>
                    </div>
                </div >
            }
        </>
    )


}