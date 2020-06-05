import React, { Fragment,  useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import {  isAuthenticated } from "../auth";
import { updateCategory, readCategories } from "./ApiAdmin";
import { Spinner, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Menu from "./Menu";






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
        setLoading(false)
        setName(e.target.value);
    };

    const clickSubmit = e => {
      e.preventDefault();
      setError('');
      setSuccess(false);
      setLoading(true)
      // make request to create category
      updateCategory(user._id, match.params.catId, token , {name})
      .then(data =>{
          if (data.error) {
              setError(true);
          }else{
              setError('');
              setSuccess(true);
              setRedirect(true);
              setLoading(false)
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
  return (<Fragment>

      <div class="container-fluid mt-n10">
          <div class="row">
              <div class="offset-3 col-lg-6">
                  <div id="default">
                      <div class="card mb-4">
                          <div class="card-header">Category Form Controls</div>
                          <div class="card-body"> {
                              showError()
                          }
                              {
                              showSuccess()
                          }
                              <div class="sbp-preview">
                                  <div class="sbp-preview-content">
                                      <form onSubmit={clickSubmit}>

                                          <div class="form-group">
                                              <label for="exampleFormControlInput1">Category name</label>
                                              <input value={name}
                                                  onChange={handleChange}
                                                  class="form-control"
                                                  id="exampleFormControlInput1"
                                                  type="text"
                                                  placeholder="Enter category name"/>
                                          </div>


                                          {
                                          loading && loading ? (<Button className="btn btn-block btn-danger" variant="success" disabled>
                                              <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                              Loading...
                                          </Button>) : (<input type="submit" className="btn btn-block btn-primary" value="Update category"/>)
                                      } </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

             </div>
      </div>


  </Fragment>)
}

    const footer = () => {
      return (<Fragment>
          <footer class="footer mt-auto footer-light">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-md-6 small">Copyright &copy;
                          <a href="ventureramp.com.ng">ventureramp.com.ng</a>
                          2020</div>
                      <div class="col-md-6 text-md-right small">
                          <a href="#!">Privacy Policy</a>
                          &middot;
                          <a href="#!">Terms &amp; Conditions</a>
                      </div>
                  </div>
              </div>
          </footer>
      </Fragment>)
  }

  const contentHeader = () => {
      return (<Fragment>


          <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
              <div class="container-fluid">
                  <div class="page-header-content">
                      <h1 class="page-header-title">
                          <div class="page-header-icon">
                              <i data-feather="file"></i>
                          </div>
                          <span>Update Category</span>
                      </h1>
                      <div class="page-header-subtitle"></div>
                  </div>
              </div>
          </div>
      </Fragment>)

  }


    return(
      <Fragment>
      <Header/>
      <div id="layoutSidenav">
          <Menu/>
          <div id="layoutSidenav_content">

              <main> {
                  contentHeader()
              }

                  {
                  categoryForm()
              } 
              {redirectUser()}
              
              </main>
              {
              footer()
          } </div>
      </div>
  </Fragment>
    )


}


export default UpdateCategory 