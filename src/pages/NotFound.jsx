import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="h-screen flex items-center flex-col justify-center">
            <h1 className="text-6xl font-bold">404</h1>
            <h3 className="text-3xl">Not Found</h3>
            <Link className="btn btn-info" to={'/'}>Kembali</Link>
        </div>
    )
}