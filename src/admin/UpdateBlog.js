import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { updateBlog, getBlog, getBlogRead } from "./ApiAdmin";
import { Link, Redirect } from "react-router-dom";
import {API} from '../config';
import ReactHtmlParser from 'react-html-parser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import { Spinner, Button } from "reactstrap";





const UpdateBlog = ({match}) => {

const [dataGet, setData] = useState([]);

let des

  const [values, setValues] = useState({
    title: "",
    description:"",
    userId: "",
    status: 0,
    image:"",
    loading: false,
    error: "",
    createdReport: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    title,
    description,
    userId, 
    status,
    image,
    loading,
    error,
    createdReport,
    redirectToProfile,
    formData
  } = values;

  const { user, token } = isAuthenticated();

  const init = (projectId) => {
    getBlog(projectId).then(data => {
          if(data.error){
                setValues({...values, error: data.error})
          }else{
            // populate the state
            setValues({...values, 
                title: data.title, 
                description: data.description, 
                status: data.status,
                userId: data.userId,
                 formData: new FormData()})
            // load security
         
          }
      })
  }

  // load security and set FormData

  

  const initRead = (blogId) => {
    getBlogRead(blogId).then(data => {
      if (data.error) {
        setValues({...values, error:data.error})
      }else{
       setData(data)
      }
    })
  }

  useEffect(() => {
    init(match.params.blogId);
    initRead(match.params.blogId)
  }, []);

  const processProduct = () => {
   dataGet.map((p, i) => {
    des = p.description
   })
  }

  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleOnChange = (e, editor) => {
    const descriptionData = editor.getData();
    formData.append("description", descriptionData);
  };


  const clickSubmit = event => {
    //
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateBlog(match.params.blogId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
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


    <div class="alert alert-success alert-dismissible" style={{display: createdReport ? '' : 'none'}}>
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <h5><i class="icon fas fa-check"></i> Alert!</h5>
    <span><strong>Success!</strong>  Project is updated. </span>
  </div>


);

  const showError = () => (

    <div class="alert alert-danger alert-dismissible" style={{display: error ? '' : 'none'}}>
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                  <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                  <span><strong>Error!</strong>   {error}</span>
                </div>
);

const redirectUser = () => {

    if (redirectToProfile) {
        if (!error) {
            return <Redirect to="/admin/blog/manage" />
        }
    }
  
}
  


  const projectForm = () => {
    return (
      <Fragment>
        <div className="col-12 box-margin height-card">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title mb-30">Update Blog</h6>
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
                      <label htmlFor="inputDescription">
                        Project Description
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        name="description"
                        
                        onChange={handleOnChange}
                        data={` ${des} ` }
                      />
                    </div>
                  </div>

                  <div className="col-sm-4">
                    <div className="form-group">
                      <label className="control-label"> Status </label>
                      <select  onChange={handleChange('status')} className="form-control custom-select" >
                      
                      <option>{getStatus(status)}</option>
                   
                        <option value="0">Inactivate</option>
                        <option value="1">Activate</option>
                    </select>
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
                    <div class="col-12 col-md-6 col-lg-4 single_gallery_item development branding">
                      <div class="gallery-content">
                        <img src={`${API}/blog/image/${match.params.blogId}`} alt={title} />
                        <div class="gallery-hover-overlay d-flex justify-content-between">
                          <div class="port-more-view">
                            <div class="port-text  mb-30">
                              <p class="text-white mb-0">Magazine </p>
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
                {showSuccess()}
                {showError()}
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
              <Link
                to={`/admin/project/gallery/create/${match.params.projectId}`}
              >
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
    if (status ===0) {
        return `Inactive  `
    } if (status ===1) {
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
             {tableOptions()} {processProduct()} {projectForm()} {redirectUser()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateBlog;
