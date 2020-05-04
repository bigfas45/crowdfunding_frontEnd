import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {isAuthenticated} from "../auth";
import {createDocument, getProjects, getProjectDocument} from "./ApiIssuer";
import {Spinner, Button} from "reactstrap";
import {Link, Redirect} from "react-router-dom";
import Footer from "./Footer";
import {API} from '../config';


const Project = ({match}) => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        projects: [],
        project: '',
        file: '',
        name: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        projects,
        name,
        project,
        file,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;


    const init = (projectId) => {
        getProjectDocument(projectId).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({
                    ...values,
                    projects: data,
                    formData: new FormData()
                });
            }
        });
    };


    useEffect(() => {
        init(match.params.projectId);

    }, []);


    const handleChange = name => event => {
        const value = name === 'file' ? event.target.files[0] : event.target.value;
        formData.set(name, value);

        formData.append('project', match.params.projectId);
        setValues({
            ...values,
            error: '',
            [name]: value
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error: '',
            loading: true
        });

        createDocument(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                })
            } else {
                setValues({
                    ...values,
                    project: '',
                    file: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        })


    };

    const showSuccess = () => (
        <div style={
                {
                    display: createdProduct ? '' : 'none'
                }
            }
            class="alert alert-success alert-dismissible bg-success text-white border-0 fade show"
            role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>Success -
            </strong>
            oject is created.!
        </div>
    );

    const showError = () => (
        <div style={
                {
                    display: error ? '' : 'none'
                }
            }
            class="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show"
            role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>Error -
            </strong>
           {error}
        </div>
    );


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


    const Form = () => {
        return (
            <Fragment>
                <div class="col-6">
                    <div class="card box-margin">
                        <form role="form"
                            onSubmit={clickSubmit}>
                            <div class="card-body">
                                {
                                showSuccess()
                            }
                                {
                                showError()
                            }
                            {showLoading()}
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label className="control-label">Document Name</label>
                                        <input onChange={
                                                handleChange("name")
                                            }
                                            value={name}
                                            type="text"
                                            className="form-control"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <i class="fa fa-upload"></i>
                                        <label for="exampleInputFile">File input</label>

                                        <input onChange={
                                                handleChange('file')
                                            }
                                            type="file"
                                            class="form-control-file"
                                            id="exampleInputFile"
                                            aria-describedby="fileHelp"/>

                                    </div>
                                </div>


                            </div>
                            <div className="card-footer">
                             
            {loading && loading ? (<Button className="btn btn-danger" variant="success" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>) : ( <input type="submit"  className="btn btn-success"   value="Submit" />)}
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }


    const document = () => {
        return (
            <Fragment>
               <div class="col-xl-6 height-card box-margin">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="bg-transparent d-flex align-items-center justify-content-between">
                                                    <div class="widgets-card-title">
                                                        <h5 class="card-title">Recent files</h5>
                                                    </div>
                                                    <div class="dashboard-dropdown">
                                                        <div class="dropdown">
                                                            <button class="btn dropdown-toggle" type="button" id="dashboardDropdown50" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ti-more"></i></button>
                                                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dashboardDropdown50">
                                                                <a class="dropdown-item" href="#"><i class="ti-pencil-alt"></i> Edit</a>
                                                                <a class="dropdown-item" href="#"><i class="ti-settings"></i> Settings</a>
                                                                <a class="dropdown-item" href="#"><i class="ti-eraser"></i> Remove</a>
                                                                <a class="dropdown-item" href="#"><i class="ti-trash"></i> Delete</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                              {projects.map((d, i) => {
                                                return(
                                                  <Fragment>
                                                      <div key={i} class="widget-download-file d-flex align-items-center justify-content-between mb-4">
                                                    <div class="d-flex align-items-center mr-3">
                                                        <div class="download-file-icon mr-3">
                                                            <img src="img/filemanager-img/1.png" alt=""/>
                                                        </div>
                                                        <div class="user-text-table">
                                                            <h6 class="d-inline-block font-15 mb-0">{d.name}</h6>
                                                            <p class="mb-0">{d.project.title}</p>
                                                        </div>
                                                    </div>
                                                    <a href={`${API}/document/file/${d._id}`} alt={d.project.title} class="download-link badge badge-primary badge-pill">Download</a>
                                                </div>
                                                  </Fragment>
                                                )
                                              })}
                                                

                                              

                                              

                                              
                                            </div>
                                        </div>
                                    </div>
                               
                            

            </Fragment>
        )
    }


    return (
        <Fragment>
            <div className="ecaps-page-wrapper">
                <Aside></Aside>
                <div className="ecaps-page-content">
                    <Header></Header>
                    <div className="main-content">
                        <div className="container-fluid">
                        <div class="row">
                            {  Form() }
                            {document() }
                            </div>
                             </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Project;
