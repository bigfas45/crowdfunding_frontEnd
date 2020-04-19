import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { createProject, getCategories } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Project = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        title: '',
        description: '',
        pledge: '',
        categories: [],
        category:'',
        location: '',
        website: '',
        returns: '',
        userId: '',
        duration:'',
        image:'',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        title, description,pledge, categories, category, location, website, returns,userId, duration,image, loading,error, createdProduct, redirectToProfile, formData
    } = values;

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            }else{
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
            return <Redirect to="/admin/manage/annualreport" />
        }
    }
  
}




  const handleChange = name => (event) => {
    

    const value = name  === 'image'  ? event.target.files[0] : event.target.value;
 
    formData.set(name, value);

    setValues({...values,error: '', [name]: value});
};

const handleOnChange = (e, editor) => {
  const descriptionData = editor.getData()
  formData.append('description', descriptionData);

}



const clickSubmit = event => {
    event.preventDefault();
    setValues({...values, error: '', loading: true});

    createProject(user._id, token, formData )
    .then(data => {
        if (data.error) {
            setValues({...values, error:data.error})
        }else{
            setValues({
                ...values, title: '', description: '', pledge: '', location: '', website: '', returns:'', category:'', duration:'', image:'',  userId:'',   loading: false,
                error: false,createdProduct: data.title
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
                    <label for="inputName">Project Name</label>
                    <input  onChange={handleChange('title')} type="text" id="inputName" className="form-control" value={title} />
                  </div>
                  {/* <div className="form-group">
                    <label for="inputDescription">Project Description</label>
                    <textarea
                    onChange={handleChange('description')}
                      id="inputDescription"
                      className="form-control"
                      rows="4"
                      value={description}
                    ></textarea>
                  </div> */}

                <div className="form-group">      
                    <label for="inputDescription">Project Description</label>
                   <CKEditor 
                   editor={ClassicEditor}
                     name="description"
                   onChange={handleOnChange}
                 
                   />



                  </div>





                  <div className="form-group">
                    <label for="inputStatus">Category</label>
                    <select  onChange={handleChange('category')} className="form-control custom-select" value={category}>
                      
                      <option>Pleae select</option>
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
                    <select  onChange={handleChange('userId')} className="form-control custom-select" value={userId}>
                      
                      <option>Pleae select</option>
                   
                        <option value={user._id}>{user.firstname}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputFile">Project Image</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input  onChange={handleChange('image')} type="file" class="custom-file-input" />
                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                     </div>
                     
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Link href="#" className="btn btn-secondary">
                Cancel
              </Link>
              <input
                type="submit"
                value="Create new Porject"
                className="btn btn-success float-right"
              />
            </div>
          
          </div>
          </form>
        </section>
      </Fragment>
    );
  };



  return (
    <Fragment>
      <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
        {projectHeaderForm()}
        {projectFrom()}
      </div>
      <Footer></Footer>
    </Fragment>
  );
};

export default Project;
