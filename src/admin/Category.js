import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

import { isAuthenticated } from "../auth";
import { createCategory, getCategories } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";

const Category = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  let count = 0;

  const { user, token } = isAuthenticated();

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = e => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = e => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true)
    // make request to create category
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setLoading(false)
        init();
      }
    });
  };

  const showSuccess = () => {
    if (success) {
      return (
        <div
          class="alert alert-success"
          role="alert"
          style={{ display: success ? "" : "none" }}
        >
          {name} is created
        </div>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to Dashboard
      </Link>
    </div>
  );

  const showError = () => {
    if (error) {
      return (
        <div
          class="alert alert-danger"
          role="alert"
          style={{ display: error ? "" : "none" }}
        >
          {name} should be unique
        </div>
      );
    }
  };

  const showLoading = () =>
    loading && (
      <div>
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="light" />
        <Spinner animation="grow" variant="dark" />
      </div>
    );

  const categoryForm = () => {
    return (
      <Fragment>
        <div class="col-xl-6 box-margin height-card">
          <div class="card card-body">
            <h4 class="card-title">Category creation from</h4>
            {showError()}
            {showSuccess()}
            {showLoading()}
            <div class="row">
              <div class="col-sm-12 col-xs-12">
                <form role="form" onSubmit={clickSubmit}>
                  <div class="form-group">
                    <label for="exampleInputEmail111"> Name</label>
                    <input
                      onChange={handleChange}
                      value={name}
                      type="text"
                      class="form-control"
                      id="exampleInputEmail111"
                      placeholder="Enter category name"
                    />
                  </div>

                  <button type="submit" class="btn btn-primary mr-2">
                    Submit
                  </button>
                  <button type="submit" class="btn btn-danger">
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-6 box-margin height-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Category Table List</h4>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th> Name</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((c, i) => {
                      count++;
                      return (
                        <tr key={i}>
                          <td>{count}</td>

                          <td>{c.name}</td>
                          <td>
                           
                              <Link to={`/category/${c._id}`}> <i class="fa fa-edit"></i></Link>{" "}
                          
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const categoryTable = () => {
    return <Fragment></Fragment>;
  };

  return (
    <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div class="container-fluid">
              <div class="row">{categoryForm()}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Category;
