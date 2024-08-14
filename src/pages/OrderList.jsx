import React from 'react'
import "./css/order.css";
import Menufooter from "../components/Menufooter";
import { Link } from 'react-router-dom';

function OrderList() {
    
    return (
        <>
        <Menufooter />
            <div className='orderList_container_box'>
                <h4 className='txttitle_orderlsit'>Your order</h4>
                <div className="box_content_orderlist">
                    <div className="box_item_orderlist">
                        <div className='box_txt_orderlist'>
                            <p className='txtname_orderlist'>Order name...</p>
                            <p className='txtDate_orderlist'>2024.09.4.13:00</p>
                        </div>
                        <Link to="/order" className="btnViewMoew_order">
                            View
                        </Link>
                    </div>
                    

                </div>
            </div>
           
        </>
    )
}

export default OrderList