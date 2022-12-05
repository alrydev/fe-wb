import React from "react"
// import logo from "../../assets/logo.svg";
import Header from "../modules/header"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"
import { API } from "../config/api";
import dateFormat from 'dateformat'

export default function Income() {
  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)


  const [transaction, setTransaction] = React.useState([])
  // const [transactionPopUp, setTransactionPopUp] = React.useState(false);

  const getTransaction = async () => {
    try {
      const res = await API.get(`/transactions`);
      setTransaction(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  React.useEffect(() => {
    if (state.isLogin === false || state.user.status === "customer") {
      navigate('/')
    } else {
      getTransaction()
      // getUser()
    }
  }, [])
  return (
    <>
      <Header />
      <main className="after-nav pb5">
        <section className="pt4 mx5">
          <h1 className="txt-red mb2-5">Income Transaction</h1>
          <table className="w-100">
            <thead className="bg-gray">
              <tr>
                <th>No.</th>
                <th>Name</th>
                {/* <th>Product</th> */}
                <th>Income</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((data, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{data.user.name}</td>
                  {/* <td>{data.cart.map((data, index) => (
                    <h6 className="productIncome" key={index}>
                      {data.product.title}, </h6>
                  ))}</td> */}
                  <td>Rp {data.amount}</td>
                  <td>{data.status}</td>
                  <td>
                    <h6 className="productIncome" key={index}>
                      {dateFormat(data.updated_at, 'd mmmm yyyy')}</h6>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}