import React, {useState, useEffect, Fragment} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import {getProjects, deleteProduct, getIssuerApplicationForm} from './ApiIssuer'
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import moment from 'moment';


const ManageProducts = () => {
    const [projects, setProjects] = useState([]);

    const {user, token} = isAuthenticated();
    let count = 0;

    const loadProject = () => {
        getProjects(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProjects(data)
            }
        })
    }


    const [data, setData] = useState([]);
const [error, setError] = useState(false);
let issuerUserId, issuerStatus


const init = () => {
  getIssuerApplicationForm(user._id).then(data => {
  if (data.error) {
     setError(data.error);
  }else{
    setData(data)
    
  }
});
};




const process = () => {
data.map((issuer, i) => {
  issuerUserId = issuer.userId._id
  issuerStatus = issuer.status
})

}


const checkIfApprove = () => {
    return <Redirect to="" />
}



    useEffect(() => {
        loadProject()
        init();
    }, [])


    const header = () => {
        return (
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Projects</h1>
                        </div>
                        <div className="col-sm-2">

                            <Link class="btn btn-block btn-success btn-sm" to="/admin/project/create">
                                Add  Project
                            </Link>

                        </div>
                    </div>
                </div>
            </section>

        )
    }

    const tableOptions = () => {
        return (
            <Fragment>
                <div class="row">
                        <div class="col-md-6 col-xl-3 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="zmdi zmdi-favorite-outline"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">Returning Customers</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">1,589</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-3 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                  
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="zmdi zmdi-shopping-cart"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">New Customers</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">25,6987</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-3 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="zmdi zmdi-network"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">Conversion</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">252.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-3 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="zmdi zmdi-eye"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">Bounce Rate</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">15.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
            </Fragment>
        );
    }


    const body = () => {
        return (
            <Fragment>
                <div class="row">
                    <div class="col-12 box-margin">

                        <div class="card mb-30">
                            <div class="card-body pb-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h6 class="card-title mb-0">Project manage</h6>
                                    {process()}
                                    {issuerUserId === user._id   ? (<Link to={`/issuer/project/create`}>
                                        <button onClick={checkIfApprove()} type="button" class="btn btn-primary waves-effect btn-sm waves-light float-right" data-toggle="modal" data-animation="bounce" data-target=".bs-example-modal-lg">+ Add New</button>
                                    </Link>) : ( <a href={`/issuer/application`}> <button type="button" class="btn btn-primary waves-effect btn-sm waves-light float-right" data-toggle="modal" data-animation="bounce" data-target=".bs-example-modal-lg">+ Verify your registration</button> </a>)  }


                                    
                                </div>
                            </div>
                            <div class="card-body pb-0 px-0">
                                <div class="table-responsive order-stats">
                                    <table class="table table-nowrap">
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

                                        <tbody> {
                                            projects.map((p, i) => {
                                                count++;
                                                return (
                                                    <Fragment>
                                                        <tr key={i}>
                                                            <td>{count}</td>
                                                            <td> {
                                                                p.title
                                                            }
                                                                <br/>
                                                                <small>{
                                                                    moment(p.createdAt).format("LL")
                                                                }</small>
                                                            </td>
                                                            <td> {
                                                                p.pledge.toLocaleString(navigator.language, {minimumFractionDigits: 0})
                                                            } </td>
                                                            <td>{
                                                                p.duration
                                                            }</td>
                                                            <td>{
                                                                p.category.name
                                                            }</td>
                                                            <td>{
                                                                getStatus(p.status)
                                                            }</td>
                                                            {/* <td> {" "}
                                                                <Link className="btn btn-info btn-sm"
                                                                    to={
                                                                        `/issuer/project/update/${
                                                                            p._id
                                                                        }`
                                                                }>
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                    Edit
                                                                </Link>

                                                                
                                                            </td> */}

                                                            <td>                    
                                                                <div class="actions ml-3">
                                                                    <a href={`/issuer/project/update/${ p._id }`} class="action-item mr-2" data-toggle="tooltip" title="" data-original-title="Quick view">
                                                                        <i class="fa fa-external-link"></i>
                                                                    </a>
                                                                    <Link class="action-item mr-2"
                                                                    to={
                                                                        `/issuer/project/payment/${
                                                                            p._id
                                                                        }`
                                                                }>
                                                                        <i class="btn btn-primary md-trigger mr-2 mb-2" data-modal="modal-1" class="fa fa-credit-card-alt"></i>
                                                                    </Link>
                                                                </div>
                                                            </td>

                                                            
                                                        </tr>
                                                    </Fragment>
                                                );
                                            })
                                        } </tbody>
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
        if (status === 0) {
            return <span className="badge badge-danger">Inactive</span>
        }
        if (status === 1) {
            return <span className="badge badge-success">Active</span>
        }
    }


    return (
        <Fragment>
            <div className="ecaps-page-wrapper">
                <Aside></Aside>
                <div className="ecaps-page-content">
                    <Header></Header>
                    <div className="main-content">
                        <div className="container-fluid">
                            {
                            tableOptions()
                        }
                            {
                            body()
                        } </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default ManageProducts
