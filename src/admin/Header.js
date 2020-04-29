import React, { Fragment } from "react";

import { Link } from "react-router-dom";



const Header = () => {

const nav = () => {
    return(
        <Fragment>
        <header className="top-header-area d-flex align-items-center justify-content-between">
            <div className="left-side-content-area d-flex align-items-center">
              <div className="mobile-logo mr-3 mr-sm-4">
                <Link to="index.html">
                  <img src="img/core-img/small-logo.png" alt="Mobile Logo" />
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
                    <span className="flag-thumb-cu">
                      <img
                        src="http://demo.riktheme.com/litam/side-menu/img/core-img/l1.jpg"
                        alt=""
                      />
                    </span>
                  </button>
                  <div className="dropdown-menu language-dropdown dropdown-menu-right">
                    <Link to="#" className="dropdown-item mb-15">
                      <img src="img/core-img/l5.jpg" alt="Image" />{" "}
                      <span>USA</span>
                    </Link>
                    <Link to="#" className="dropdown-item mb-15">
                      <img src="img/core-img/l2.jpg" alt="Image" />{" "}
                      <span>German</span>
                    </Link>
                    <Link to="#" className="dropdown-item mb-15">
                      <img src="img/core-img/l3.jpg" alt="Image" />{" "}
                      <span>Italian</span>
                    </Link>
                    <Link to="#" className="dropdown-item">
                      <img src="img/core-img/l4.jpg" alt="Image" />{" "}
                      <span>Russian</span>
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <div className="dropdown d-none d-lg-inline-block ml-1 show">
                    <button
                      type="button"
                      className="btn dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-customize"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                      <div className="px-lg-2">
                        <div className="row no-gutters">
                          <div className="col">
                            <Link className="dropdown-icon-item" to="#">
                              <img src="img/shop-img/18.jpg" alt="image" />
                              <span>Motriza</span>
                            </Link>
                          </div>
                          <div className="col">
                            <Link className="dropdown-icon-item" to="#">
                              <img src="img/shop-img/19.jpg" alt="image" />
                              <span>Jisladtd</span>
                            </Link>
                          </div>
                          <div className="col">
                            <Link className="dropdown-icon-item" to="#">
                              <img src="img/shop-img/20.jpg" alt="image" />
                              <span>Dribbble</span>
                            </Link>
                          </div>
                        </div>

                        <div className="row no-gutters">
                          <div className="col">
                            <Link className="dropdown-icon-item" to="#">
                              <img src="img/shop-img/13.png" alt="image" />
                              <span>GitHub</span>
                            </Link>
                          </div>
                          <div className="col">
                            <Link className="dropdown-icon-item" to="#">
                              <img src="img/shop-img/14.png" alt="image" />
                              <span>Google</span>
                            </Link>
                          </div>
                          <div className="col">
                            <Link className="dropdown-icon-item" to="#">
                              <img src="img/shop-img/17.jpg" alt="image" />
                              <span>Dribbble</span>
                            </Link>
                          </div>
                        </div>
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
                    <i className="bx bx-bell bx-tada"></i>{" "}
                    <span className="active-status"></span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="top-notifications-area">
                      <div className="notifications-heading">
                        <div className="heading-title">
                          <h6>Notifications</h6>
                        </div>
                        <span>07 New</span>
                      </div>

                      <div className="notifications-box" id="notificationsBox">
                        <Link to="#" className="dropdown-item">
                          <i className="bx bx-shopping-bag"></i>
                          <div>
                            <span>Your order is placed</span>
                            <p className="mb-0 font-12">
                              Consectetur adipisicing elit. Ipsa, porro!
                            </p>
                          </div>
                        </Link>

                        <Link to="#" className="dropdown-item">
                          <img src="img/member-img/mail-1.jpg" alt="" />
                          <div>
                            <span>Haslina Obeta</span>
                            <p className="mb-0 font-12">
                              Consectetur adipisicing elit. Ipsa, porro!
                            </p>
                          </div>
                        </Link>

                        <Link to="#" className="dropdown-item">
                          <i className="bx bx-atom bg-success"></i>
                          <div>
                            <span>Your order is Dollar</span>
                            <p className="mb-0 font-12">
                              Consectetur adipisicing elit. Ipsa, porro!
                            </p>
                          </div>
                        </Link>

                        <Link to="#" className="dropdown-item">
                          <img src="img/member-img/mail-3.jpg" alt="" />
                          <div>
                            <span>Your order is placed</span>
                            <p className="mb-0 font-12">
                              Consectetur adipisicing elit. Ipsa, porro!
                            </p>
                          </div>
                        </Link>
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
                      <Link to="#" className="dropdown-item">
                        <i
                          className="bx bx-power-off font-15"
                          aria-hidden="true"
                        ></i>{" "}
                        Sign-out
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </header>
        </Fragment>

    )
}



 

  return (
    <Fragment>
     {nav()}
    
    </Fragment>
  );
};

export default Header;
