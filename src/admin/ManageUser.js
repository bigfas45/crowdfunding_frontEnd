import React, { useState, useEffect, Fragment } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getAllUsers } from "./ApiAdmin";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import moment from "moment";

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();
  let count = 0;

  const loadUsers = () => {
    getAllUsers(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const header = () => {
    return (
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Users</h1>
            </div>
            <div className="col-sm-2">
              <Link
                class="btn btn-block btn-success btn-sm"
                to="/admin/project/create"
              >
                {" "}
                Add User
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const body = () => {
    return (
      <Fragment>
     
        <div class="row">
          <div class="col-12 box-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-2">User - Manage</h4>
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
                    {users.map((u, i) => {
                      count++;
                      return (
                        <Fragment>
                          <tr key={i}>
                            <td>{count} </td>
                            <td>
                              <a>{u.firstname}</a>
                              <br />
                              <small> {moment(u.createdAt).format("LL")}</small>
                            </td>
                            <td>{u.role === 0 ? "Client" : "Admin"} </td>
                            <td>
                              {u.userType === 0 ? "Issuers" : "Investor"}{" "}
                            </td>
                            <td>{u.email} </td>
                            <td className="project-state">{u.telephone}</td>
                            <td className="project-actions text-right">
                              <Link
                                className="btn btn-info btn-sm"
                                to={`/admin/user/update/${u._id}`}
                              >
                                <i className="fas fa-pencil-alt"></i>
                                Edit
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
                to={`/admin/user/create`}
              >
                {" "}
                <button type="button" class="btn btn-outline-primary mb-2 mr-2">
                  Add User
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

export default ManageUser;
