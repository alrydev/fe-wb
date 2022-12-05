import logo from "../../assets/logo.svg";
import Header from "../modules/header";
import { useEffect, useContext, useState } from "react";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import dateFormat from 'dateformat'
import ProfilePict from '../../assets/ProfilePict.png'
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function Profile() {
  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState([])


  useEffect(() => {
    const getTransaction = async () => {
      try {
        const response = await API.get("/transactionId")
        setTransaction(response.data.data)
      } catch (error) {
        console.error(error)
      }
    };
    getTransaction()
  }, [setTransaction])


  return (
    <>
      <Header />
      <div className="transaction-section after-nav">

        <Col>
          <Card className='border border-0 d-flex justify-content-between ms-5'>
            <h3 className="pb-2">My Profile</h3>
            <Card.Body className='w-75 d-flex justify-content-between'>
              <img src={ProfilePict} alt=''></img>
              <div className="text-start ms-5 w-50">
                <h5>Full Name:</h5>
                <p>{state.user.name}</p>

                <h5>Email:</h5>
                <p>{state.user.email}</p>
                {/* <button className="bg-red br-none br5 txt-white" style={{ width: "135px" }}
                  onClick={() => navigate('/update-profile')}
                >
                  change profile
                </button> */}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <div className="transaction-container me-5">
          <div className="transaction-title">
            <h3 className="ms-5 text-center">Transaction</h3>
          </div>
          {transaction.map((data, index) => (
            <div className="detail-transaction">
              {data.cart.map((item, index) => (
                <div className="box-order">
                  <div className="left-container">
                    <div className="main-order">
                      <div className="picture-menu">
                        <img
                          className="picture-menuPurchased"
                          src={item?.product?.image}
                          alt=""
                        />
                      </div>
                      <div className="data-order">
                        <div className="data-flavour">
                          <h6>{item?.product?.title}</h6>
                        </div>
                        <div className="orderTime">
                          <h6>{dateFormat(item?.updated_at, 'dddd, ')}{dateFormat(item?.updated_at, 'd mmmm yyyy')}</h6>
                        </div>
                        <div className="data-price">
                          <h6>{item?.product?.price}</h6>
                        </div>
                        <div className="data-topping">
                          <h6>Topping :
                            {item?.topping.map((topping, idx) => (
                              <div key={idx} style={{ display: "inline" }}>{topping?.title} ,</div>
                            ))}</h6>
                        </div>
                        <div className="subTotal">
                          <h6>Sub Total : {item?.sub_amount}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div align="center" className="right-container">
                    <div className="logo-transaction">
                      <img className="logo-detail" src={logo} alt="logo" />
                    </div>
                    <div className="qr-transaction">
                      <img
                        className="qr-code"
                        src="https://i.stack.imgur.com/XHWnX.png"
                        alt=""
                      />
                    </div>
                    <div className="status-order">
                      {/* if data.status=="succes"{ do something } */}
                      <h6>{data.status}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default Profile;
