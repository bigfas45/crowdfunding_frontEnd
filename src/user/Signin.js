import React, { Fragment, useState } from "react";
import { Link, Redirect, refresh } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth";
import { Spinner, Button } from "reactstrap";
import img from "../img/nasdlogop.jpg"
import imgLogo from "../img/logo.jpg"
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
      }else if(user && user.role === 0 && user.userType ===1 || user.userType === 3 ){
        return <Redirect  to="/investor/dashboard" refresh={true}></Redirect>;
      }else if(user && user.role === 0 && user.userType ===0 ){
        return <Redirect to="/issuer/dashboard"></Redirect>;
      }
    }
  };

  const signinForm = () => {
    return (
      <Fragment>
      

      <div class="bg-primary">
                    <div id="layoutAuthentication">
                        <div id="layoutAuthentication_content">
                            <main>
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-lg-5">
                                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                               
                                                {
                                                showError()
                                            }
                                                <div class="card-header justify-content-center">
                                                <center><img src={imgLogo} height="150" width="200"/></center> 
                                                    <h3 class="font-weight-light my-4">Login</h3>
                                                </div>
                                                <div class="card-body">
                                                    <form>
                                                        <div class="form-group">
                                                            <label class="small mb-1" for="inputEmailAddress">Email</label><input onChange={
                                                                    handleChnage('email')
                                                                }
                                                                value={email}
                                                                class="form-control py-4"
                                                                id="inputEmailAddress"
                                                                type="email"
                                                                placeholder="Enter email address"/></div>
                                                        <div class="form-group">
                                                            <label class="small mb-1" for="inputPassword">Password</label><input onChange={
                                                                    handleChnage('password')
                                                                }
                                                                value={password}
                                                                class="form-control py-4"
                                                                id="inputPassword"
                                                                type="password"
                                                                placeholder="Enter password"/></div>
                                                        <div class="form-group">
                                                            <div class="custom-control custom-checkbox"><input class="custom-control-input" id="rememberPasswordCheck" type="checkbox"/><label class="custom-control-label" for="rememberPasswordCheck">Remember password</label>
                                                            </div>
                                                        </div>
                                                        <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                            <Link class="small" to="/password/reset">Forgot Password?</Link>

                                                            {
                                                            loading && loading ? (
                                                                <Button class="btn btn-primary" variant="success" disabled>
                                                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                                                    Loading...
                                                                </Button>
                                                            ) : (
                                                                <button onClick={clickSubmit}
                                                                    class="btn btn-primary"
                                                                    type="submit">
                                                                    Login
                                                                </button>
                                                            )
                                                        } </div>
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
    );
  };

  return (
    <Fragment>
    <div className="bg-primary">
        {
        signinForm()
    } 
    {redirectUser()}
 
    </div>

</Fragment>
  );
};

export default Signin;
