
import React from 'react'
import OrderList from './OrderList'
import { useNavigate, Link } from 'react-router-dom';



export const Home = (props) => {
  const {showAlert} = props;
  let navigate = useNavigate();
  const token = localStorage.getItem('token');
  React.useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate("/login");
  }
  }, [navigate]);
  return (
    <div className='container my-3'>
      
      <h1>FoodItem List </h1>
      <OrderList showAlert={showAlert}/>
      <Link to={"http://localhost:5000/"}>
        <button>Go to This page</button>
      </Link>
  




    </div>
  )
}
