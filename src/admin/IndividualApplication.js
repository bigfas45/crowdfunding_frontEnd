import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import { getCategories } from "./ApiAdmin";
import Sidebar from "react-sidebar";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIndividualApplication } from "./ApiAdmin";
import Footer from "./Footer";
import {isAuthenticated} from "../auth";
import moment from 'moment';
import Menu from "./Menu";




const IndividualApplication = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    let count =0;
    const {
        user: {
            _id,
            firstname,
            lastname,
            email,
            role
        }, token
    } = isAuthenticated();
  
    const init = () => {
        getIndividualApplication(_id, token).then(data => {
        if (data.error) {
          setError(data.error);
        } else {
            setData(data);
        }
      });
    };
  
    useEffect(() => {
      init();
    }, []);


    
const body = () => {
    return (
      <Fragment>
           <div class="container-fluid mt-n10">
        <div class="row">
          <div class="col-12 box-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-2">Individual's Application - Manage</h4>
                <p class="text-muted font-13 mb-4">
                  This example shows the DataTables table body scrolling in the
                  vertical direction. This can generally be seen as an
                  alternative method to pagination for displaying a large table
                  in a fairly small vertical area, and as such pagination has
                  been disabled here (note that this is not mandatory, it will
                  work just fine with pagination enabled as well!).
                </p>

                <table
                  class="table dt-responsive nowrap"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                     
                      <th>Occupation</th>
                      <th>Principal Email</th>
                      <th> Telephone</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((d, i) => {
                      count++;
                      return (
                        <Fragment>
                          <tr key={i}>
                            <td>{count}</td>
                            <td> {d.userId.firstname} <br />
                              <small>{moment(d.createdAt).format("LL")}</small></td>
                            <td>   {d.occupation} </td>
                            <td> {d.email} </td>
                            <td> {d.telephone} </td>
                            <td> {d.status} </td>
                            <td>
                                <div class="actions ml-3">
                                    <Link to={`/admin/individual/application/${ d._id }`} class="action-item mr-2" data-toggle="tooltip" title="" data-original-title="Quick view">
                                        <i class="fa fa-external-link"></i>
                                    </Link>
                                </div>
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
                      <span>Individual Application </span>
                  </h1>
                  <div class="page-header-subtitle">Manage your individual application here!</div>
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


export default IndividualApplication
