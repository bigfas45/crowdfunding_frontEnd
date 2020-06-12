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

            <div className="alert alert-danger" role="alert"
                style={
                    {
                        display: error ? "" : "none"
                    }
            }>
                {error} </div>


        );
    };

    const showSuccess = () => {
        return (
            <Fragment>
                <div className="alert alert-info" role="alert"
                    style={
                        {
                            display: success ? "" : "none"
                        }
                }>
                   Your password has been reset
                    <Link to="/signin">Signin</Link>
                </div>
            </Fragment>
        );
    };




    const resetPasswordForm = () => {
       return(
         <Fragment>
           <div class="bg-primary">
                    <div id="layoutAuthentication">
                        <div id="layoutAuthentication_content">
                            <main>
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-5">
                                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                               
                                            {showSuccess()}
                               {showError()}
                           
                                                <div class="card-header justify-content-center">
                                              
                                                    <h3 class="font-weight-light my-4">Enter your new password to reset password</h3>
                                                </div>
                                                <div class="card-body">
                                                    <form>
                                                      
                                                        <div class="form-group">
                                                            <label class="small mb-1" for="inputPassword">Password</label><input onChange={
                                                                    handleChnage('password')
                                                                }
                                                                value={password}
                                                                class="form-control py-4"
                                                                id="inputPassword"
                                                                type="password"
                                                                placeholder="Enter password"/></div>
                                                        
                                  <div class="form-group mb-0">
                                      <button onClick={clickSubmit} class="btn btn-primary btn-block" type="submit">Reset Password</button>
                                  </div>
                                                      
                                                    </form>
                                                </div>
                                                <div class="card-footer text-center">
                                                    <div class="small">
                                                        <Link to="/signup">Need an account? Sign up!</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>

                    </div>
                </div>
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