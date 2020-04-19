import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { createGallery, getProjects } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";


const Project = () => {
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


    const init = () => {
        getProjects().then(data => {
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
        init();
       
     }, []);


 


  const handleChange = name => event => {
    const value = name  === 'file' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
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


    <div class="alert alert-success alert-dismissible" style={{display: createdProduct ? '' : 'none'}}>
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
  


const Form = () => {
    return(
        <Fragment>
             <section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="  col-sm-6">
        <h1>Project Gallery Form</h1>
        {showSuccess()}
        {showError()}
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item active">Category Form</li>
        </ol>
      </div>
    </div>
  </div>
</section>
            <section className="content">
  <div className="container-fluid">
    <div className="row">
 
      <div className="offset-3 col-md-6">
    
        <div className="card card-primary">
          <div className="card-header">
        
            <h3 className="card-title">Category</h3>
          </div>
        
          <form role="form" onSubmit={clickSubmit}>
            <div className="card-body">
            <div className="form-group">
                    <label for="inputStatus">Project</label>
                    <select  onChange={handleChange('project')} className="form-control custom-select" value={project}>
                      
                      <option>Pleae select</option>
                      {projects && projects.map((p, i) => (
                        <option key={i} value={p._id}>{p.title}</option>))}
                    </select>
                  </div>

                  <div class="form-group">
                    <label for="exampleInputFile">Project Image</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input  onChange={handleChange('file')} type="file" class="custom-file-input" accept="image/*" />
                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                     </div>
                     
                    </div>
                  </div>
              
           
            </div>
          

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
        </div>



        </div>
        </div>
        </section>
        </Fragment>
    )
}


  


  return (
    <Fragment>
      <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
    {Form()}
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default Project;
