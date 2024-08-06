import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5E2DHGxOirPWSbpfbDuS7RGMaSH1cBV4qZA&s"
                    className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Food store!!</h1>
                    <p className="py-6">
                        Go to the store and get the best food in town. We have the best food in town.
                    </p>
                    <Link to={'/products'} className="btn btn-primary">Get to store</Link>
                </div>
            </div>
        </div>
    )
}
