import React, { Fragment,  useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import {  isAuthenticated } from "../auth";
import { updateCategory, readCategories } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";






const UpdateCategory = ({match}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  let count =0;

      const { user, token } = isAuthenticated();

      const init = (catId) => {
        readCategories(catId).then(data => {
            if (data.error) {
               setError(data.error)
            }else{
                setName(data.name)
            }
        });
    };


   

    useEffect(() => {
      init(match.params.catId);
  }, []);

      const handleChange = e => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = e => {
      e.preventDefault();
      setError('');
      setSuccess(false);
      // make request to create category
      updateCategory(user._id, match.params.catId, token , {name})
      .then(data =>{
          if (data.error) {
              setError(true);
          }else{
              setError('');
              setSuccess(true);
              setRedirect(true);
          }
      });

  };
    
    const showSuccess = () => {
        if (success) {
        return (
            <div
            class="alert alert-success"
            role="alert"
            style={{ display: success ? "" : "none" }}
          >
            {name} is created
    
          </div>)
        }
    }


    const redirectUser = () => {
        if (redirect) {
            if (!error) {
                return <Redirect to="/admin/category/create" />;
            }
        }
    }

    const showError = () => {
        if (error) {
        return (
            <div
            class="alert alert-danger"
            role="alert"
            style={{ display: error ? "" : "none" }}
          >
          {name}  should be unique
    
          </div>
        )
        }
    };

    
const showLoading = () => (

    loading && ( 
        <div>
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
        </div>
       
    )

    
);


    const categoryForm = () => {
        return(
            <Fragment>
                 <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="  col-sm-6">
            <h1>Category Form</h1>
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
                  {showError()}
       {showSuccess()}
       {showLoading()}
                    <label for="exampleInputEmail1">Category</label>
                    <input onChange={handleChange} value={name} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter category Name" />
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




    return(
        <Fragment>
         <Header></Header>
    <Aside></Aside>
        <div className="content-wrapper">
       
     {  categoryForm()}
     {redirectUser()}
        </div>
        </Fragment>
    )


}


export default UpdateCategory 