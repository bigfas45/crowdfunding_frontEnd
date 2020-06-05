import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { createBlog, getCategories } from "./ApiAdmin";
import { Spinner, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Menu from "./Menu";


const Project = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    description: "",
    userId: "",
    image: "",
    loading: false,
    error: "",
    createdProduct: "",
    success: "",
    redirectToProfile: false,
    formData:    new FormData()
  });

  const {
    title,
    description,
    userId,
    image,
    loading,
    error,
    createdProduct,
    success,
    redirectToProfile,
    formData,
  } = values;



  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/blog/manage" />;
      }
    }
  };

  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;

    formData.set(name, value);
    formData.append('userId', user._id);
    setValues({ ...values, error: "", [name]: value });
  };

  const handleOnChange = (e, editor) => {
    const descriptionData = editor.getData();
    formData.append("description", descriptionData);
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createBlog(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          image: "",
          userId: "",
          loading: false,
          error: false,
          success: true,
          createdProduct: data.title
        });
      }
    });
  };

  const showSuccess = () => (
    <div style={{display: createdProduct ? '' : 'none'}} class="alert alert-success alert-dismissible bg-success text-white border-0 fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Success - </strong> {title} is created
</div>
  );

  const showError = () => (
    <div style={{display: error ? '' : 'none'}} class="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Error - </strong> {error}
</div>
  );


  const projectForm = () => {
    return (
      <Fragment>
          <div class="container-fluid mt-n10">
        <div className="col-12 box-margin height-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title mb-30">Add Blog</h6>
              {showSuccess()}
              {showError()}
              <form onSubmit={clickSubmit}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="control-label">Blog Title</label>
                      <input
                        onChange={handleChange("title")}
                        value={title}
                        type="text"
                        className="form-control"
                        placeholder="Enter project title"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label htmlFor="inputDescription">Project Description</label>
                      <CKEditor
                        editor={ClassicEditor}
                        name="description"
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>
               
                </div>
               
               
                <div className="row">
                  
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label">Feature Picture</label>
                      <small>
                        (This is the first thing that people will see when they
                        come across your project.)
                      </small>
                      <input
                        onChange={handleChange("image")}
                        required=""
                        type="file"
                        name="file"
                        className="dropify"
                        data-height="300"
                      />
                    </div>
                  </div>
                </div>
            
            
                
            {loading && loading ? (<Button className="btn btn-danger float-right" variant="success" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>) : ( <input type="submit"  className="btn btn-success float-right"   value="Submit" />)}
                
             
                </form>
            </div>
          </div>
        </div>
        </div>
      </Fragment>
    );
  };

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
                        <span>Issuer Application </span>
                    </h1>
                    <div class="page-header-subtitle">Manage your Issuer Application here!</div>
                </div>
            </div>
        </div>
    </Fragment>)
  }

  return (
    <Fragment>
    <Header/>
    <div id="layoutSidenav">
        <Menu/>
        <div id="layoutSidenav_content">
  
            <main> {
                contentHeader()
            }
  
                {
                projectForm()
            } </main>
            {
            footer()
        } </div>
    </div>
  </Fragment>
  );
};

export default Project;
