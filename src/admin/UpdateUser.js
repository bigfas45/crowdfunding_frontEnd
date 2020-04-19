import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { readUser, updateUser } from "./ApiAdmin";
import { Link, Redirect } from "react-router-dom";
import {API} from '../config';
import ReactHtmlParser from 'react-html-parser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import Footer from "./Footer";





const UpdateUser = ({match}) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname:"",
    email: "",
    telephone:"",
    userType: "",
    role: "",
    status:"",
    password:"",
    loading: false,
    error: "",
    success: false,
    redirectToProfile: false,
    formData: ""
  });

  const {
    firstname,
    lastname,
    email, 
    telephone, 
    userType, 
    role, 
    status,
    password,
    loading,
    error,
    success,
    redirectToProfile,
    formData
  } = values;

  const { user, token } = isAuthenticated();

  const init = (userId) => {
    readUser(userId, token).then(data => {
          if(data.error){
                setValues({...values, error: data.error})
          }else{
            // populate the state
            setValues({...values, 
                firstname: data.firstname, 
                lastname: data.lastname, 
                email: data.email,
                telephone: data.telephone,
                userType: data.userType,
                role: data.role,
                status: data.status,
                 formData: new FormData()})
          }
      })
  }

  // load security and set FormData

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = name => event => {
    setValues({...values, error: false, success:false, [name] : event.target.value})
};



  const clickSubmit = event => {
    //
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateUser(match.params.userId, token, {firstname, lastname, password, email, role, userType, telephone}).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error,  success: false });
      } else {
        setValues({
          ...values,
        
          loading: false,
          error: false,
          success: true,
          redirectToProfile: true,
          createdUser: data.title
        });
      }
    });
  };


  const showSuccess = () => {
    return (
      <Fragment>
        <div
          class="alert alert-success"
          role="alert"
          style={{ display: success ? "" : "none" }}
        >
          New Account Updated
        </div>
      </Fragment>
    );
  };

  const showError = () => (

    <div class="alert alert-danger alert-dismissible" style={{display: error ? '' : 'none'}}>
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                  <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                  <span><strong>Error!</strong>   {error}</span>
                </div>
);

const redirectUser = () => {

    if (redirectToProfile) {
        if (!error) {
            return <Redirect to="/admin/user/manage" />
        }
    }
  
}
  


  const projectFrom = () => {
    return (
      <Fragment>
              {showSuccess()}
              {showError()}
        <section className="content">
        <form className="mb-3" onSubmit={clickSubmit}>
          <div className="row">
            <div className="offset-3 col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">General</h3>

                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
            
                
                <div className="card-body">
                  <div className="form-group">
                    <label >First Name</label>
                    <input onChange={handleChange('firstname')} value={firstname} type="text" className="form-control" placeholder="Enter First Name" />
                </div>
                <div className="form-group">
                    <label >Last Name</label>
                    <input onChange={handleChange('lastname')} value={lastname} type="text" className="form-control" placeholder="Enter Last Name" />
                </div>

                <div className="form-group">
                    <label >Email</label>
                    <input onChange={handleChange('email')} value={email} type="email" className="form-control" placeholder="Enter Email" />
                </div>

                <div className="form-group">
                    <label >Telephone Number</label>
                    <input onChange={handleChange('telephone')} value={telephone} type="telephone" className="form-control" placeholder="Enter Email" />
                </div>
                
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
                </div>

                <div className="form-group">
                    <label for="inputStatus">User Type</label>
                    <select  onChange={handleChange('userType')} className="form-control custom-select" >
                      
                      <option>{getUserType(userType)}</option>
                   
                      <option value="0">Investor</option>
                      <option value="1">Issuers</option>
                    </select>
                  </div>


                  <div className="form-group">
                    <label for="inputStatus">Role</label>
                    <select  onChange={handleChange('role')} className="form-control custom-select" >
                      
                      <option>{getStatus(role)}</option>
                   
                        <option value="0">Client</option>
                        <option value="1">Admin</option>
                    </select>
                  </div>


                  
             </div>
             </div>
          
             
               
          <div className="row">
            <div className="col-12">
              <Link to="/admin/project/manage" className="btn btn-secondary">
                Cancel
              </Link>
              <input
                type="submit"
                value="Update"
                className="btn btn-success float-right"
              />
            </div>
          
          </div>
            </div>
          </div>
          
        
          </form>
        </section>
      </Fragment>
    );
  };


  const projectHeaderForm = () => {
    return (
      <Fragment>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Update User</h1>
              
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link href="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Update User</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  };

//   const tableOptions = () => {
//     return(
//       <Fragment>
//           <div class="card-body pad table-responsive">
           
//            <Link class="btn btn-success" to={`/admin/project/gallery/${match.params.projectId}`}>Gallery</Link> 
//            <Link class="btn btn-info" to="">Document</Link>
//            <Link class="btn btn-warning" to="">Warning</Link>
//            <Link class="btn btn-danger" to="">Delete</Link>
//           </div>
//       </Fragment>

//     )
//   }


    

const getStatus = (status) => {
    if (status ===0) {
        return `Client  `
    } if (status ===1) {
        return `Admin `
    }
}

const getUserType = (userType) => {
    if (userType ===0) {
        return `Investor`
    } if (userType ===1) {
        return `Issuers `
    }
}




  return (
    <Fragment>
     <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
          {projectHeaderForm()}
          {/* {tableOptions()} */}
     {projectFrom()}
     </div>
     <Footer></Footer>

    </Fragment>
  );
};

export default UpdateUser;
