import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../img/nasdlogop.jpg"
import {updatePassword} from '../auth';



const ResetPassword = ({match}) => {

    const [values, setValues] = useState({
       
        password: "",
        error: "",
        success: false
      });
      const { password,  error, success } = values;
    
      const handleChnage = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    
    
      
    
    
      
      
    
    
      const clickSubmit = event => {
        event.preventDefault();
        
        setValues({...values, error:false});
        updatePassword( {password}, match.params.userId ).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false , pop: false});
          } else {
            setValues({
              ...values,
              password: "",
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
             Your Password has been Reset <Link to="/signin">Signin</Link>  
            </div>
          </Fragment>
        );
      };




    const resetPasswordForm = () => {
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
                               {showError()}
                              <h4 class="font-24 mb-30">Forgot Password ?</h4>
                              <p>Enter your password to get reset link</p>

                              <form action="#">
                                  <div class="form-group">
                                      <label class="lock-text text-dark">password</label>
                                      <input   onChange={handleChnage("password")}   value={password}  type="password" class="form-control height-50" id="examplePassword1" placeholder="password"/>
                                  </div>

                                  <div class="form-group mb-0">
                                      <button onClick={clickSubmit} class="btn btn-primary btn-block" type="submit">Reset Password</button>
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
           {resetPasswordForm()}
        </Fragment>
    )

}

export default ResetPassword