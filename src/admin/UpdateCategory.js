import React, { Fragment,  useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import {  isAuthenticated } from "../auth";
import { updateCategory, readCategories } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";






const UpdateCategory = ({match}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  let count =0;

      const { user, token } = isAuthenticated();

      const init = (catId) => {
        readCategories(catId).then(data => {
            if (data.error) {
               setError(data.error)
            }else{
                setName(data.name)
            }
        });
    };


   

    useEffect(() => {
      init(match.params.catId);
  }, []);

      const handleChange = e => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = e => {
      e.preventDefault();
      setError('');
      setSuccess(false);
      // make request to create category
      updateCategory(user._id, match.params.catId, token , {name})
      .then(data =>{
          if (data.error) {
              setError(true);
          }else{
              setError('');
              setSuccess(true);
              setRedirect(true);
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
    
          </div>)
        }
    }


    const redirectUser = () => {
        if (redirect) {
            if (!error) {
                return <Redirect to="/admin/category/create" />;
            }
        }
    }

    const showError = () => {
        if (error) {
        return (
            <div
            class="alert alert-danger"
            role="alert"
            style={{ display: error ? "" : "none" }}
          >
          {name}  should be unique
    
          </div>
        )
        }
    };

    
const showLoading = () => (

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
       
    )

    
);


    const categoryForm = () => {
        return(
            <Fragment>
              <div class="offset-3 col-xl-6 box-margin height-card">
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
                
                </form>
              </div>
            </div>
          </div>
        </div>

            </Fragment>
        )
    }




    return(
      <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div class="container-fluid">
              <div class="row">{categoryForm()}</div>
              {redirectUser()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    )


}


export default UpdateCategory 