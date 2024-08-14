import React from 'react'
import "./css/order2.css";
import Menufooter2 from "../webs/Menufooter2";
import { Link } from 'react-router-dom';

function OrderList2() {
    
    return (
        <>
        <Menufooter2 />
            <div className='orderList_container_box'>
                <h4 className='txttitle_orderlsit'>Your order</h4>
                <div className="box_content_orderlist">
                    <div className="box_item_orderlist">
                        <div className='box_txt_orderlist'>
                            <p className='txtname_orderlist'>Order name...</p>
                            <p className='txtDate_orderlist'>2024.09.4.13:00</p>
                        </div>
                        <Link to="/order2" className="btnViewMoew_order">
                            View
                        </Link>
                    </div>
                    

                </div>
            </div>
           
        </>
    )
}

export default OrderList2;