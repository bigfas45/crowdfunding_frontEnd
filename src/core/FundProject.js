import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import ShowImage from './ShowImage';
import randomstring from "randomstring";
import { readUser, getProject, payment } from "./ApiCore";

const FundProject = ({match}) => {
    const {
        user: { _id}
      } = isAuthenticated();

      const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        telephone: "",
        refrence: "",
        role: "",
        status: "",
        password: "",
        amount:"",
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
        amount,
        refrence,
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
      const [projectAll, setProjectAll] = useState([]);
   
   
    
      const init = () => {
        readUser(_id, token).then(data => {
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

      const initProject = projectId => {
        getProject(projectId).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setProjectAll(data);
          }
        });
      };
    
    
      // load security and set FormData
      const rand = randomstring.generate()

    
      useEffect(() => {
        init();
        initProject(match.params.projectId);
        
      }, []);



      
    
      const handleChange = name => event => {
        const value = name === "image" ? event.target.files[0] : event.target.value;
        let rand2 =0
        formData.set(name, value);
        formData.append('userId', user._id);
        formData.append('projectId', match.params.projectId);
        formData.append('referenceId', rand2 = rand);
        setValues({ ...values, refrence: rand2, error: "", [name]: value });
      };
    
      
    
      const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        payment(_id, token, formData).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
              firstname,
              lastname,
              email,
              telephone,
              amount,
              userId: "",
              loading: false,
              error: false,
              success: true,
              redirectToProfile:true
            
            });
          }
        });
      };
      const redirectUser = () => {
        if (redirectToProfile) {
          if (!error) {
            return <Redirect to={`/project/paystack/${refrence}`} />;
          }
        }
      };
      const showSuccess = () => (
        <div style={{display: success ? '' : 'none'}} class="alert alert-success alert-dismissible bg-success text-white border-0 fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Success - </strong> oject is created.!
    </div>
      );
    
      const showError = () => (
        <div style={{display: error ? '' : 'none'}} class="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>Error - </strong> A simple danger alert—check it out!
    </div>
      );
    
    




  const content = () => {
    return (
      <Fragment>
        <div class="row">
          <div class="col-md-8">
            <div class="card box-margin">
              <div class="card-body">
                <div class="row">
                  <div class="col-12">
                    <div class="card-body">
                      <div class="checkout-area mb-50">
                        <h4 class="card-title mt-0 mb-3">Fund Project</h4>
                        {showSuccess()}
                        {showError()}
                        <form onSubmit={clickSubmit}>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label>
                                  First Name{" "}
                                  <small class="text-danger font-13">*</small>
                                </label>{" "}
                                <input
                                  type="text"
                                  value="John"
                                  class="form-control"
                                  id="firstname"
                                  required=""
                                  value={firstname}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label>
                                  Last Name{" "}
                                  <small class="text-danger font-13">*</small>
                                </label>{" "}
                                <input
                                  value="Doe"
                                  type="text"
                                  class="form-control"
                                  id="lastname"
                                  required=""
                                  value={lastname}
                                  readOnly
                                />
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label>
                                  Email{" "}
                                  <small class="text-danger font-13">*</small>
                                </label>{" "}
                                <input
                                  type="text"
                                  value="john.doe@gmail.com"
                                  class="form-control"
                                  required=""
                                  value={email}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div class="col-md-6">
                              <div class="form-group">
                                <label>
                                  Phone{" "}
                                  <small class="text-danger font-13">*</small>
                                </label>{" "}
                                <input
                                  type="number"
                                  value="+2340987987338"
                                  class="form-control"
                                  required=""
                                  value={telephone}
                                  readOnly
                                />
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label>
                                  Amount(₦){" "}
                                  <small class="text-danger font-13">*</small>
                                </label>{" "}
                                <input
                                  onChange={handleChange("amount")}
                                  type="number"
                                  value={amount}
                                  class="form-control"
                                  required=""
                                />
                              </div>
                            </div>
                          </div>

                          <div class="mt-30">
                            <button type="submit" class="btn btn-primary">
                              Pay Now &nbsp;→
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 order-md-2 box-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="d-flex justify-content-between align-items-center mb-3">
                  <span class="card-title mb-0">Project Details</span>
                </h4>
                {projectAll.map((d,i) => {
                    return(
                        <ul class="list-group mb-3">
                        <li class="list-group-item d-flex justify-content-between lh-condensed">
                          <div>
                            <div class="checkout-thumb mb-10">
                            <ShowImage item={d} url="project" />
                            </div>
                            <h6 class="mb-0 font-14">{d.title}</h6>
                          </div>
                          <span class="font-weight-bold text-success">
                          ₦
                                {d.pledge.toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0
                                })}<p>Goal</p>
                          </span>
                        </li>
                      </ul>
                    )
                })}
               
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div class="container-fluid">{content()}{redirectUser()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FundProject;
