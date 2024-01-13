import React from 'react'
import {Link } from "react-router-dom";
const OrderItem = (props) => {
    const { orders } = props;
    // eslint-disable-next-line
    return (
        <div className='col-md-4'>
            
            <div className="card my-2" >
                <img src="https://source.unsplash.com/featured/300x203" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{orders.name}</h5>
                        {/* // eslint-disable-next-line */}
                        <p className="card-text">It's insanely healthy, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, nemo molestias. Molestias tempore, debitis eligendi perspiciatis nesciunt repudiandae itaque rerum illo nam voluptatum eum, iste ipsum dolor sed assumenda ullam fugit ipsam. .</p>
                        <Link href="#" className="btn btn-primary">{orders.Price}</Link>
                        {/* // eslint-disable-next-line */}
                    </div>
            </div>
        </div>
    )
}

export default OrderItem