import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { readUser, updateUser } from "./ApiAdmin";
import { Link, Redirect } from "react-router-dom";
import { API } from "../config";
import ReactHtmlParser from "react-html-parser";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import Footer from "./Footer";

const UpdateUser = ({ match }) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    userType: "",
    role: "",
    status: "",
    password: "",
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

  const init = userId => {
    readUser(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          telephone: data.telephone,
          userType: data.userType,
          role: data.role,
          status: data.status,
          formData: new FormData()
        });
      }
    });
  };

  // load security and set FormData

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: event.target.value
    });
  };

  const clickSubmit = event => {
    //
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateUser(match.params.userId, token, {
      firstname,
      lastname,
      password,
      email,
      role,
      userType,
      telephone
    }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
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
    <div
      class="alert alert-danger alert-dismissible"
      style={{ display: error ? "" : "none" }}
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        &times;
      </button>
      <h5>
        <i class="icon fas fa-ban"></i> Alert!
      </h5>
      <span>
        <strong>Error!</strong> {error}
      </span>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/user/manage" />;
      }
    }
  };

  const projectFrom = () => {
    return (
      <Fragment>
        {showSuccess()}
        {showError()}
        <div class="col-12 box-margin height-card">
          <div class="card">
            <div class="card-body">
              <h6 class="card-title">User Form Grid</h6>
              <form  onSubmit={clickSubmit}>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">First Name</label>
                      <input
                        onChange={handleChange("firstname")}
                        value={firstname}
                        type="text"
                        class="form-control"
                        placeholder="Enter first name"
                      />
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Last Name</label>
                      <input
                        onChange={handleChange("lastname")}
                        value={lastname}
                        type="text"
                        class="form-control"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="control-label">Email</label>
                      <input
                        onChange={handleChange("email")}
                        value={email}
                        type="email"
                      
                        class="form-control"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="control-label">User Role</label>
                      <select  onChange={handleChange('role')}   className="form-control custom-select" >
                      
                      <option></option>
                   
                        <option value="0">Client</option>
                        <option value="1">Admin</option>
                    </select>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label class="control-label">Telephone Number</label>
                      <input
                        onChange={handleChange("telephone")}
                        value={telephone}
                        type="number"
                        class="form-control"
                        placeholder="Enter Telephone"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">User Type</label>
                      <select
                        onChange={handleChange("userType")}
                        className="form-control custom-select"
                      >
                        <option></option>

                        <option value="1">Investor</option>
                        <option value="0">Issuers</option>
                      </select>
                    </div>
                  </div>
                 
                  <div class="col-sm-6">
                    <div class="form-group">
                      <label class="control-label">Password</label>
                      <input
                        onChange={handleChange("password")}
                        value={password}
                        type="password"
                        class="form-control"
                        autocomplete="off"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary submit">
                Submit form
              </button>
              </form>
              
            </div>
          </div>
        </div>
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

  const getStatus = status => {
    if (status === 0) {
      return `Client  `;
    }
    if (status === 1) {
      return `Admin `;
    }
  };

  const getUserType = userType => {
    if (userType === 0) {
      return `Investor`;
    }
    if (userType === 1) {
      return `Issuers `;
    }
  };

  return (
    <div className="ecaps-page-wrapper">
      <Aside></Aside>
      <div className="ecaps-page-content">
        <Header></Header>
        <div className="main-content">
          <div className="container-fluid">{projectFrom()}</div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
