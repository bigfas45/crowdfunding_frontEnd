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
                                DASHBOARD
                                <div className="sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div className="collapse" id="collapseDashboards" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/dashboard">DASHBOARD</Link>
                                </nav>
                            </div><hr />

                            <Link class="nav-link" to="/admin/category/create"
                                ><div class="nav-link-icon"><i data-feather="bar-chart"></i></div>
                                CATEGORY</Link>

                           

                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseDashboards3" aria-expanded="false" aria-controls="collapseDashboards">
                                <div className="nav-link-icon">
                                    <i data-feather="activity"></i>
                                </div>
                                PROJECT
                                <div className="sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div className="collapse" id="collapseDashboards3" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/project/manage">Manage Project</Link>
                                </nav>
                            </div>
                            <div className="collapse" id="collapseDashboards3" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/project/create">Create Project</Link>
                                </nav>
                            </div>

                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseDashboards2" aria-expanded="false" aria-controls="collapseDashboards">
                                <div className="nav-link-icon">
                                    <i data-feather="activity"></i>
                                </div>
                                APPLICATION
                                <div className="sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div className="collapse" id="collapseDashboards2" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/issuer/application">ISSUERS</Link>
                                </nav>
                            </div>
                            <div className="collapse" id="collapseDashboards2" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/individual/application">INDIVIDULA INVESTOR</Link>
                                </nav>
                            </div>
                            <div className="collapse" id="collapseDashboards2" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/corporate/application">CORPORATE INVESTOR</Link>
                                </nav>
                            </div>

                            
                                <Link className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseDashboardsblog" aria-expanded="false" aria-controls="collapseDashboards">
                                <div className="nav-link-icon">
                                    <i data-feather="activity"></i>
                                </div>
                                BLOG
                                <div className="sidenav-collapse-arrow">
                                    <i className="fas fa-angle-down"></i>
                                </div>
                            </Link>
                            <div className="collapse" id="collapseDashboardsblog" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/blog/manage">Manage Blog</Link>
                                </nav>
                            </div>
                            <div className="collapse" id="collapseDashboardsblog" data-parent="#accordionSidenav">
                                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                    <Link className="nav-link" to="/admin/blog/create">Create Blog</Link>
                                </nav>
                            </div>


                                <Link class="nav-link" to="/admin/user/manage"
                                ><div class="nav-link-icon"><i data-feather="bar-chart"></i></div>
                                USER</Link>

                                
                          
                          

                           
                          

                         
                           
                          
                         
                            
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

