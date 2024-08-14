import React from 'react'
import "./css/menufooter.css";
import { Link } from "react-router-dom";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuClipboardCheck } from "react-icons/lu";
import { PiChatCenteredText } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";

function Menufooter() {
  return (
    <div className='menufooter_container_box_seller'>
      <Link className="link_menu_seller active_seller" to="/homeSeller">
        <IoStorefrontOutline className='iconMenu_foot_seller' />
        Home
      </Link>
      <Link className="link_menu_seller" to="#">
        <PiChatCenteredText className='iconMenu_foot_seller' />
        Chat
      </Link>
      <Link className="link_menu_seller" to="#">
        <LuClipboardCheck className='iconMenu_foot_seller' />
        Order
      </Link>
      <Link className="link_menu_seller" to="/dashborard">
        <RxDashboard className='iconMenu_foot_seller' />
        Dashboard
      </Link>
    </div>
  )
}

export default Menufooter