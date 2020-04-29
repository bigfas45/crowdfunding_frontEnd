import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { createProject, getCategories } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Project = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    description: "",
    pledge: "",
    categories: [],
    category: "",
    location: "",
    website: "",
    returns: "",
    userId: "",
    duration: "",
    projectType: "",
    image: "",
    loading: false,
    error: "",
    createdProduct: "",
    success: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    title,
    description,
    pledge,
    categories,
    category,
    location,
    website,
    returns,
    userId,
    duration,
    projectType,
    image,
    loading,
    error,
    createdProduct,
    success,
    redirectToProfile,
    formData
  } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        });
      }
    });
  };
  useEffect(() => {
    init();
    //setValues({...values, formData: new FormData() });
  }, []);

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/manage/annualreport" />;
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

    createProject(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          pledge: "",
          location: "",
          website: "",
          returns: "",
          category: "",
          duration: "",
          projectType: "",
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
    <strong>Success - </strong> oject is created.!
</div>
  );

  const showError = () => (
    <div style={{display: error ? '' : 'none'}} class="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Error - </strong> A simple danger alert—check it out!
</div>
  );


  const projectForm = () => {
    return (
      <Fragment>
        <div className="col-12 box-margin height-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title mb-30">Add Project</h6>
              {showSuccess()}
              {showError()}
              <form onSubmit={clickSubmit}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label className="control-label">Project Title</label>
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
                      <label className="control-label">Project Type</label>
                      <select
                        onChange={handleChange("projectType")}
                        value={projectType}
                        className="form-control"
                        id="category"
                        name="category"
                      >
                        <option>Select Here..</option>
                        <option value="Loan">Loan</option>
                        <option value="Equity">Equity</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label className="control-label">Category</label>
                      <select
                        onChange={handleChange("category")}
                        value={category}
                        className="form-control"
                        id="category"
                        name="category"
                      >
                        <option>Select Here..</option>

                        {categories &&
                          categories.map((c, i) => (
                            <option key={i} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label">Location</label>
                      <input
                        onChange={handleChange("location")}
                        value={location}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label"> Website </label>
                      <input onChange={handleChange("website")}   value={website} type="text" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label">Goal </label>
                      <input
                        onChange={handleChange("pledge")}
                        value={pledge}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label">Return</label>
                      <input
                        onChange={handleChange("returns")}
                        value={returns}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label">Duration</label>
                      <input
                        onChange={handleChange("duration")}
                        value={duration}
                        type="number"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
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
            
            
                <input type="submit"  className="btn btn-success float-right"   value="Submit and continue" />
                
             
                </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div className="container-fluid">{projectForm()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Project;
