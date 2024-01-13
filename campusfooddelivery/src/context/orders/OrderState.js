import React, { useState } from "react";

import OrderContext from "./OrderContext";

const OrderState = (props)=>{
   const orderInitial =[
    {   "id":1,
        "name":"Kaju-200 gm",
        "Price":200
    },
    {   
        "id":3,
        "name":"Badam 100-gm",
        "Price": 100
    },
    {   
        "id":4,
        "name":"Badam 100-gm",
        "Price": 100
    },
    {   
        "id":5,
        "name":"Badam 100-gm",
        "Price": 100
    },
    {   
        "id":6,
        "name":"Badam 100-gm",
        "Price": 100
    }
   
   ]

   const [orders, orderState] = useState(orderInitial);
    return (
        <OrderContext.Provider value={{orders,orderState}}>
            {props.children}
        </OrderContext.Provider>

    )
}

export default OrderState;
