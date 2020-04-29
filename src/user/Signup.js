import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {signup, sendVerificationMail} from '../auth';



const Signup = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    userType: "",
    password: "",
    telephone:"",
    error: "",
    success: false
  });
  const { firstname, lastname, email, userType, password, telephone, error, success } = values;

  const handleChnage = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const init = (email) => {
    sendVerificationMail(email).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, pop: false });
      } else {
        setValues({
          ...values,
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          success: true,
          pop: true
        });
      }
    });
  };


  const redirectUser = () => {
    if (success) {
     
        return <Redirect to="/verification"></Redirect>;
   
      }
    
  };


  const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error:false});
    signup({ firstname, lastname, email, password, telephone, userType }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          firstname: "",
          lastname: "",
          email: "",
          userType:"",
          password: "",
          telephone: "",
          success: true
        });
        init(email)
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
          New Account is created. Please <Link to="/signin">Signin</Link>  
        </div>
      </Fragment>
    );
  };

  const signupForm = () => {
    return (
      <Fragment>
     <body class="login-area">
   

    <div class="main-content- h-100vh">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center">
                <div class="col-md-8 col-lg-5">
              
                    <div class="middle-box">
                        <div class="card">
                            <div class="card-body p-4">
                                 <center><img src="img/nasdlogop.jpg" height="150" width="200"/></center> 
                                <h4 class="font-24 mb-30">Create account.</h4>
                                {showSuccess()}
                           {showError()}
                                <form action="#">
                                    <div class="form-group">
                                        <label for="fullname">First Name</label>
                                        <input  onChange={handleChnage("firstname")} value={firstname} class="form-control" type="text" id="fullname" placeholder="Enter your name" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="fullname">Last Name</label>
                                        <input  onChange={handleChnage("lastname")} value={lastname} class="form-control" type="text" id="username" placeholder="Username" required/>
                                    </div>

                                    <div class="form-group">
                                        <label for="emailaddress">Email address</label>
                                        <input  onChange={handleChnage("email")} value={email}  class="form-control" type="email" id="emailaddress" required placeholder="Enter your email"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="telephone">Telephone </label>
                                        <input  onChange={handleChnage("telephone")} value={telephone}  class="form-control" type="number" id="telephone" required placeholder="Enter your telephone number"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="telephone">User Type </label>
                                        <select  class="form-control"  onChange={handleChnage("userType")} value={userType}>
                                          <option value="">Please select account type</option>
                                            <option value="0">Investror</option>
                                            <option value="1">Issuers</option>
                                        </select>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input  onChange={handleChnage("password")} value={password} class="form-control" type="password" required id="password" placeholder="Enter your password"/>
                                    </div>

                                    <div class="form-group mb-0 mt-15">
                                        <button  onClick={clickSubmit} class="btn btn-primary btn-block" type="submit">Create my account</button>
                                    </div>

                                    <div class="text-center mt-15"><span class="mr-2 font-13 font-weight-bold">Already have an account?</span><Link class="font-13 font-weight-bold" to="/signin">Sign in</Link></div>

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
    );
  };

  return <div style={{  
    backgroundImage: "url(" + "https://nasdng.com/wp-content/uploads/2020/01/PA-FX-Background.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "780px"
  
  }}>
    {signupForm()}
    {redirectUser()}
    </div>;
};

export default Signup;
