import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";




const Aside = ({ history }) => {


  const {user: {_id, firstname, lastname, email, role}} = isAuthenticated()



const asideBar = () => {
    return(
        <Fragment>
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ position: "fixed"}}>
    {/* <!-- Brand Logo --> */}
    <Link to="/" className="brand-link">
      <img src="https://nasdng.com/wp-content/uploads/2018/12/NASD-PLC-LOGO.png" alt="NASD Logo" className="brand-image img-circle elevation-3"
           style={{opacity: ".8"}} />
      <span className="brand-text font-weight-light">{role === 1 ? 'Admin' : 'Registered User'}</span>
    </Link>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="https://nasdng.com/wp-content/uploads/2020/03/avater.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <Link to="/" className="d-block">{firstname}</Link>
        </div>
      </div>

     
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
         
        <div className="user-panel mt-3 pb-3 mb-3 ">
          <li className="nav-item has-treeview menu-open">
            <Link to="/investment" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                INVEST
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
          
          </li>
          </div>
        
       
          <li className="nav-item has-treeview">
            <Link to="/" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Dashboard
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>

            <li className="nav-item has-treeview">
            <Link to="/admin/project/manage" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                BALANCE STAEMENT  
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>

            
            <li className="nav-item has-treeview">
            <Link to="/admin/project/manage" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                PAYMENT NOTICE  
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>

            <li className="nav-item has-treeview">
            <Link to="/admin/project/manage" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                COMPANY  
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>
           
           
          
       
        
          <li className="nav-item has-treeview">
           
           
            <li className="nav-header">LABELS</li>
          <li className="nav-item">
            <Link to="#" className="nav-link">
              <i className="nav-icon far fa-circle text-danger"></i>
              <p className="text">  <span
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                      style={{ cursor: "pointer", color: "#ffffff" }}
                    >
                      sign out
                    </span> </p>
            </Link>
          </li>
          </li>
       
        </ul>
      </nav>
      {/* <!-- /.sidebar-menu --> */}
    </div>
    {/* <!-- /.sidebar --> */}
 </aside>
      

 

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
