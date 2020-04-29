import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import image from "../img/puzzle-959x539.jpg";
import {
  getProject,
  getProjectGallery,
  getIndividualInvestorForm,
  getCorporateInvestorForm
} from "./ApiCore";
import ReactHtmlParser from "react-html-parser";
import "../styles.css";
import { API } from "../config";
//import the library
import PaystackButton from "react-paystack";
import moment from 'moment';


const InestmentDetails = ({ match }) => {
  const {
    user: { _id, firstname, lastname, email, role }
  } = isAuthenticated();
  const [investorForm, setInvestorForm] = useState([]);
  const [corporateForm, setCorporateForm] = useState([]);
  let individual = "";
  let corporate = "";
  const [key, setKey] = useState(
    "pk_test_a3c6eed2d7700ebb41bf5417adeee9ae037f0fdc"
  );
  const [amount, setAmount] = useState(20000);

  const callback = response => {
    console.log(response); // card charged successfully, get reference here
  };
  const close = () => {
    console.log("Payment closed");
  };

  const getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };

  const [projectAll, setProjectAll] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [error, setError] = useState(false);
  let count = 0;

  const init = projectId => {
    getProject(projectId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProjectAll(data);
      }
    });
  };

  const initProjectGallery = projectId => {
    getProjectGallery(projectId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setGallery(data);
      }
    });
  };

  const initIndividual = () => {
    getIndividualInvestorForm(_id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setInvestorForm(data);
      }
    });
  };

  const initCorporate = () => {
    getCorporateInvestorForm(_id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCorporateForm(data);
      }
    });
  };

  const process = () => {
    investorForm.map((invest, i) => {
      individual = invest.userId._id;
    });

    corporateForm.map((cop, i) => {
      corporate = cop.userId._id;
    });
  };

  useEffect(() => {
    init(match.params.projectId);
    initProjectGallery(match.params.projectId);
    initIndividual();
    initCorporate();
  }, []);

  const content = () => {
    return (
      <Fragment>
         {projectAll.map((d,i) => {
        return (
          <div class="row">
            <div class="col-12">
              <div class="card box-margin">
                <div class="row justify-content-center">
                  <div class="col-12">
                    <div class="card-group box-margin">
                      <div class="card  px-4 py-5 border-0">
                        <div class="card-body">
                          <a target="_black" href={`${d.website}`}>
                            {" "}
                            <h5>{d.title}</h5>
                          </a>
                          <p class="mt-4 mb-0 ">
                            <span class="d-block mb-3">
                              <i class="fa fa-map-marker"></i> {d.location}
                            </span>
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="badge badge-danger badge-pill">
                                {d.projectType}
                              </div>
                              <div class="badge badge-success badge-pill">
                                {d.category.name}
                              </div>
                            </div>
                            <br />

                            <span>
                              <i
                                style={{ color: "green" }}
                                class="fa fa-bar-chart"
                                style={{ margin: "4px 0px 0px 0px" }}
                              ></i>{" "}
                              &nbsp;{d.returns}% returns in {d.duration} months
                            </span>
                          </p>
                        </div>
                      </div>

                      <div class="card  px-4 py-5 border-0">
                        <div class="card-body">
                          <h5 class="h4 ">Progress</h5>
                          <p class="mt-4 mb-0 ">
                            <h5 class="font-14">
                              &nbsp;<span class="float-right">0%</span>
                            </h5>
                            <div class="progress h-8 mb-20">
                              <div
                                class="progress-bar bg-info wow animated progress-animated"
                                style={{ width: "0%" }}
                                role="progressbar"
                              >
                                {" "}
                                <span class="sr-only">60% Complete</span>{" "}
                              </div>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                              <h5 style={{ color: "red" }}>
                                ₦
                                {d.pledge.toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0
                                })}
                                <p>Goal</p>
                              </h5>
                              <h5 style={{ color: "green" }}>
                                ₦0<p>pledged</p>
                              </h5>
                              <h5 class="product-price mb-0 mt-0">
                                {moment(d.createdAt).fromNow()}
                                <p>Duration</p>
                              </h5>
                            </div>
                          </p>
                        </div>
                      </div>

                      <div class="card  px-4 py-5 border-0">
                        <div class="card-body">
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          {process()}

                          {individual === _id || corporate === _id ? (
                           <Fragment>
                        
                                <Link to={`/project/fund/${d._id}`}>
                                  {" "}
                                  <button
                                    type="button"
                                    class="btn btn-rounded btn-primary btn-lg mb-2 mr-2"
                                  >
                                    Fund Now
                                  </button>
                                </Link>
                                </Fragment>
                          ) : (
                            <Link
                              to={`/investor/registration`}
                              class="btn btn-primary"
                            >
                              {" "}
                              REGISTER{" "}
                              <i class="feather icon-arrow-right ml-2"></i>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-xl-12 height-card box-margin">
                        <div class="card">
                          <div class="card-body">
                            <nav>
                              <div
                                class="nav nav-tabs"
                                id="nav-tab"
                                role="tablist"
                              >
                                <a
                                  class="nav-item nav-link active"
                                  id="nav-home-tab"
                                  data-toggle="tab"
                                  href="#nav-home"
                                  role="tab"
                                  aria-controls="nav-home"
                                  aria-selected="true"
                                >
                                  Overview
                                </a>
                                <a
                                  class="nav-item nav-link"
                                  id="nav-profile-tab"
                                  data-toggle="tab"
                                  href="#nav-profile"
                                  role="tab"
                                  aria-controls="nav-profile"
                                  aria-selected="false"
                                >
                                  Gallery
                                </a>
                                <a
                                  class="nav-item nav-link"
                                  id="nav-contact-tab"
                                  data-toggle="tab"
                                  href="#nav-contact"
                                  role="tab"
                                  aria-controls="nav-contact"
                                  aria-selected="false"
                                >
                                  Updates
                                </a>
                                <a
                                  class="nav-item nav-link"
                                  id="nav-documents-tab"
                                  data-toggle="tab"
                                  href="#nav-documents"
                                  role="tab"
                                  aria-controls="nav-documents"
                                  aria-selected="false"
                                >
                                  Documents
                                </a>
                              </div>
                            </nav>
                            <div class="tab-content" id="nav-tabContent">
                              <div
                                class="tab-pane fade show active"
                                id="nav-home"
                                role="tabpanel"
                                aria-labelledby="nav-home-tab"
                              >
                                {ReactHtmlParser(d.description)}
                              </div>

                              <div
                                class="tab-pane fade"
                                id="nav-profile"
                                role="tabpanel"
                                aria-labelledby="nav-profile-tab"
                              >
                                <div class="card-body pb-0">
                                  <div class="row">
                                    {gallery.map((g, i) => {
                                      return (
                                        <div class="col-sm-6 col-xl-3">
                                          <a
                                            href={`${API}/gallery/file/${g._id}`}
                                            data-toggle="lightbox"
                                            data-gallery="example-gallery"
                                          >
                                            <img
                                              src={`${API}/gallery/file/${g._id}`}
                                              alt={g.name}
                                              class="img-fluid mb-30"
                                            />
                                          </a>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>

                              <div
                                class="tab-pane fade"
                                id="nav-contact"
                                role="tabpanel"
                                aria-labelledby="nav-contact-tab"
                              >
                                <div class="timeline">
                                  <div class="timeline-block">
                                    <span class="timeline-step badge-warning"></span>
                                    <div class="timeline-content">
                                      <p class="font-weight-bold mb-1">
                                        12:30 PM
                                      </p>
                                      <h5 class="font-18">
                                        You liked a comment from
                                      </h5>
                                      <p class=" text-sm mb-0">
                                        Nullam id dolor id nibh ultricies
                                        vehicula ut id elit. Cum sociis natoque
                                        penatibus et magnis dis parturient
                                        montes, nascetur ridiculus mus.
                                      </p>
                                    </div>
                                  </div>

                                  <div class="timeline-block">
                                    <span class="timeline-step badge-warning"></span>
                                    <div class="timeline-content">
                                      <p class="font-weight-bold mb-1">
                                        12:30 PM
                                      </p>
                                      <h5 class="font-18">
                                        You liked a comment from
                                      </h5>
                                      <p class=" text-sm mb-0">
                                        Nullam id dolor id nibh ultricies
                                        vehicula ut id elit. Cum sociis natoque
                                        penatibus et magnis dis parturient
                                        montes, nascetur ridiculus mus.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                class="tab-pane fade"
                                id="nav-documents"
                                role="tabpanel"
                                aria-labelledby="nav-documents-tab"
                              >
                                <div class="card-body">
                                  <div class="widget-download-file d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center mr-3">
                                      <div class="download-file-icon mr-3">
                                        <img
                                          src="img/filemanager-img/1.png"
                                          alt=""
                                        />
                                      </div>
                                      <div class="user-text-table">
                                        <h6 class="d-inline-block font-15 mb-0">
                                          Documentation
                                        </h6>
                                        <p class="mb-0">Lorem ipsum</p>
                                      </div>
                                    </div>
                                    <a
                                      href="#"
                                      class="download-link badge badge-primary badge-pill"
                                    >
                                      Download
                                    </a>
                                  </div>

                                  <div class="widget-download-file d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center mr-3">
                                      <div class="download-file-icon mr-3">
                                        <img
                                          src="img/filemanager-img/5.png"
                                          alt=""
                                        />
                                      </div>
                                      <div class="user-text-table">
                                        <h6 class="d-inline-block font-15 mb-0">
                                          Bandwidth
                                        </h6>
                                        <p class="mb-0">Lorem ipsum</p>
                                      </div>
                                    </div>
                                    <a
                                      href="#"
                                      class="download-link badge badge-info badge-pill"
                                    >
                                      Download
                                    </a>
                                  </div>

                                  <div class="widget-download-file d-flex align-items-center justify-content-between mb-4">
                                    <div class="d-flex align-items-center mr-3">
                                      <div class="download-file-icon mr-3">
                                        <img
                                          src="img/filemanager-img/6.png"
                                          alt=""
                                        />
                                      </div>
                                      <div class="user-text-table">
                                        <h6 class="d-inline-block font-15 mb-0">
                                          Projects
                                        </h6>
                                        <p class="mb-0">Lorem ipsum</p>
                                      </div>
                                    </div>
                                    <a
                                      href="#"
                                      class="download-link badge badge-success badge-pill"
                                    >
                                      Download
                                    </a>
                                  </div>

                                  <div class="widget-download-file d-flex align-items-center justify-content-between">
                                    <div class="d-flex align-items-center mr-3">
                                      <div class="download-file-icon mr-3">
                                        <img
                                          src="img/filemanager-img/7.png"
                                          alt=""
                                        />
                                      </div>
                                      <div class="user-text-table">
                                        <h6 class="d-inline-block font-15 mb-0">
                                          Download
                                        </h6>
                                        <p class="mb-0">Lorem ipsum</p>
                                      </div>
                                    </div>
                                    <a
                                      href="#"
                                      class="download-link badge badge-primary badge-pill"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div class="container-fluid">
              {content()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InestmentDetails;
