import { Link, useLoaderData } from "react-router-dom"
import { deleteDeliveryAddress } from "../../app/api/deliveryAddress";
import { useState } from "react";

export default function Alamat() {

    const data = useLoaderData();

    const [alamat, setAlamat] = useState(data);

    function handleDelete(id) {
        deleteDeliveryAddress(id).then((data) => {
            const newAlamat = alamat.filter((data) => {
                return data._id !== id
            })
            console.log(data)
            return setAlamat(newAlamat)
        })
    }
    return (
        <>
            {alamat.statusCode === 404 || alamat.length === 0 ?
                <div className="text-center bg-base-200">
                    <div >
                        Maaf belum ada alamat yang dibuat
                    </div>
                    <div className="flex justify-center m-4">
                        <Link to='/account/alamat/create-alamat' className="w-40 btn btn-primary">Create</Link>
                    </div>
                </div>
                :
                < div className="max-h-screen mx-auto overflow-x-auto bg-base-200" >
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
                                    <div>
                                        <td><Link className="btn btn-warning" to={`/account/alamat/edit-alamat/${data._id}`}>Edit</Link></td>
                                        <td><button className="btn btn-warning" onClick={() => handleDelete(data._id)}>Delete</button></td>
                                    </div>
                                </tr>
                            </tbody>
                        )}
                    </table>
                    <div className="flex justify-start m-4">
                        <Link to='/account/alamat/create-alamat' className="w-40 btn btn-primary">Create alamat</Link>
                    </div>
                </div >
            }
        </>
    )


}