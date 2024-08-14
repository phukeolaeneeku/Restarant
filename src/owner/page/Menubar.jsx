import React from 'react';
import './css/menubar.css';
import { NavLink } from 'react-router-dom';

function Menubar() {
  const storage = JSON.parse(window.localStorage.getItem('user'));
  var employee_id = false;
  if (localStorage.getItem('user')) {
    employee_id = JSON.parse(window.localStorage.getItem('user')).employee_id;
  }

  const token = localStorage.getItem('token');
  var is_admin = false;
  if (localStorage.getItem('user')) {
    is_admin = JSON.parse(window.localStorage.getItem('user')).is_admin;
  }

  return (
    <div>
      <div className="menubar_contentHeader">
        <div className="box_content_header2">
          <NavLink to="/" className='linkTomenu'>
            <h3>Name Restaurant</h3>
          </NavLink>
          <div className='menu_header_box2'>
            {is_admin ? (
              <>
                <NavLink to="/mainpage" className='linkTomenu'>Home</NavLink>
                <NavLink to="/manageorder" className='linkTomenu'>Order</NavLink>
                <NavLink to="/dashboardpc" className='linkTomenu'>Dashboard</NavLink>
                <NavLink to="/counter" className='linkTomenu'>Counter</NavLink>
              </>
            ) : (
              <NavLink to="/counter" className='linkTomenu'>Counter</NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
