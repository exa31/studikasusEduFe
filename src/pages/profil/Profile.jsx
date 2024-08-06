import { useLoaderData } from "react-router-dom"

export default function Profile() {

    const user = useLoaderData();

    return (
        <div className="overflow-x-auto  bg-base-200 mx-auto">
            <table className="table">
                <tbody >
                    <tr>
                        <td>Name</td>
                        <td>{user.user.full_name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{user.user.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}