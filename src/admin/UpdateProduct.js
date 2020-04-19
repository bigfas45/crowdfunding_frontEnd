import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { updateProject, getCategories, getProject } from "./ApiAdmin";
import { Link, Redirect } from "react-router-dom";
import {API} from '../config';
import ReactHtmlParser from 'react-html-parser';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';





const UpdateAnnualReport = ({match}) => {
  const [values, setValues] = useState({
    title: "",
    description:"",
    pledge: "",
    categories: [],
    category:"",
    location: "",
    website: "",
    returns: "",
    userId: "",
    duration:"",
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
    pledge, 
    categories, 
    category, 
    location, 
    website, 
    returns,
    userId, 
    duration,
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
    getProject(projectId).then(data => {
          if(data.error){
                setValues({...values, error: data.error})
          }else{
            // populate the state
            setValues({...values, 
                title: data.title, 
                description: data.description, 
                pledge: data.pledge,
                category: data.category.name,
                location: data.location,
                website: data.website,
                status: data.status,
                returns: data.returns,
                userId: data.userId.firstname,
                duration: data.duration,
                 formData: new FormData()})
            // load security
            initCategories()
          }
      })
  }

  // load security and set FormData

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({...values, error:data.error})
      }else{
        setValues({categories: data, formData: new FormData() })
      }
    })
  }

  useEffect(() => {
    init(match.params.projectId);
  }, []);

  const handleChange = name => event => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleOnChange = (e, editor) => {
    console.log("description", description)
    // const descriptionData = editor.getData()
    // editor.setData(description);

    // formData.append('description', descriptionData);
  
  }

  const clickSubmit = event => {
    //
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProject(match.params.projectId, user._id, token, formData).then(data => {
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
            return <Redirect to="/admin/project/manage" />
        }
    }
  
}
  


  const projectFrom = () => {
    return (
      <Fragment>
        <section className="content">
        <form className="mb-3" onSubmit={clickSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">General</h3>

                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
            

                <div className="card-body">
                  <div className="form-group">
                    <label >Project Name</label>
                    <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Enter category Name" />
                </div>

                <div className="form-group">
                    <label for="inputDescription">Project Description</label>
                    <textarea
                    onChange={handleChange('description')}
                      id="inputDescription"
                      className="form-control"
                      rows="4"
                      value={description}
                    ></textarea>
                  </div>


                  <div className="form-group">
                    <label for="inputStatus">Category</label>
                <select  onChange={handleChange('category')} className="form-control custom-select"   >
                      
                      <option>{category}</option>
                      {categories && categories.map((c, i) => (
                        <option key={i} value={c._id}>{c.name}</option>))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label   for="inputClientCompany" >Location</label>
                    <input
                    onChange={handleChange('location')}
                      type="text"
                      id="inputClientCompany"
                      className="form-control"
                      value={location}
                    />
                  </div>
                  <div className="form-group">
                    <label   for="inputProjectLeader" >Website</label>
                    <input
                    onChange={handleChange('website')}
                      type="text"
                      id="inputProjectLeader"
                      className="form-control"
                      value={website}
                    />
                  </div>
              </div>
            </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Budgeted Pledge</h3>

                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      data-toggle="tooltip"
                      title="Collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label for="inputEstimatedBudget">Estimated Pledge</label>
                    <input
                     onChange={handleChange('pledge')}
                      type="number"
                      id="inputEstimatedBudget"
                      className="form-control"
                      value={pledge}
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputSpentBudget">Estimated Pledge returns</label>
                    <input
                      onChange={handleChange('returns')}
                      type="number"
                      id="inputSpentBudget"
                      className="form-control"
                      value={returns}
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputEstimatedDuration">
                      Estimated Pledge duration
                    </label>
                    <input
                      onChange={handleChange('duration')}
                      type="number"
                      id="inputEstimatedDuration"
                      className="form-control"
                      value={duration}
                    />
                  </div>
                  <div className="form-group">
                    <label for="inputStatus">User</label>
                    <select  onChange={handleChange('userId')} className="form-control custom-select" >
                      
                      <option>{userId}</option>
                   
                        <option value={user._id}>{user.firstname}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="inputStatus">Status</label>
                    <select  onChange={handleChange('status')} className="form-control custom-select" >
                      
                      <option>{getStatus(status)}</option>
                   
                        <option value="0">Inactivate</option>
                        <option value="1">Activate</option>
                    </select>
                  </div>


                  <div class="form-group">
                    <label for="exampleInputFile">Project Image</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input  onChange={handleChange('image')} type="file" class="custom-file-input" accept="image/*" />
                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                     </div>
                     
                    </div>
                  </div>

                  <div className="col-sm-6 product-img" > 
                        <img src={`${API}/project/image/${match.params.projectId}`} alt={title} style={{maxWidth:'100%', maxWidth: '100%'}} class="img-fluid mb-2" />
                    </div>
                  
                </div>
                
              </div>
               
          <div className="row">
            <div className="col-12">
              <Link to="/admin/project/manage" className="btn btn-secondary">
                Cancel
              </Link>
              <input
                type="submit"
                value="Update"
                className="btn btn-success float-right"
              />
            </div>
          
          </div>
            </div>
          </div>
          
        
          </form>
        </section>
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
    return(
      <Fragment>
          <div class="card-body pad table-responsive">
           
           <Link class="btn btn-success" to={`/admin/project/gallery/${match.params.projectId}`}>Gallery</Link> 
           <Link class="btn btn-info" to="">Document</Link>
           <Link class="btn btn-warning" to="">Warning</Link>
           <Link class="btn btn-danger" to="">Delete</Link>
          </div>
      </Fragment>

    )
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
     <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
          {projectHeaderForm()}
          {tableOptions()}
     {projectFrom()}
   {redirectUser()}
     </div>
    </Fragment>
  );
};

export default UpdateAnnualReport;
