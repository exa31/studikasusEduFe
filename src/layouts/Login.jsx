import { Link, useNavigate } from "react-router-dom";
import { login } from "../app/api/auth";
import { useDispatch } from "react-redux";
import { isLogin } from "../app/redux/defaultSlice";

export default function Login() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        login(email, password).then(data => {
            console.log(data);
            if (data.statusCode === 401) {
                e.target.email.value = '';
                e.target.password.value = '';
                return alert('Invalid email or password');
            }
            localStorage.setItem('token', data.token);
            dispatch(isLogin())
            return navigate('/products');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content bg-base-200 flex-col rounded-md lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Welcome to our food store! Browse our delicious selection of meals and snacks. To make a purchase, please login using your email and password.
                    </p>
                    <p>
                        Don&apos;t have an account? <Link to="/register" className="link link-hover">Register</Link>
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control flex-row gap-5 mt-6">
                            <Link className="btn w-20 btn-primary" to='/'>Back</Link>
                            <button type="submit" className="btn w-40 btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}