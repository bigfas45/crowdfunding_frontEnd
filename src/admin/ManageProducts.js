import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {getProjects, deleteProduct} from './ApiAdmin'
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import moment from 'moment';
import Menu from "./Menu";




const ManageProducts = () => {
    const [projects, setProjects] = useState([]);

    const {user, token} = isAuthenticated();
    let count =0;

    const loadProject = () => {
        getProjects().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setProjects(data)
            }
        })
    }

    useEffect(() => {
        loadProject()
    }, [])



const header = () => {
    return(
        <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Projects</h1>
            </div>
            <div className="col-sm-2">
           
            <Link class="btn btn-block btn-success btn-sm" to="/admin/project/create"> Add  Project </Link>
               
            </div>
          </div>
        </div>
      </section>
  
    )
}

const tableOptions = () => {
  return (
    <Fragment>
      <div className="col-lg-6 height-card box-margin">
        <div className="card">
          <div className="card-body">
            <Link
              to={`/admin/project/create`}
            >
              {" "}
              <button type="button" class="btn btn-outline-primary mb-2 mr-2">
                Add project
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


const body = () => {
    return (
      <Fragment>
          <div class="container-fluid mt-n10">
        <div class="row">
          <div class="col-12 box-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-2">Project - Manage</h4>
                <p class="text-muted font-13 mb-4">
                  This example shows the DataTables table body scrolling in the
                  vertical direction. This can generally be seen as an
                  alternative method to pagination for displaying a large table
                  in a fairly small vertical area, and as such pagination has
                  been disabled here (note that this is not mandatory, it will
                  work just fine with pagination enabled as well!).
                </p>

                <table
                  id="scroll-vertical-datatable"
                  class="table dt-responsive nowrap"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Goal</th>
                      <th>Duration</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {projects.map((p, i) => {
                      count++;
                      return (
                        <Fragment>
                          <tr key={i}>
                            <td>{count}</td>
                            <td>
                              {p.title}
                              <br />
                              <small>{moment(p.createdAt).format("LL")}</small>
                            </td>
                            <td>
                              {p.pledge.toLocaleString(navigator.language, {
                                minimumFractionDigits: 0
                              })}
                            </td>
                            <td>{p.duration}</td>
                            <td>{p.category.name}</td>
                            <td>{getStatus(p.status)}</td>
                            <td>
                              {" "}
                              <Link
                                className="btn btn-info btn-sm"
                                to={`/admin/project/update/${p._id}`}
                              >
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                              </Link>
                                <span className="ml-1"></span>
                              <Link
                                className="btn btn-info btn-sm"
                                to={`/admin/project/gallery/create/${p._id}`}
                              >
                                <i className="fas fa-pencil-alt"></i>
                                Gallery
                              </Link>
                              <span className="ml-1"></span>

                              <Link  className="btn btn-info btn-sm"
                                                                    to={
                                                                        `/admin/project/payment/${
                                                                            p._id
                                                                        }`
                                                                }>
                                                                        <i class="btn btn-primary md-trigger mr-2 mb-2" data-modal="modal-1" class="fa fa-credit-card-alt"></i>
                                                                   Funds
                                                                    </Link>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Fragment>
    );
}

const getStatus = (status) => {
    if (status ===0) {
        return <span className="badge badge-danger">Inactive</span>  
    } if (status ===1) {
        return <span className="badge badge-success">Active</span> 
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
                      <span>Project </span>
                  </h1>
                  <div class="page-header-subtitle">Manage your project here!</div>
              </div>
          </div>
      </div>
  </Fragment>)
}



return(
  <Fragment>
    <Header/>
    <div id="layoutSidenav">
        <Menu/>
        <div id="layoutSidenav_content">

            <main> {
                contentHeader()
            }

                {
                body()
            } </main>
            {
            footer()
        } </div>
    </div>
</Fragment>
)

}

export default ManageProducts