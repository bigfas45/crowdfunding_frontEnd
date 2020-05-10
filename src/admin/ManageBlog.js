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

  return (
    <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div className="container-fluid">
            {tableOptions()}   {body()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageBlog;
