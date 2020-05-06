import React, { Fragment, Component  } from "react";
import { signout, isAuthenticated } from "../auth";
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom'
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#f0232a" };
  } else {
    return { color: "#001022" };
  }
};

const Header = ({ history }) => {


    return(
        <Fragment>
        <header className="top-header-area d-flex align-items-center justify-content-between">
            <div className="left-side-content-area d-flex align-items-center">
              <div className="mobile-logo mr-3 mr-sm-4">
                <Link to="/investor/dashboard">
                  <img src="https://nasdng.com/wp-content/uploads/2020/05/nasdlogop.jpg" alt="Mobile Logo" />
                </Link>
              </div>

              <div className="ecaps-triggers mr-1 mr-sm-3">
                <div className="menu-collasped" id="menuCollasped">
                  <i className="bx bx-menu"></i>
                </div>
                <div className="mobile-menu-open" id="mobileMenuOpen">
                  <i className="bx bx-menu"></i>
                </div>
              </div>

              <ul className="left-side-navbar d-flex align-items-center">
                <li className="hide-phone app-search">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                  <span className="bx bx-search-alt"></span>
                </li>
              </ul>
            </div>

            <div className="right-side-navbar d-flex align-items-center justify-content-end">
              <div className="right-side-trigger" id="rightSideTrigger">
                <i className="bx bx-menu-alt-right"></i>
              </div>

              <ul className="right-side-content d-flex align-items-center">
                

              

                <li className="nav-item dropdown">
                  <button
                    type="button"
                    className="btn dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bx-bell bx-tada"></i>{" "}
                    <span className="active-status"></span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="top-notifications-area">
                      <div className="notifications-heading">
                        <div className="heading-title">
                          <h6>Notifications</h6>
                        </div>
                        <span>0 New</span>
                      </div>

                      <div className="notifications-box" id="notificationsBox">
                      

                      

                      
{/* 
                        <Link to="#" className="dropdown-item">
                          <img src="img/member-img/mail-3.jpg" alt="" />
                          <div>
                            <span>Your order is placed</span>
                            <p className="mb-0 font-12">
                              Consectetur adipisicing elit. Ipsa, porro!
                            </p>
                          </div>
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <button
                    type="button"
                    className="btn dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="http://demo.riktheme.com/litam/side-menu/img/member-img/contact-2.jpg"
                      alt=""
                    />
                  </button>
                  <div className="dropdown-menu profile dropdown-menu-right">
                    <div className="user-profile-area">
                      <Link to="#" className="dropdown-item">
                        <i
                          className="bx bx-user font-15"
                          aria-hidden="true"
                        ></i>{" "}
                        My profile
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <i
                          className="bx bx-wallet font-15"
                          aria-hidden="true"
                        ></i>{" "}
                        My wallet
                      </Link>
                      <Link to="#" className="dropdown-item">
                        <i
                          className="bx bx-wrench font-15"
                          aria-hidden="true"
                        ></i>{" "}
                        settings
                      </Link>
                      <span  onClick={() =>
                        signout(() => {
                          history.push("/investor/dashboard");
                        })
                      }
                      style={{ cursor: "pointer" }} className="dropdown-item">
                        <i
                          className="bx bx-power-off font-15"
                          aria-hidden="true"
                        ></i>{" "}
                        Sign-out
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </header>
        </Fragment>

   


 

    )
};

export default withRouter(Header);
