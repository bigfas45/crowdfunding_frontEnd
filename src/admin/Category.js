import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import Menu from "./Menu";
import {Spinner, Button} from "reactstrap";
import {isAuthenticated} from "../auth";
import {createCategory, getCategories} from "./ApiAdmin";
import {Link, Redirect} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Category = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    let count = 0;

    const {user, token} = isAuthenticated();

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategory(data);
            }
        });
    };


    // const destroy = classId => {
    //     deleteClass(classId, user._id, token).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    //             init();
    //         }
    //     })
    // }


    // const submit = (classId) => {
    //     confirmAlert({
    //         title: 'Confirm to submit',
    //         message: 'Are you sure to do this.',
    //         buttons: [
    //             {
    //                 label: 'Yes',
    //                 onClick: () => destroy(classId)
    //             }, {
    //                 label: 'No',
    //                 onClick: () => init()
    //             }
    //         ]
    //     });
    // }

    useEffect(() => {
        init();
    }, []);

    const handleChange = e => {
        setError("");
        setLoading(false);
        setName(e.target.value);
    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        setLoading(true)
        // make request to create category
        createCategory(user._id, token, {name}).then(data => {
            if (data.error) {
                setError(true);
                setLoading(false);
            } else {
                setError("");
                setSuccess(true);
                setLoading(false)
                init();
            }
        });
    };

    const showError = () => (<div style={
            {
                display: error ? '' : 'none'
            }
        }
        class="alert alert-danger alert-solid"
        role="alert"> Error !: Something went wrong  </div>

);

const showSuccess = () => (

    <div style={
            {
                display: success ? '' : 'none'
            }
        }
        class="alert alert-success alert-solid"
        role="alert">
        Your upload was successfully
    </div >);


    const showLoading = () => loading && (<div>
        <Spinner animation="grow" variant="secondary"/>
        <Spinner animation="grow" variant="success"/>
        <Spinner animation="grow" variant="danger"/>
        <Spinner animation="grow" variant="warning"/>
        <Spinner animation="grow" variant="info"/>
        <Spinner animation="grow" variant="light"/>
        <Spinner animation="grow" variant="dark"/>
    </div>);

    const getClassTable = () => {
        return (<Fragment>


            <div class="col-lg-6">
                <div id="default">
                    <div class="card mb-4">
                        <div class="card-header">Category Table Manage</div>
                        <div class="card-body">
                            <div class="sbp-preview">
                                <div class="sbp-preview-content">

                                    <table class="table table-sm table-dark">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>
                                                    Name</th>

                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody> {
                                            category.map((c, i) => {
                                                count++;
                                                return (<tr key={i}>
                                                    <td> {count}</td>

                                                    <td> {
                                                        c.name
                                                    }</td>
                                                    <td>

                                                        <Link to={
                                                            `/category/${
                                                                c._id
                                                            }`
                                                        }>
                                                            <i class="fa fa-edit"></i>
                                                        </Link>
                                                        {" "} </td>
                                                </tr>);
                                            })
                                        } </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>)
    }

    const categoryForm = () => {
        return (<Fragment>

            <div class="container-fluid mt-n10">
                <div class="row">
                    <div class="col-lg-6">
                        <div id="default">
                            <div class="card mb-4">
                                <div class="card-header">Category Form Controls</div>
                                <div class="card-body"> {
                                    showError()
                                }
                                    {
                                    showSuccess()
                                }
                                    <div class="sbp-preview">
                                        <div class="sbp-preview-content">
                                            <form onSubmit={clickSubmit}>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Category name</label>
                                                    <input value={name}
                                                        onChange={handleChange}
                                                        class="form-control"
                                                        id="exampleFormControlInput1"
                                                        type="text"
                                                        placeholder="Enter category name"/>
                                                </div>


                                                {
                                                loading && loading ? (<Button className="btn btn-block btn-danger" variant="success" disabled>
                                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>
                                                    Loading...
                                                </Button>) : (<input type="submit" className="btn btn-block btn-primary" value="Create category"/>)
                                            } </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                    getClassTable()
                } </div>
            </div>


        </Fragment>)
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
                            <span>Confirm Payment</span>
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                </div>
            </div>
        </Fragment>)

    }
    return (<Fragment>
        <Header/>
        <div id="layoutSidenav">
            <Menu/>
            <div id="layoutSidenav_content">

                <main> {
                    contentHeader()
                }

                    {
                    categoryForm()
                } </main>
                {
                footer()
            } </div>
        </div>
    </Fragment>);
};

export default Category;

