import React, {Component, Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {isAuthenticated} from "../auth";
import {getUserPayment} from "./ApiCore";
import Menu from "./Menu"
import moment from 'moment';

const Balance = () => {
    const {user, token} = isAuthenticated();
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    let count = 0;
    let sum = 0;

    const init = () => {
        getUserPayment(user._id, token).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setData(data);
            }
        });
    };


    useEffect(() => {
        init();
    }, []);

    const content = () => {
        return (<Fragment>
            <div class="container-fluid mt-n10">
                <div className="row">
                    <div className="col-12 box-margin">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="alert alert-light alert-dismissible fade show mb-30" role="alert">
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                            <strong className="font-16">
                                                {/* <i className="fa fa-bookmark-o mr-2"></i>With this purchase you will earn 256 Reward Points. */}
                                                </strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive cart-area">
                                            <table className="table table-borderless table-nowrap table-centered mb-0">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th className="text-center">Project</th>
                                                        <th className="text-right">Investement</th>
                                                        <th className="text-center">Returns(%)</th>
                                                        <th className="text-right">Return(₦)</th>
                                                        <th className="text-center">Payment Status</th>


                                                    </tr>
                                                </thead>
                                                <tbody className="text-center"> {
                                                    data.map((d, i) => {
                                                        count++;
                                                        let returnP,
                                                            returnPercentage,
                                                            expectedreturns
                                                        let amount = d.amount
                                                    sum += amount;
                                                    returnP = d.projectId.returns;
                                                    returnPercentage = returnP / 100;
                                                    expectedreturns = amount * returnPercentage

                                                    return (<Fragment>

                                                        <tr>
                                                            <td className="text-center"> {count}</td>
                                                            <td className="text-center"> {
                                                                d.projectId.title
                                                            }</td>
                                                            <td className="text-right">
                                                                ₦{
                                                                amount.toLocaleString(navigator.language, {minimumFractionDigits: 0})
                                                            } </td>
                                                            <td className="text-center"> {returnP} </td>
                                                            <td className="text-right">
                                                                ₦{
                                                                expectedreturns.toFixed(2)
                                                            } </td>
                                                            <td className="text-center"></td>

                                                        </tr>


                                                    </Fragment>)
                                                })
                                                }

                                                    <tr>
                                                        <td class="px-0 border-top border-top-2">
                                                            <strong>Total amount paid</strong>
                                                        </td>
                                                        <td className="text-center"></td>
                                                        <td class="px-0 text-right border-top border-top-2">
                                                            <span class="font-20">
                                                                ₦{
                                                                sum.toLocaleString(navigator.language, {minimumFractionDigits: 0})
                                                            } </span>
                                                        </td>
                                                        <td className="text-center"></td>
                                                        <td className="text-center"></td>
                                                    </tr>


                                                </tbody>
                                            </table>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>)
    }

    const footer = () => {
        return (<Fragment>
            <footer class="footer mt-auto footer-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy; <a href="http://ventureramp.com.ng/">ventureramp.com.ng</a> 2020</div>
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
                            <span>Payment History</span>
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
                    content()
                } </main>
                {
                footer()
            } </div>
        </div>
    </Fragment>)


}

export default Balance

