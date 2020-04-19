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
        <section className="content">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Projects</h3>

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
                <button
                  type="button"
                  className="btn btn-tool"
                  data-card-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div className="card-body p-0">
              <table className="table table-striped projects">
                <thead>
                  <tr>
                    <th style={{ width: "1%" }}>#</th>
                    <th style={{ width: "20%" }}>User Name</th>
                    <th >Role</th>
                    <th>User Type</th>
                    <th>Email</th>
                    <th>
                      Telephone
                    </th>
                    <th style={{ width: "20%" }}></th>
                  </tr>
                </thead>
                <tbody>
                    {users.map((u,i) => {
                        count++
                        return(
                            <Fragment>
                                <tr key={i}>
                                    <td>{count} </td>
                                    <td>
                                        <a>{u.firstname }</a>
                                        <br />
                                        <small>   {moment(u.createdAt).format('LL')}</small>
                                    </td>
                                    <td>{u.role ===0 ? 'Client' : 'Admin'} </td>
                                    <td>{u.userType ===0 ? 'Issuers' : 'Investor'} </td>
                                    <td>{u.email} </td>
                                     <td className="project-state">{u.telephone}</td>
                                    <td className="project-actions text-right">
                                        <Link className="btn btn-info btn-sm" to={`/admin/user/update/${u._id}`}>
                                        <i className="fas fa-pencil-alt"></i>
                                        Edit
                                        </Link>
                                    </td>
                                </tr>
                            </Fragment>
                        )
                    })}
                
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
        {header()}
        {body()}
      </div>
    </Fragment>
  );
};

export default ManageUser;
