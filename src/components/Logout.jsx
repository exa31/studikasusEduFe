import proptype from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { isLogout } from '../app/redux/defaultSlice';
import { useDispatch } from 'react-redux';
import { logout } from '../app/api/auth';


Logout.propTypes = {
    handleClick: proptype.func,
}

export default function Logout({ handleClick }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    function handleLogout() {
        const token = localStorage.getItem('token');
        logout(token).then(data => {
            if (data.statusCode !== 200) {
                return alert('Failed to logout');
            }
            localStorage.removeItem('token');
            handleClick();
            dispatch(isLogout());
            return navigate('/');
        })
    }


    return (
        <div className="fixed  bg-black flex justify-center items-center bg-opacity-75 z-50 w-full h-screen">
            <div className="flex flex-col backdrop-blur-sm border p-14 rounded-2xl gap-7">
                <h1 className="text-4xl text-center text-white">Are you sure to logout???😔</h1>
                <div className="mx-auto">
                    <button onClick={() => handleClick()} className="py-2 px-6 m-2 hover:bg-slate-800 bg-black duration-200 transition-all text-white border-2">Close</button>
                    <Link to={"/"} onClick={() => handleLogout()} className="py-2 px-6 m-2 hover:bg-slate-800 bg-black duration-200 transition-all text-white border-2">Logout</Link>
                </div>
            </div>
        </div>
    )
}