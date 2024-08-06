import { RouterProvider } from 'react-router-dom'
import router from './router/routes.jsx'
import { useDispatch } from 'react-redux'
import { isLogin, setCart } from './app/redux/defaultSlice.js';
import { auth } from './app/api/auth/index.js';
import { getCart } from './app/api/cart/index.js';



function App() {

  const dispatch = useDispatch();

  const token = localStorage.getItem('token');

  if (token) {
    auth().then(data => {
      if (data.statusCode !== 200) {
        return localStorage.removeItem('token');
      }
      getCart().then(data => {
        data.items.forEach((item) => {
          dispatch(setCart(item));
        })
      })
      return dispatch(isLogin());
    })
  }



  return (
    <RouterProvider router={router} />
  )
}

export default App
