import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getAllBlogs } from "./ApiAdmin";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import moment from "moment";
import WordLimit from 'react-word-limit';
import Menu from "./Menu";


const ManageBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const { user, token } = isAuthenticated();
  let count = 0;

  const loadBlog = () => {
    getAllBlogs().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadBlog();
  }, []);

 

  const body = () => {
    return (
      <Fragment>
       <div class="container-fluid mt-n10">
        <div class="row">
          <div class="col-12 box-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-2">Blog - Manage</h4>
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
                  class="table dt-responsive wrap"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Decription</th>
                      <th>User</th>
                      <th>Likes</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {blogs.map((u, i) => {
                      count++;
                      return (
                        <Fragment>
                          <tr key={i}>
                            <td>{count} </td>
                            <td>
                              <a>{u.title}</a>
                              <br />
                              <small> {moment(u.createdAt).format("LL")}</small>
                            </td>
                            <td>   </td>
                            <td>
                              {u.userId.firstname}
                            </td>
                            <td>{u.likes} </td>
                            <td>{u.status === 0 ? "Inactive" : "Active"} </td>
                            <td className="project-actions text-right">
                              <a
                                className="btn btn-info btn-sm"
                                href={`/admin/blog/update/${u._id}`}
                              >
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                              </a>
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
  };
  const tableOptions = () => {
    return (
      <Fragment>
        <div className="col-lg-6 height-card box-margin">
          <div className="card">
            <div className="card-body">
              <Link
                to={`/admin/blog/create`}
              >
                {" "}
                <button type="button" class="btn btn-outline-primary mb-2 mr-2">
                  Add Blog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
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
                        <span>Blog </span>
                    </h1>
                    <div class="page-header-subtitle">Manage your Blog here!</div>
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
  
  
};

export default ManageBlog;
