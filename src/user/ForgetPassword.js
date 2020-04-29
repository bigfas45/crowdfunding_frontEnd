import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../img/nasdlogop.jpg"
import {passwordReset} from '../auth';



const ForgetPassword = () => {

    const [values, setValues] = useState({
       
        email: "",
        error: "",
        success: false
      });
      const { email,  error, success } = values;
    
      const handleChnage = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    
    
      
    
    
      
      
    
    
      const clickSubmit = event => {
        event.preventDefault();
        
        setValues({...values, error:false});
        passwordReset( email ).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false , pop: false});
          } else {
            setValues({
              ...values,
              email: "",
              success: true
            });
          }
        });
      };
    
      const showError = () => {
        return (
         
            <div
              class="alert alert-danger"
              role="alert"
              style={{ display: error ? "" : "none" }}
            >
              {error}
            </div>
        
       
        );
      };
    
      const showSuccess = () => {
        return (
          <Fragment>
            <div
              class="alert alert-info"
              role="alert"
              style={{ display: success ? "" : "none" }}
            >
            Password reset link as been sent to your email  
            </div>
          </Fragment>
        );
      };




    const forgetPasswordForm = () => {
       return(
           <Fragment>
                <body class="login-area">
  
   
   
  <div class="main-content- h-100vh">
      <div class="container h-100">
          <div class="row h-100 align-items-center justify-content-center">
              <div class="col-md-8 col-lg-5">
             
                  <div class="middle-box">
                      <div class="card">
                          <div class="card-body p-4">
                               <center><img src={img} height="150" width="200"/></center>
                               {showSuccess()}
                              <h4 class="font-24 mb-30">Reset Your Password ?</h4>
                              <p>Enter your new password </p>

                              <form action="#">
                                  <div class="form-group">
                                      <label class="lock-text text-dark">Password</label>
                                      <input   onChange={handleChnage("email")}   value={email}  type="email" class="form-control height-50" id="examplePassword1" placeholder="Email"/>
                                  </div>

                                  <div class="form-group mb-0">
                                      <button onClick={clickSubmit} class="btn btn-primary btn-block" type="submit">Send Password</button>
                                  </div>
                              </form>
                           
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  </body>
           </Fragment>
       )
    }

    return(
        <Fragment>
           {forgetPasswordForm()}
        </Fragment>
    )

}

export default ForgetPassword