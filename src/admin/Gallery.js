import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { createGallery, getProjects, getProjectGallery } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import {API} from '../config';
import Menu from "./Menu";



const Project = ({match}) => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        projects: [],
        project: '',
        file:'',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        projects, project, file, loading,error, createdProduct, redirectToProfile, formData
    } = values;


    const init = (projectId) => {
      getProjectGallery(projectId).then(data => {
        if (data.error) {
          setValues({...values, error: data.error})
        }else{
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
    const value = name  === 'file' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
   
    formData.append('project', match.params.projectId);
    setValues({...values,  error: '', [name]: value});
};

const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: '', loading: true});

    createGallery(user._id, token, formData )
    .then(data => {
        if (data.error) {
            setValues({...values, error:data.error})
        }else{
            setValues({
                ...values, project: '', file:'', loading: false, createdProduct: data.project
            });
        }
    })


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


const Form = () => {
    return (
      <Fragment>
            <div class="container-fluid mt-n10">
        <div class="col-12">
          <div class="card box-margin">
          <form role="form" onSubmit={clickSubmit}>
            <div class="card-body">
          {showSuccess()}
          {showError()}
              <div>
              <label for="file-1">
                  <i class="fa fa-upload"></i>
                  <label for="exampleInputFile">File input</label>
                </label>
              <input onChange={handleChange('file')} type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp"/>
               
              </div>
            
             
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
          </div>
        </div>
        </div>
      </Fragment>
    );
}


const imageGallery = () => {
  return(
    <Fragment>
    <div class="col-12 box-margin">
                            <div class="card">
                                <div class="card-body pb-0">
                                    <h5 class="card-title">Image Gallery</h5>
                                    <div class="row">
                                    { projects.map((g, i) => {
                                      return(
                                        <div class="col-sm-6 col-xl-3">
                                            <a href={`${API}/gallery/file/${g._id}`} data-toggle="lightbox" data-gallery="example-gallery"><img src={`${API}/gallery/file/${g._id}`} alt={g.project.title} class="img-fluid mb-30" /></a>
                                        </div>
                                         )
                                        })}

                                    </div>
                                </div>
                            </div>
                        </div>
                 
              </Fragment>
  )
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
                      <span>Gallery </span>
                  </h1>
                  <div class="page-header-subtitle">Manage your gallery here!</div>
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

            <main>  
            {
                contentHeader()
            }
               {Form()}
              {imageGallery()} 
              </main>
            {
            footer()
        } </div>
    </div>
    </Fragment>
  );
};

export default Project;
