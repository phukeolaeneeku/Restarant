import React from 'react'
import "./css/dashboard.css"
import Menufooter from './Menufooter'
import { Link } from "react-router-dom";

function Dashborard() {
    return (
        <div className='box_container_dashboard'>
            <div className="box_header_goback_dashboard">
                <h3>Dasboard</h3>
            </div>
            <div className="boxConntent">
                <div className="box_dashboard_ofFist">
                    <div className="ofFist_item ofFist_itemBox1">
                        <h4>Order</h4>
                        <h2>5</h2>
                        <Link to="#" className='viewMoeweOfDashboard'>View more</Link>
                    </div>
                    <div className="ofFist_item ofFist_itemBox2">
                        <h4>Food list</h4>
                        <h2>5</h2>
                        <Link to="#" className='viewMoeweOfDashboard'>View more</Link>
                    </div>
                    <div className="ofFist_item ofFist_itemBox3">
                        <h4>Review</h4>
                        <h2>5</h2>
                        <Link to="#" className='viewMoeweOfDashboard'>View more</Link>
                    </div>
                    <div className="ofFist_item ofFist_itemBox4">
                        <h4>Payment</h4>
                        <Link to="/payment" className='viewMoeweOfDashboard'>View more</Link>
                        <p className='paymentTxt_p'>Add and edit your payment</p>
                    </div>
                </div>
                <div className="box_dashboard_ofsceounb">
                    <div className="selertetion">
                        <div></div>
                        <select className="input_of_txtAddproduct">
                            <option>Month</option>
                            <option>Week</option>
                            <option>Day</option>
                        </select>
                    </div>

                    <div className="boxGrounpOFmonyong">
                        <div className="box_countOFmaony">
                            <p>This month's sales</p>
                            <h3>2,000$</h3>
                        </div>
                        <div className="box_countOFmaony">
                            <p>All quantity</p>
                            <h3>100</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Menufooter />
        </div>
    )
}

export default Dashborard