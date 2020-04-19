import React, { Fragment,  useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

import {  isAuthenticated } from "../auth";
import { createCategory, getCategories } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";






const Category = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  let count =0;

      const { user, token } = isAuthenticated();

      const init = () => {
        getCategories().then(data => {
            if (data.error) {
               setError(data.error)
            }else{
              setCategory(data)
            }
        });
    };


   

    useEffect(() => {
      init();
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
      createCategory(user._id, token , {name})
      .then(data =>{
          if (data.error) {
              setError(true);
          }else{
              setError('');
              setSuccess(true);
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

    const goBack = () => (
      <div className="mt-5">
          <Link to="/admin/dashboard" className="text-warning">Back to Dashboard</Link>
      </div>
    )

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
     
          <div className=" col-md-6">
        
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

{/* category Table */}
            <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Category List Table</h3>

              </div>
              <div class="card-body p-0">
                <table class="table">
                  <thead>
                    <tr>
                      <th style={{width: "10%"}}>#</th>
                      <th>Task</th>
                      <th></th>
                      <th style={{width: "40%"}}>Label</th>
                    </tr>
                  </thead>
                  <tbody>
            {category.map((c,i) => {
              count++
              return(
                <tr key={i}>
                  <td>{count}</td>
                  <td>{c.name}</td>
                  <td> </td>
                  <td><span  class="badge bg-danger"> <Link to={`/category/${c._id}`}>Update</Link> </span></td>
                </tr>
              )
            })}
                   
                
               
                  </tbody>
                </table>
              </div>
            </div>
            </div>

            </div>
            </div>
            </section>
            </Fragment>
        )
    }


    const categoryTable = () => {
      return(
        <Fragment>
         
        </Fragment>
      )
    }


    return(
        <Fragment>
         <Header></Header>
    <Aside></Aside>
        <div className="content-wrapper">
       
     {  categoryForm()}
        </div>
        <Footer></Footer>
        </Fragment>
    )


}


export default Category 