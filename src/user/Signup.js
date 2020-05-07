import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {signup, sendVerificationMail} from '../auth';
import { Spinner, Button } from "reactstrap";



const Signup = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    userType: "",
    password: "",
    telephone:"",
    error: "",
    loading: false,
    success: false
  });
  const { firstname, lastname, email, userType, password, telephone, error, success, loading } = values;

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
    setValues({...values, error:false, loading: true});
    signup({ firstname, lastname, email, password, telephone, userType }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false, loading: false });
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
          className="alert alert-danger"
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
          className="alert alert-info"
          role="alert"
          style={{ display: success ? "" : "none" }}
        >
          New Account is created. Please <Link to="/signin">Signin</Link>  
        </div>
      </Fragment>
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


  const signupForm = () => {
    return (
      <Fragment>
     
   

    <div className="main-content- h-100vh">
        <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center">
                <div className="col-md-8 col-lg-5">
              
                    <div className="middle-box">
                        <div className="card">
                            <div className="card-body p-4">
                                 <center><img src="img/nasdlogop.jpg" height="150" width="200"/></center> 
                                <h4 className="font-24 mb-30">Create account.</h4>
                                {showSuccess()}
                           {showError()}
                                <form action="#">
                                    <div className="form-group">
                                        <label for="fullname">First Name</label>
                                        <input  onChange={handleChnage("firstname")} value={firstname} className="form-control" type="text" id="fullname" placeholder="Enter your name" required/>
                                    </div>
                                    <div className="form-group">
                                        <label for="fullname">Last Name</label>
                                        <input  onChange={handleChnage("lastname")} value={lastname} className="form-control" type="text" id="username" placeholder="Username" required/>
                                    </div>

                                    <div className="form-group">
                                        <label for="emailaddress">Email address</label>
                                        <input  onChange={handleChnage("email")} value={email}  className="form-control" type="email" id="emailaddress" required placeholder="Enter your email"/>
                                    </div>

                                    <div className="form-group">
                                        <label for="telephone">Telephone </label>
                                        <input  onChange={handleChnage("telephone")} value={telephone}  className="form-control" type="number" id="telephone" required placeholder="Enter your telephone number"/>
                                    </div>

                                    <div className="form-group">
                                        <label for="telephone">User Type </label>
                                        <select  className="form-control"  onChange={handleChnage("userType")} value={userType}>
                                          <option value="">Please select account type</option>
                                            <option value="1">Investor</option>
                                            <option value="0">Issuer</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label for="password">Password</label>
                                        <input  onChange={handleChnage("password")} value={password} className="form-control" type="password" required id="password" placeholder="Enter your password"/>
                                    </div>

                                    <div className="form-group mb-0 mt-15">
                                    {loading && loading ? (<Button class="btn btn-primary btn-block" variant="success" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>) : ( <button  onClick={clickSubmit} class="btn btn-primary btn-block" type="submit"> Log In </button>)}                                    </div>

                                    <div className="text-center mt-15"><span className="mr-2 font-13 font-weight-bold">Already have an account?</span><Link className="font-13 font-weight-bold" to="/">Sign in</Link></div>

                                </form>

                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      </Fragment>
    );
  };

  return <div style={{  
    backgroundImage: "url(" + "https://nasdng.com/wp-content/uploads/2020/01/PA-FX-Background.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "1080px"
  
  }}>
    {signupForm()}
    {redirectUser()}
    </div>;
};

export default Signup;
