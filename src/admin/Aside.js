import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";




const Aside = ({ history }) => {

  const {user: {_id, firstname, lastname, email, role}} = isAuthenticated()


const asideBar = () => {
    return(
        <Fragment>
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* <!-- Brand Logo --> */}
    <Link to="index3.html" className="brand-link">
      <img src="https://nasdng.com/wp-content/uploads/2018/12/NASD-PLC-LOGO.png" alt="NASD Logo" className="brand-image img-circle elevation-3"
           style={{opacity: ".8"}} />
      <span className="brand-text font-weight-light">AdminLTE 3</span>
    </Link>

    {/* <!-- Sidebar --> */}
    <div className="sidebar">
      {/* <!-- Sidebar user panel (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="https://nasdng.com/wp-content/uploads/2020/03/avater.jpg" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <Link to="#" className="d-block">{firstname}</Link>
        </div>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library --> */}
          <li className="nav-item has-treeview menu-open">
            <Link to="#" className="nav-link active">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i className="right fas fa-angle-left"></i>
              </p>
            </Link>
            <ul className="nav nav-treeview">
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Dashboard</p>
                </Link>
              </li>

              
             
            
            </ul>
          </li>
        
     
          
       
        
          <li className="nav-item has-treeview">
            <Link to="/admin/category/create" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Category
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>

            <li className="nav-item has-treeview">
            <Link to="/admin/project/manage" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                Project
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>

            
            <li className="nav-item has-treeview">
            <Link to="/admin/user/manage" className="nav-link">
              <i className="nav-icon fas fa-table"></i>
              <p>
                User
                <i className="fas fa-angle-left right"></i>
              </p>
            </Link>
          
            </li>
            
            <li class="nav-header">LABELS</li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-circle text-danger"></i>
              <p class="text">  <span
                      onClick={() =>
                        signout(() => {
                          history.push("/");
                        })
                      }
                      style={{ cursor: "pointer", color: "#ffffff" }}
                    >
                      sign out
                    </span> </p>
            </a>
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
