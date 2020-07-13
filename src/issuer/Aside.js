import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import '../styles.css';
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";






const Aside = ({ history }) => {

  const {user: {_id, firstname, lastname, email, role, userTyp}} = isAuthenticated()


const asideBar = () => {
    return(
        <Fragment>
    
    <div className="ecaps-sidemenu-area">
        
        <div className="ecaps-logo">
            <Link to="#"><img className="desktop-logo" src="https://nasdng.com/wp-content/uploads/2020/05/nasdlogop.jpg" alt="Desktop Logo"/> <img className="small-logo" src="https://nasdng.com/wp-content/uploads/2020/05/nasdlogop.jpg" alt="Mobile Logo"/></Link>
        </div>

       <br/><br/>
        <div className="ecaps-sidenav" id="ecapsSideNav">
         
            <div className="side-menu-area">
             
                <nav>
                    <ul className="sidebar-menu" data-widget="tree">
                      
                        <br /><li><Link to="/issuer/project/manage"><i className='fa fa-money'></i><span>Project</span></Link></li><hr />
                        <li><Link to="/issuer/dashboard"><i className='bx bx-home-heart'></i><span>DASHBOARD</span></Link></li>
                        {/* <li><Link to="/issuer/balance"><i className='fa fa-money'></i><span> STATEMENT</span></Link></li> */}
                      
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
