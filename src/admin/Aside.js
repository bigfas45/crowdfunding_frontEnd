import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import '../styles.css';
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";





const Aside = ({ history }) => {

  const {user: {_id, firstname, lastname, email, role}} = isAuthenticated()


const asideBar = () => {
    return(
        <Fragment>
    
    <div className="ecaps-sidemenu-area">
        
        <div className="ecaps-logo">
            <Link to="#"><img className="desktop-logo" src="http://demo.riktheme.com/litam/side-menu/img/core-img/logo.png" alt="Desktop Logo"/> <img className="small-logo" src="http://demo.riktheme.com/litam/side-menu/img/core-img/small-logo.png" alt="Mobile Logo"/></Link>
        </div>

       <br/><br/>
        <div className="ecaps-sidenav" id="ecapsSideNav">
         
            <div className="side-menu-area">
             
                <nav>
                    <ul className="sidebar-menu" data-widget="tree">
                        <li><a href="/"><i className='bx bx-home-heart'></i><span>Dashboard</span></a></li>
                        <li><Link to="/admin/category/create"><i className='fa fa-money'></i><span>Category</span></Link></li>
                        <li><Link to="/admin/project/manage"><i className='fa fa-money'></i><span>Project</span></Link></li>
                        {/* <li><Link to="/admin/project/manage"><i className='fa fa-money'></i><span>Applications</span></Link></li> */}
                        <li className="treeview">
                            <Link to="#"><i className='bx bx-home-heart'></i> <span>Applications</span> <i className="fa fa-angle-right"></i></Link>
                            <ul className="treeview-menu">
                                <li><Link to="/admin/issuer/application">Issuers</Link></li>
                                <li><Link to="#">Individual Investors</Link></li>
                                <li><Link to="#">Corporate Investors</Link></li>
                               
                            </ul>
                        </li>
                          <li><Link to="/admin/user/manage"><i className='fa fa-money'></i><span>User</span></Link></li>
                      
                    </ul>
                </nav>
                
            </div>
        </div>
    </div>

 

        </Fragment>

    )
}

const aside = () => {
  return(
    <Fragment>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                Disabled
                </Nav.Link>
            </Nav.Item>
            </Nav>
    </Fragment>
  )
}



 

  return (
    <Fragment>
     {asideBar()}
    
    </Fragment>
  );
};

export default Aside;
