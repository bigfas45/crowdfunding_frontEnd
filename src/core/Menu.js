import React, {Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import {API} from '../config';
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#f0232a"};
    } else {
        return {color: "#001022"};
    }
};

const Menu = ({history}) => {
    const {
        user: {
            _id,
            firstname,
            lastname,
            email,
            role
        }
    } = isAuthenticated();
    return (
        <Fragment>
            <div id="layoutSidenav_nav">
                <nav className="sidenav shadow-right sidenav-light">
                    <div className="sidenav-menu">
                        <div className="nav accordion" id="accordionSidenav">
                            <div className="sidenav-menu-heading">Core</div>
                            <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseDashboards" aria-expanded="false" aria-controls="collapseDashboards">
                                <div className="nav-link-icon">
                                    <i data-feather="activity"></i>
                                </div>
                                Invest
                                <div className="sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div className="collapse" id="collapseDashboards" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/investment">Invest</Link>
                                </nav>
                            </div><hr />

                            <Link class="nav-link" to="/investor/dashboard"
                                ><div class="nav-link-icon"><i data-feather="bar-chart"></i></div>
                                DASHBOARD</Link>

                            <Link class="nav-link" to="/payment/balance"
                                ><div class="nav-link-icon"><i data-feather="filter"></i></div>
                                STATEMENT</Link>
                            
                          
                          

                           
                          

                         
                           
                          
                         
                            
                        </div>
                    </div>
                    <div className="sidenav-footer">
                        <div className="sidenav-footer-content">
                            <div className="sidenav-footer-subtitle">Logged in as:</div>
                            <div className="sidenav-footer-title">{firstname} </div>
                        </div>
                    </div>
                </nav>
            </div>
        </Fragment>
    );
};

export default withRouter(Menu);

