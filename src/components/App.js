import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/home"
import { AddProduct } from "./pages/product"
import { AddToping } from "./pages/toping"
import Income from "./pages/transaction"
import Cart from "./pages/cart"
import Profile from "./pages/profile"
import DetailProduct from "./pages/detail-product"
import { UserContext } from "../components/context/userContext"
import { API, setAuthToken } from './config/api'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)
  
  React.useEffect(() => {
    if (state.isLogin === false) {
      navigate('/')
    } else {
      if (state.user.status === "admin") {
        navigate('/income')
      } else {
        navigate('/')
      }
    }
  }, [state])

  //check user token
  const checkUser = async () => {
    try {
      const res = await API.get('/check-auth')
      
      if (res.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      //get user data
      let payload = res.data.data
      //get token from local storage
      payload.token = localStorage.token

      // send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    checkUser()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/add-toping' element={<AddToping />} />
      <Route path='/income' element={<Income />} />
      <Route path='/cart' element={<Cart />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/detail-product/:id' element={<DetailProduct />}/>
    </Routes>
  )
}
