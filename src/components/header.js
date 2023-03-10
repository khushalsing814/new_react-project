import React, { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import logo_image from '../assests/images/loin_logo.svg'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Header = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem('signup'))

  const logout = () => {
    if (window.localStorage.getItem('signup')) {
      window.localStorage.removeItem('signup');
      const path = "/login";
      navigate(path);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg nav-bg-color" style={{ zIndex: 10000 }}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo_image} alt='logo'></img>
            Website</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span style={{ color: "orangered" }}><FaBars /></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/table">table</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/todo-list">todo-list</NavLink>
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/singlepage_todolist">todo-list</NavLink>
          </li> */}
              <li className="nav-item">
                {/* <NavLink className="nav-link" aria-current="page" to="/pagination">pagination</NavLink> */}
                {/* <NavLink className="nav-link" aria-current="page" to="/newapi">pagination</NavLink> */}
              </li>
              {/* <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/about">about</NavLink>
          </li> */}
            </ul>
            <form className="d-flex" role="search">
              {
                !localStorage.getItem('signup') &&
                <>
                  <Link className="btn style_btn me-2" to="/login">login</Link>
                  <Link className="btn style_btn" to="/signup">Sign up</Link>
                </>
              }
              {
                localStorage.getItem('signup') &&
                <>
                  <DropdownButton id="dropdown_color" title={users && users.firstname}> 
                    <Dropdown.Item  onClick={logout}>Logout</Dropdown.Item>
                  </DropdownButton>
                </>
              }
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Header