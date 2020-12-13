import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {signup, sendVerificationMail} from '../auth';
import {Spinner, Button} from "reactstrap";
import imgLogo from "../img/logo.jpg"
import ReactTooltip from "react-tooltip";

const Signup = () => {
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        userType: "",
        password: "",
        telephone: "",
        error: "",
        loading: false,
        success: false
    });
    const {
        firstname,
        lastname,
        email,
        userType,
        password,
        telephone,
        error,
        success,
        loading
    } = values;

    const handleChnage = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        });
    };

    const init = (email) => {
        sendVerificationMail(email).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    pop: false
                });
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
        setValues({
            ...values,
            error: false,
            loading: true
        });
        signup({
            firstname,
            lastname,
            email,
            password,
            telephone,
            userType
        }).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false,
                    loading: false
                });
            } else {
                setValues({
                    ...values,
                    firstname: "",
                    lastname: "",
                    email: "",
                    userType: "",
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
                    New Account is created. Please
                    <Link to="/signin">Signin</Link>
                </div>
            </Fragment>
        );
    };


 


    const signupForm = () => {
            return (
              <Fragment>
                <div id="layoutAuthentication">
                  <div id="layoutAuthentication_content">
                    <main>
                      <div class="container">
                        <div class="row justify-content-center">
                          <div class="col-lg-7">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                              {showError()}
                              <div class="card-header justify-content-center">
                                <center>
                                  <img src={imgLogo} />
                                </center>
                              </div>
                              <div class="card-header justify-content-center">
                                <h3 class="font-weight-light my-4">
                                  Create Account
                                </h3>
                              </div>
                              <div class="card-body">
                                <form>
                                  <div class="form-row">
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label
                                          class="small mb-1"
                                          for="inputFirstName"
                                        >
                                          First Name
                                        </label>
                                        <input
                                          onChange={handleChnage('firstname')}
                                          value={firstname}
                                          class="form-control py-4"
                                          id="inputFirstName"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label
                                          class="small mb-1"
                                          for="inputLastName"
                                        >
                                          Last Name
                                        </label>
                                        <input
                                          onChange={handleChnage('lastname')}
                                          value={lastname}
                                          class="form-control py-4"
                                          id="inputLastName"
                                          type="text"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label
                                          class="small mb-1"
                                          for="inputEmail"
                                        >
                                          Email <span>*Case Sensitive</span>
                                        </label>
                                        <input
                                          onChange={handleChnage('email')}
                                          value={email}
                                          data-tip="Case Sensitive"
                                          class="form-control py-4"
                                          id="inputEmail"
                                          type="email"
                                        />
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label
                                          class="small mb-1"
                                          for="inputTelephone"
                                        >
                                          Phone number
                                        </label>
                                        <input
                                          onChange={handleChnage('telephone')}
                                          value={telephone}
                                          class="form-control py-4"
                                          id="inputTelephone"
                                          type="number"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div class="form-row">
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label
                                          class="small mb-1"
                                          for="inputAccountType"
                                        >
                                          Account Type
                                        </label>
                                        <select
                                          onChange={handleChnage('userType')}
                                          value={userType}
                                          class="form-control"
                                        >
                                          <option></option>
                                          <option value="1">Investor</option>
                                          <option value="0">Issuer</option>
                                          <option value="3">Donation</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div class="col-md-6">
                                      <div class="form-group">
                                        <label
                                          class="small mb-1"
                                          for="inputConfirmPassword"
                                        >
                                          Password
                                        </label>
                                        <input
                                          onChange={handleChnage('password')}
                                          value={password}
                                          class="form-control py-4"
                                          data-tip="Password should be greater than six and must include a number"
                                          id="inputConfirmPassword"
                                          type="password"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group mb-0">
                                    {loading && loading ? (
                                      <Button
                                        class="btn btn-primary btn-block"
                                        variant="success"
                                        disabled
                                      >
                                        <Spinner
                                          as="span"
                                          animation="grow"
                                          size="sm"
                                          role="status"
                                          aria-hidden="true"
                                        />
                                        Loading...
                                      </Button>
                                    ) : (
                                      <button
                                        onClick={clickSubmit}
                                        class="btn btn-primary btn-block"
                                        type="submit"
                                      >
                                        Sign Up
                                      </button>
                                    )}{' '}
                                  </div>
                                </form>
                              </div>
                              <div class="card-footer text-center">
                                <div class="small">
                                  <Link to="/">
                                    Have an account? Go to login
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              </Fragment>
            );
    };

    return (
      <Fragment>
        <div className="bg-default">
          {signupForm()}
          {redirectUser()}{' '}
        </div>
        <ReactTooltip />
      </Fragment>
    );
};

export default Signup;
