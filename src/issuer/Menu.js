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
                         

                            <Link class="nav-link" to="/issuer/dashboard"
                                ><div class="nav-link-icon"><i data-feather="bar-chart"></i></div>
                                DASHBOARD</Link>

                            <Link class="nav-link" to="/issuer/project/manage"
                                ><div class="nav-link-icon"><i data-feather="filter"></i></div>
                                Project</Link>
                            
                          
                          

                           
                          

                         
                           
                          
                         
                            
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

