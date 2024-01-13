import React,{useContext} from 'react'
import OrderContext from '../context/orders/OrderContext'
import OrderItem from './OrderItem';

const OrderList = () => {
    const context = useContext(OrderContext);
    const { orders, orderState } = context;
    console.log("OrderState: ",orderState);
    // eslint-disable-next-line
    return (
        <div className='row my-3'>
            
            {orders.map((orders) => {
                return <OrderItem key={orders.id} orders={orders}/>
            })}
        </div>
    )
}

export default OrderList