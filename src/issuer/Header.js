import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import { signout, isAuthenticated } from "../auth";


const Header = ({ history }) => {
  
    const {
        user: {
            _id,
            firstname,
            lastname,
            email,
            role,
             userType
        }
    } = isAuthenticated();
    return (
        <Fragment>
            <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
                <Link className="navbar-brand d-none d-sm-block" to="index.html">NASD</Link>
                <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle" to="#">
                    <i data-feather="menu"></i>
                </button>
                <form className="form-inline mr-auto d-none d-lg-block"><input className="form-control form-control-solid mr-sm-2" type="search" placeholder="Search" aria-label="Search"/></form>
                <ul className="navbar-nav align-items-center ml-auto">
                   
                   
                    <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                        <Link className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownMessages" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i data-feather="mail"></i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownMessages">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <i className="mr-2" data-feather="mail"></i>Message Center</h6>
                            <Link className="dropdown-item dropdown-notifications-item" to="#!"><img className="dropdown-notifications-item-img" src="https://source.unsplash.com/vTL_qy03D1I/60x60"/>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                    <div className="dropdown-notifications-item-content-details">Emily Fowler · 58m</div>
                                </div>
                            </Link>
                            <Link className="dropdown-item dropdown-notifications-item" to="#!"><img className="dropdown-notifications-item-img" src="https://source.unsplash.com/4ytMf8MgJlY/60x60"/>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                                    <div className="dropdown-notifications-item-content-details">Diane Chambers · 2d</div>
                                </div>
                            </Link>
                            <Link className="dropdown-item dropdown-notifications-footer" to="#!">Read All Messages</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-caret mr-3 dropdown-user">
                        <Link className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" to="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/></Link>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                                <img className="dropdown-user-img" src="https://source.unsplash.com/QAB-WJcbgJk/60x60"/>
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name"> {firstname} {lastname} </div>
                                    <div className="dropdown-user-details-email"> {email} </div>
                                </div>
                            </h6>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#!">
                                <div className="dropdown-item-icon">
                                    <i data-feather="settings"></i>
                                </div>
                                Account</Link>
                            <Link onClick={() =>
                        signout(() => {
                          history.push("/investor/dashboard");
                        })
                      }
                      style={{ cursor: "pointer" }} className="dropdown-item" to="#!">
                                <div className="dropdown-item-icon">
                                    <i data-feather="log-out"></i>
                                </div>
                                Logout</Link>
                        </div>
                    </li>
                </ul>
            </nav>




            
        </Fragment>
    );
};

export default withRouter(Header);