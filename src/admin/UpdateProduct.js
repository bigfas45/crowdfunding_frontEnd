import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {isAuthenticated} from "../auth";
import {updateProject, getCategories, getProject, getProjectRead} from "./ApiAdmin";
import {Link, Redirect} from "react-router-dom";
import {API} from '../config';
import ReactHtmlParser from 'react-html-parser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import Menu from "./Menu";
import {Spinner, Button} from "reactstrap";


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
        status: 0,
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
        status,
        image,
        loading,
        error,
        createdReport,
        redirectToProfile,
        formData
    } = values;

    const {user, token} = isAuthenticated();

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
                    status: data.status,
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


    const showSuccess = () => (<div class="alert alert-success alert-dismissible" style={{display: createdReport ? '' : 'none'}}> < button type = "button" class = "close" data-dismiss = "alert" aria-hidden = "true" >& times;
    </button>
    <h5>
        <i class="icon fas fa-check"></i>
        Alert !
    </h5>
    <span>
        <strong>Success!</strong>
        Project is updated.
    </span>
</div>);

    const showError = () => (<div class="alert alert-danger alert-dismissible"
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
    </div>);

    const redirectUser = () => {

        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/project/manage"/>
            }
        }

    }


    const projectForm = () => {
        return (
          <Fragment>
            <div class="container-fluid mt-n10">
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
                            <label className="control-label">
                              Project Title
                            </label>
                            <input
                              onChange={handleChange('title')}
                              value={title}
                              type="text"
                              className="form-control"
                              placeholder="Enter project title"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="control-label">
                              Project Type
                            </label>
                            <select
                              onChange={handleChange('projectType')}
                              value={projectType}
                              className="form-control"
                              id="category"
                            >
                              <option> {projectType}</option>
                              <option value="Loan">Loan</option>
                              <option value="Equity">Equity</option>
                              <option value="Donations">Donations</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="control-label">Category</label>
                            <select
                              onChange={handleChange('category')}
                              value={category}
                              className="form-control"
                              id="category"
                              name="category"
                            >
                              <option> {category}</option>
                              {categories &&
                                categories.map((c, i) => (
                                  <option key={i} value={c._id}>
                                    {' '}
                                    {c.name}{' '}
                                  </option>
                                ))}{' '}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="control-label">Location</label>
                            <input
                              onChange={handleChange('location')}
                              value={location}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="control-label">Website</label>
                            <input
                              onChange={handleChange('website')}
                              value={website}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="control-label">Status</label>
                            <select
                              onChange={handleChange('status')}
                              className="form-control custom-select"
                            >
                              <option> {getStatus(status)}</option>

                              <option value="0">Inactivate</option>
                              <option value="1">Activate</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="form-group">
                            <label className="control-label">Goal</label>
                            <input
                              onChange={handleChange('pledge')}
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
                              onChange={handleChange('returns')}
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
                              onChange={handleChange('duration')}
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
                            <label htmlFor="inputDescription">
                              Project Description
                            </label>
                            <CKEditor
                              editor={ClassicEditor}
                              name="description"
                              onChange={handleOnChange}
                              data={` ${des} `}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="control-label">
                              Feature Picture
                            </label>
                            <small>
                              (This is the first thing that people will see when
                              they come across your project.)
                            </small>
                            <input
                              onChange={handleChange('image')}
                              required=""
                              type="file"
                              name="file"
                              className="dropify"
                              data-height="300"
                            />
                          </div>
                          <div class="col-12 col-md-6 col-lg-4 single_gallery_item development branding">
                            <div class="gallery-content">
                              <img
                                src={`${API}/project/image/${match.params.projectId}`}
                                alt={title}
                              />
                              <div class="gallery-hover-overlay d-flex justify-content-between">
                                <div class="port-more-view">
                                  <div class="port-text  mb-30">
                                    <p class="text-white mb-0">Magazine</p>
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
                      {loading && loading ? (
                        <Button
                          className="btn btn-danger float-right"
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
                        <input
                          type="submit"
                          className="btn btn-success float-right"
                          value="Update product"
                        />
                      )}{' '}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
    };


    const projectHeaderForm = () => {
        return (<Fragment>
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
                        } </div>
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
        </Fragment>);
    };

    const tableOptions = () => {
        return (<Fragment>
            <div className="col-lg-6 height-card box-margin">
                <div className="card">
                    <div className="card-body">
                        <Link to={
                            `/admin/project/gallery/create/${
                                match.params.projectId
                            }`
                        }> {" "}
                            <button type="button" class="btn btn-outline-primary mb-2 mr-2">
                                Gallery
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>);
    }


    const getStatus = (status) => {
        if (status === 0) {
            return `Inactive  `
        }
        if (status === 1) {
            return `Active `
        }
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
                            <span>Project
                            </span>
                        </h1>
                        <div class="page-header-subtitle">Manage your project here!</div>
                    </div>
                </div>
            </div>
        </Fragment>)
    }


    return (<Fragment>
        <Header/>
        <div id="layoutSidenav">
            <Menu/>
            <div id="layoutSidenav_content">

                <main> {
                    contentHeader()
                }

                    {
                    processProduct()
                }
                    {
                    projectForm()
                }
                    {
                    redirectUser()
                } </main>
                {
                footer()
            } </div>
        </div>
    </Fragment>);
};

export default UpdateAnnualReport;

