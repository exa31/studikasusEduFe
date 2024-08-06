import { Link, useNavigate } from "react-router-dom";
import { register } from "../app/api/auth";
import { useState } from "react";

export default function Registrasi() {

    const navigate = useNavigate();

    const [error, setError] = useState({
        errorValidation: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const full_name = e.target.full_name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm_password = e.target.confirm_password.value;

        // karena spread operator akan membuat
        let errors = {};

        if (full_name.length < 3) {
            errors.full_name = true
        }

        if (password.length < 6) {
            errors.password = true
        }

        if (password !== confirm_password) {
            errors.confirm_password = true
        }

        // untuk mengecek apakah ada error atau tidak dengan melihat ada berapa key di object errors
        if (Object.keys(errors).length > 0) {
            setError(errors);
            e.target.full_name.value = '';
            e.target.email.value = '';
            e.target.password.value = '';
            e.target.confirm_password.value = '';
        } else {
            setError({});
            register(full_name, email, password).then(data => {
                if (data.statusCode === 400) {
                    return setError({ errorValidation: true });
                }
                alert('Registration successful');
                return navigate('/login');
            }).catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content bg-base-200 flex-col rounded-md lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Welcome to our food store! Please register using your email and password to make a purchase. Enjoy our delicious selection of meals and snacks.
                        </p>
                        <p>
                            Already have an account? <Link to="/login" className="link link-hover">Login</Link>
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full name</span>
                                </label>
                                <input type="text" placeholder="Full name" name="full_name" className="input input-bordered" required />
                                {error.full_name && <p className="text-red-500">Full name must be at least 3 characters</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                                {error.email ? <p className="text-red-500">Email already exists</p> : error.errorValidation && <p className="text-red-500">Email already exists</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                                {error.password && <p className="text-red-500">Password must be at least 6 characters</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="password" name="confirm_password" className="input input-bordered" required />
                                {error.confirm_password && <p className="text-red-500">Password does not match</p>}
                            </div>
                            <div className="form-control flex-row gap-5 mt-6">
                                <Link to='/' className="btn w-20 btn-primary">Back</Link>
                                <button type="submit" className="btn w-40 btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

