import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {signup} from '../auth';


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
        <body class="hold-transition register-page" style={{  
    backgroundImage: "url(" + "https://nasdng.com/wp-content/uploads/2020/01/PA-FX-Background.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "780px"
  
  }}>
<div class="register-box">
  <div class="register-logo">
    <a href="../../index2.html"><b>NASD</b>CROWDFUNDING</a>
  </div>

  <div class="card">
    <div class="card-body register-card-body">
      <p class="login-box-msg">Register as new membership</p>
      {showSuccess()}
                {showError()}
      <form action="../../index.html" method="post">
        <div class="input-group mb-3">
          <input    onChange={handleChnage("firstname")} type="text" class="form-control" placeholder="First name"  value={firstname} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input  onChange={handleChnage("lastname")} type="text" class="form-control" placeholder="Last name"   value={lastname} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-user"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input  onChange={handleChnage("email")} type="email" class="form-control" placeholder="Email" value={email} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>

        <div class="input-group mb-3">
          <input  onChange={handleChnage("telephone")} type="number" class="form-control" placeholder="Phone" value={telephone} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-telephone"></span>
            </div>
          </div>
        </div>

        <div class="input-group mb-3">
           
            <select  class="form-control"  onChange={handleChnage("userType")} value={userType}>
            <option value="">Please select account type</option>
              <option value="0">Investror</option>
              <option value="1">Issuers</option>
            </select>
        </div>
        <div class="input-group mb-3">
          <input  onChange={handleChnage("password")} type="password" class="form-control" placeholder="Password" value={password} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
       
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" value="agree" />
              <label for="agreeTerms">
               I agree to the <a href="#">terms</a>
              </label>
            </div>
          </div>
          <div class="col-4">
            <button  onClick={clickSubmit} type="submit" class="btn btn-primary btn-block">Register</button>
          </div>
        </div>
      </form>


      <Link to="/signin" class="text-center">I already have a membership</Link>
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
    </div>;
};

export default Signup;
