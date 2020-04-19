import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Spinner } from "reactstrap";

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
        return <Redirect to="/"></Redirect>;
      }
    }
  };

  const signinForm = () => {
    return (
      <Fragment>
        <body class="hold-transition login-page" style={{  
    backgroundImage: "url(" + "https://nasdng.com/wp-content/uploads/2020/01/PA-FX-Background.jpg" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: "780px"
  
  }}>
       <div class="login-box">
  <div class="login-logo">
    <a href="../../index2.html"><b>Admin</b>LTE</a>
  </div>
  {/* <!-- /.login-logo --> */}
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign in to start your session</p>
              {showError()}
                {showLoading()}
      <form action="../../index3.html" method="post">
        <div class="input-group mb-3">
          <input     onChange={handleChnage("email")} type="email" class="form-control" placeholder="Email" value={email} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <input    onChange={handleChnage("password")} type="password" class="form-control" placeholder="Password"    value={password} />
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="remember" />
              <label for="remember">
                Remember Me
              </label>
            </div>
          </div>
          {/* <!-- /.col --> */}
          <div class="col-4">
            <button   onClick={clickSubmit} type="submit" class="btn btn-primary btn-block">Sign In</button>
          </div>
          {/* <!-- /.col --> */}
        </div>
      </form>

    
      <Link to="/signup" class="text-center">I dont have a membership</Link>

    
    </div>
    {/* <!-- /.login-card-body --> */}
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
