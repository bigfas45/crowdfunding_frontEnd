import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {isAuthenticated} from "../auth";
import {updateProject, getCategories, getProject, getProjectRead} from "./ApiIssuer";
import {Link, Redirect} from "react-router-dom";
import {API} from '../config';
import ReactHtmlParser from 'react-html-parser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Spinner, Button } from "reactstrap";



const UpdateAnnualReport = ({match}) => {

    const [dataGet, setData] = useState([]);

    let des

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
        createdReport: "",
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
        createdReport,
        redirectToProfile,
        formData
    } = values;

    const {user, token} = isAuthenticated();


    const initCategories = () => {
      getCategories().then(data => {
          if (data.error) {
              setValues({
                  ...values,
                  error: data.error
              })
          } else {
              setValues({categories: data, formData: new FormData()})
          }
      })
  }

    const init = (projectId) => {
        getProject(projectId).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else { // populate the state
                setValues({
                    ...values,
                    title: data.title,
                    description: data.description,
                    pledge: data.pledge,
                    category: data.category.name,
                    location: data.location,
                    website: data.website,
                    returns: data.returns,
                    userId: data.userId,
                    projectType: data.projectType,
                    duration: data.duration,
                    formData: new FormData()
                })
                // load security
                initCategories()

            }
        })
    }

    // load security and set FormData




    const initRead = (projectId) => {
        getProjectRead(projectId).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setData(data)
            }
        })
    }

    useEffect(() => {
        init(match.params.projectId);
        initRead(match.params.projectId)
    }, []);

    const processProduct = () => {
        dataGet.map((p, i) => {
            des = p.description
        })
    }

    const handleChange = name => event => {
        const value = name === "image" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleOnChange = (e, editor) => {
        const descriptionData = editor.getData();
        formData.append("description", descriptionData);
    };


    const clickSubmit = event => { //
        event.preventDefault();
        setValues({
            ...values,
            error: "",
            loading: true
        });

        updateProject(match.params.projectId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    ...values,

                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdReport: data.title
                });
            }
        });
    };


    const showSuccess = () => (


        <div class="alert alert-success alert-dismissible"
            style={
                {
                    display: createdReport ? '' : 'none'
                }
        }>
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <h5>
                <i class="icon fas fa-check"></i>
                Alert!</h5>
            <span>
                <strong>Success!</strong>
                Project is updated.
            </span>
        </div>


    );

    const showError = () => (

        <div class="alert alert-danger alert-dismissible"
            style={
                {
                    display: error ? '' : 'none'
                }
        }>
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <h5>
                <i class="icon fas fa-ban"></i>
                Alert!</h5>
            <span>
                <strong>Error!</strong>
                {error}</span>
        </div>
    );

    const redirectUser = () => {

        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/issuer/project/manage"/>
            }
        }

    }


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


    const projectForm = () => {
        return (
            <Fragment>
                <div className="col-12 box-margin height-card">
                    <div className="card">
                        <div className="card-body">
                            <div class="d-sm-flex justify-content-between">
                                <div class="earning-heading mb-20">
                                    <h6 class="card-title mb-1">Update your project</h6>
                                 
                                </div>
                                <div class="earning-button mb-20">
                                    <Link to={
                                        `/issuer/project/gallery/create/${
                                            match.params.projectId
                                        }`
                                    }>
                                        <button class="btn btn-sm btn-primary">Upload Gallery</button>
                                    </Link>
                                    <Link to={
                                        `/issuer/project/document/create/${
                                            match.params.projectId
                                        }`
                                    }>
                                    <button class="btn btn-sm btn-danger">Upload Documents</button>
                                    </Link>
                                </div>
                            </div>
                            {
                            showSuccess()
                        }
                            {
                            showError()
                        }
                          {showLoading()}
                            <form onSubmit={clickSubmit}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label className="control-label">Project Title</label>
                                            <input onChange={
                                                    handleChange("title")
                                                }
                                                value={title}
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter project title"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Project Type</label>
                                            <select onChange={
                                                    handleChange("projectType")
                                                }
                                                value={projectType}
                                                className="form-control"
                                                id="category">
                                                <option>{projectType}</option>
                                                <option value="Loan">Loan</option>
                                                <option value="Equity">Equity</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Category</label>
                                            <select onChange={
                                                    handleChange("category")
                                                }
                                                value={category}
                                                className="form-control"
                                                id="category"
                                               >
                                                <option>{category}</option>

                                                {
                                                categories && categories.map((c, i) => (
                                                    <option key={i} value={ c._id }> { c.name  } </option>
                                                ))
                                            } </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Location</label>
                                            <input onChange={
                                                    handleChange("location")
                                                }
                                                value={location}
                                                type="text"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">
                                                Website
                                            </label>
                                            <input onChange={
                                                    handleChange("website")
                                                }
                                                value={website}
                                                type="text"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                 
                                </div>
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="control-label">Goal
                                            </label>
                                            <input onChange={
                                                    handleChange("pledge")
                                                }
                                                value={pledge}
                                                type="number"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="control-label">Return</label>
                                            <input onChange={
                                                    handleChange("returns")
                                                }
                                                value={returns}
                                                type="number"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label className="control-label">Duration</label>
                                            <input onChange={
                                                    handleChange("duration")
                                                }
                                                value={duration}
                                                type="number"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label htmlFor="inputDescription">
                                                Project Description
                                            </label>
                                            <CKEditor editor={ClassicEditor}
                                                name="description"
                                                onChange={handleOnChange}
                                                data={
                                                    ` ${des} `
                                                }/>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="control-label">Feature Picture</label>
                                            <small>
                                                (This is the first thing that people will see when they
                                                                        come across your project.)
                                            </small>
                                            <input onChange={
                                                    handleChange("image")
                                                }
                                                required=""
                                                type="file"
                                                name="file"
                                                className="dropify"
                                                data-height="300"/>
                                        </div>
                                        <div class="col-12 col-md-6 col-lg-4 single_gallery_item development branding">
                                            <div class="gallery-content">
                                                <img src={
                                                        `${API}/project/image/${
                                                            match.params.projectId
                                                        }`
                                                    }
                                                    alt={title}/>
                                                <div class="gallery-hover-overlay d-flex justify-content-between">
                                                    <div class="port-more-view">
                                                        <div class="port-text  mb-30">
                                                            <p class="text-white mb-0">Magazine
                                                            </p>
                                                            <h4>
                                                                <a href="#" class="text-white">
                                                                    Responsive Template
                                                                </a>
                                                            </h4>
                                                        </div>
                                                        <div class="port-icon">
                                                            <a href="#" class="gallery_icon">
                                                                <i class="fa fa-plus"></i>
                                                            </a>
                                                            <a href="#">
                                                                <i class="fa fa-link"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
            </Fragment>
        );
    };


    const projectHeaderForm = () => {
        return (
            <Fragment>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Project Add</h1>
                                {
                                showSuccess()
                            }
                                {
                                showError()
                            } 
                          
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link href="#">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Project Add</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    };

    const tableOptions = () => {
        return (
            <Fragment>
                <div className="col-lg-6 height-card box-margin">
                    <div className="card">
                        <div className="card-body">
                            <Link to={
                                `/admin/project/gallery/create/${
                                    match.params.projectId
                                }`
                            }>
                                {" "}
                                <button type="button" class="btn btn-outline-primary mb-2 mr-2">
                                    Gallery
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }


    const getStatus = (status) => {
        if (status === 0) {
            return `Inactive  `
        }
        if (status === 1) {
            return `Active `
        }
    }


    return (
        <Fragment>
            <div className="ecaps-page-wrapper">
                <Aside></Aside>
                <div className="ecaps-page-content">
                    <Header></Header>
                    <div className="main-content">
                        <div className="container-fluid">
                            {
                            processProduct()
                        }
                            {
                            projectForm()
                        }
                            {
                            redirectUser()
                        } </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateAnnualReport;

