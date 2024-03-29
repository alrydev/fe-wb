import React from "react"
import logo from "../../assets/logo.svg"
import cartLogo from "../../assets/cart.svg"
import { Login, Register } from "./modal"
import Dropdown from "./dropdown"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { useQuery } from 'react-query';
import { API } from '../config/api';
import ProfilePict from '../../assets/ProfilePict.png'



export default function Header() {

  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)

  const [modalLogin, setModalLogin] = React.useState(false)
  const [modalRegister, setModalRegister] = React.useState(false)
  const [userDropdown, setUserDropdown] = React.useState(false)
  const [adminDropdown, setAdminDropdown] = React.useState(false)

  function switchModal() {
    if (modalLogin) {
      setModalLogin(false)
      setModalRegister(true)
    } else {
      setModalRegister(false)
      setModalLogin(true)
    }
  }

  function logOut() {
    setUserDropdown(false)
    setAdminDropdown(false)
    dispatch({ type: 'LOGOUT' })
  }

  const { data: cart } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts");
    return response.data.data;
  });

  React.useEffect(() => {
    if (state.isLogin === true) {
      setModalLogin(false)
      setModalRegister(false)
    }
  }, [state])
  return (
    <header className="fixed z-index-2 w100">
      <nav className="py2 px6 flex jc-between ai-center bg-white">
        <img className="logo round cursor-pointer"
          src={logo} alt="logo"
          onClick={() => navigate("/")}
        />

        {state.isLogin ?
          <div className="flex ai-center">
            {state.user.status === "customer" &&
              <div className="cart relative cursor-pointer">
                <img src={cartLogo} alt="cart" onClick={() => navigate("/cart")} />
                {(cart?.length >= 1) && <span>{cart?.length}</span>}
              </div>
            }
            <img className="pp cursor-pointer" src={ProfilePict} alt="user"
              onClick={() =>
                (state.user.status === "admin") ? setAdminDropdown(!adminDropdown) : setUserDropdown(!userDropdown)
              }
            />
          </div>
          :
          <div className="grid col-2 col-gap-1 w15rem">
            <button className="bg-none br5 br-red txt-red bold"
              onClick={() => setModalLogin(true)}
            >Login</button>

            <button className="bg-red br5 br-red txt-white fw500"
              onClick={() => setModalRegister(true)}
            >Register</button>
          </div>
        }
      </nav>

      <Login
        modalLogin={modalLogin}
        setModalLogin={setModalLogin}
        switchModal={switchModal}
      />

      <Register
        modalRegister={modalRegister}
        setModalRegister={setModalRegister}
        switchModal={switchModal}
      />

      <Dropdown
        adminDropdown={adminDropdown}
        userDropdown={userDropdown}
        logOut={logOut}
      />
    </header>
  )
}