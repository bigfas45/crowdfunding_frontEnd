import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import { getCategories } from "./ApiAdmin";
import Sidebar from "react-sidebar";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIssuerApplication } from "./ApiAdmin";
import Footer from "./Footer";
import {isAuthenticated} from "../auth";
import moment from 'moment';



const IssuerApplication = () => {
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
        getIssuerApplication(_id, token).then(data => {
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
        <div class="row">
          <div class="col-12 box-margin">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title mb-2">Issuer's Application - Manage</h4>
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
                      <th>Company Name</th>
                      <th>Security Type</th>
                      <th>Principal Email</th>
                      <th>Principal Telephone</th>
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
                            <td> 
                            <br />
                              <small>{moment(d.createdAt).format("LL")}</small>
                             </td>
                            <td>  {d.companyname} </td>
                            <td>   {d.typeofsecurity} </td>
                            <td> {d.principallOfficerEmail} </td>
                            <td> {d.principalOfficerPhonenumber} </td>
                            <td> {d.status} </td>
                            <td>
                                <div class="actions ml-3">
                                    <Link to={`/admin/issuer/application/${ d._id }`} class="action-item mr-2" data-toggle="tooltip" title="" data-original-title="Quick view">
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
      </Fragment>
    );
}

return(
   
        <Fragment>
          <div className="ecaps-page-wrapper">
            <Aside></Aside>
            <div className="ecaps-page-content">
            <Header></Header>
            <div className="main-content">
            <div class="container-fluid">
                {body()}
            </div>
            </div>
          
            </div>
          </div>
        </Fragment>
)



}


export default IssuerApplication
