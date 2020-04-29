import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Spinner } from "reactstrap";
import img from "../img/nasdlogop.jpg"

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false
  });
  const { email, password, error, loading, redirectToReferrer } = values;
  const {user} = isAuthenticated()

  const handleChnage = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true
          });
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

  const showLoading = () =>
    loading && (
      <div>
        <Spinner type="grow" color="primary" />
        <Spinner type="grow" color="secondary" />
        <Spinner type="grow" color="success" />
        <Spinner type="grow" color="danger" />
        <Spinner type="grow" color="warning" />
        <Spinner type="grow" color="info" />
        <Spinner type="grow" color="light" />
        <Spinner type="grow" color="dark" />
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"></Redirect>;
      }else{
        return <Redirect to="/"></Redirect>
      }
    }
  };

  const signinForm = () => {
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

                         {showError()}
                {showLoading()}
                            <center><img src={img} height="150" width="200"/></center> 
                             <h4 class="font-24 mb-1">Login.</h4>
                             <p class="mb-30">Sign in to your account to continue.</p>

                             <form>
                                 <div class="form-group">
                                     <label class="float-left" for="emailaddress">Email address</label>
                                     <input onChange={handleChnage("email")} value={email} class="form-control" type="email" id="emailaddress" required="" placeholder="Enter your email"/>
                                 </div>

                                 <div class="form-group">
                                     <a href="forget-password.html" class="text-dark float-right"></a>
                                     <label class="float-left" for="password">Password</label>
                                     <input  onChange={handleChnage("password")}  value={password} class="form-control" type="password" required="" id="password" placeholder="Enter your password"/>
                                 </div>

                                 <div class="form-group d-flex justify-content-between align-items-center mb-3">
                                      
                                        <span class="font-13 text-primary"><Link to="/password/reset">Forgot your password?</Link></span>
                                    </div>

                                 <div class="form-group mb-0">
                                     <button  onClick={clickSubmit} class="btn btn-primary btn-block" type="submit"> Log In </button>
                                 </div>

                                 <div class="text-center mt-15"><span class="mr-2 font-13 font-weight-bold">Don't have an account?</span><Link class="font-13 font-weight-bold" to="/signup">Sign up</Link></div>

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

  return (
    <Fragment>

      {signinForm()}
      {redirectUser()}
    </Fragment>
  );
};

export default Signin;
