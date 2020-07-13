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
  getCorporateInvestorForm,
  getProductPayment,
  getProductDocument
} from "./ApiCore";
import ReactHtmlParser from "react-html-parser";
import "../styles.css";
import { API } from "../config";
//import the library
import PaystackButton from "react-paystack";
import moment from 'moment';
import swal from "sweetalert";
import Menu from "./Menu"
import ShowImage from './ShowImage';



const InestmentDetails = ({ match }) => {
  const {
    user: { _id, firstname, lastname, email, role, userType }
  } = isAuthenticated();
  const [investorForm, setInvestorForm] = useState([]);
  const [corporateForm, setCorporateForm] = useState([]);
  let individual = "";
  let corporate = "";
  const [data, setData] = useState([]);
  const [docData, setDocData] = useState([]);


  let amount=0
let total =0
let percentage=0
let individualStatus , corporateStatus

 
  const initPayment = (projectId) => {
    getProductPayment(projectId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setData(data);
      }
    });
  };


  const initGetDoc = (projectId) => {
    getProductDocument(projectId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setDocData(data);
      }
    });
  };




  const payment = () => {
    data.map((p,i) => {
      amount = p.amount
      total += amount
   
    })
  }

  const perce = (pledge)  => {
    percentage = ( ((total)/pledge) *100 )
    return percentage
  }





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
      individualStatus = invest.status
    });

    corporateForm.map((cop, i) => {
      corporate = cop.userId._id;
      corporateStatus = cop.status;

    });
  };

  useEffect(() => {
    init(match.params.projectId);
    initProjectGallery(match.params.projectId);
    initPayment(match.params.projectId);
    initGetDoc(match.params.projectId)
    initIndividual();
    initCorporate();
  }, []);

  const dashboarddashboard = () => {
    swal({
      title: ` Registration In Process`,
      text: `
      Hi ${firstname},

      We are reviewing your verification for ${firstname} ${lastname}, and will get back to you within 1 business day with our approval or a request for more information.
      
      While you wait, why not have a look at our how-to guides for investors and for raising funds.
      
      Regards,
      NASD
      `,
      icon: "success"
    });
  };



  const dashboarddashboard2 = () => {
    swal({
      title: ` Registration Is Declined`,
      text: `
      Hi ${firstname},

      Your application for ${firstname} ${lastname}, has been declined. You cannot now begin your investment without verifying your account .

      Regards,
      NASD
      `,
      icon: "success"
    });
  };

  const message = () => {
    
    dashboarddashboard()
  }

  const messageDecline = () => {
    
    dashboarddashboard2()
  }

  const content = () => {
    return (
      <Fragment>
         {projectAll.map((d,i) => {
        return (
          <Fragment>
          <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                        <div class="container-fluid">
                            <div class="page-header-content">
                                <h1 class="page-header-title">
                                    <div class="page-header-icon"><i class="fa fa-list"></i></div>
                                    <span>{d.title}</span>
                                </h1>
                                
                            </div>
                        </div>
                    </div>
          <div class="container-fluid mt-n10">

          <div class="row">
            <div class="col-12">
              <div class="card box-margin">
              {  payment()}

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
                              &nbsp;<span class="float-right">${perce(d.pledge).toFixed(0)}%</span>
                            </h5>
                            <div class="progress h-8 mb-20">
                              <div
                                class="progress-bar bg-info wow animated progress-animated"
                                style={{width: `${perce(d.pledge).toFixed(0)}%`}}
                                role="progressbar"
                              >
                                {" "}
                                <span class="sr-only">60% Complete</span>{" "}
                              </div>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                              <h6 style={{ color: "red" }}>
                                ₦
                                {d.pledge.toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0
                                })}
                                <p>Goal</p>
                              </h6>
                              <h6 style={{ color: "green" }}>
                                ₦{total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}<p>pledged</p>
                              </h6>
                           
                            </div>
                          </p>
                        </div>
                      </div>

                      <div class="card  px-4 py-5 border-0">
                        <div class="card-body">
                        <ShowImage item={d} url="project" />            
                                      <br />
                          <br />
                          {process()}

                          {individual === _id || corporate === _id  || userType=== 3   ? 
                          individualStatus === 1 || corporateStatus === 1 || userType=== 3  ? 
                       
                         
                       (  <Fragment>
                                <Link to={`/project/fund/${d._id}`}>
                                  {" "}
                                  <button
                                    type="button"
                                    class="btn btn-rounded btn-primary btn-lg mb-2 mr-2"
                                  >
                                    Fund Now 
                                  </button>
                                </Link>
                                </Fragment>)
                           :  
                           individualStatus === 2 || corporateStatus === 2  ? 
                           
                           (<Fragment>
                            <button
                           onClick={() =>
                            messageDecline(() => {
                             })
                           }
                              type="button"
                              class="btn btn-rounded btn-danger btn-lg mb-2 mr-2"
                            >
                            Registration is Declined
                            </button>
                     
                          </Fragment>)
                           
                           : 
                           
                           
                           (<Fragment>
                            <button
                           onClick={() =>
                             message(() => {
                             })
                           }
                              type="button"
                              class="btn btn-rounded btn-warning btn-lg mb-2 mr-2"
                            >
                            Registration in process
                            </button>
                     
                          </Fragment>)
                           : (
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
                                    ....
                                      </p>
                                      <h5 class="font-18">
                                      ....
                                      </h5>
                                      <p class=" text-sm mb-0">
                                       ...
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

                                  {docData.map((d, i) => {
                                    return(
                                      <Fragment>
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
                                        {d.name}
                                        </h6>
                                        <p class="mb-0">{d.project.title}</p>
                                      </div>
                                    </div>
                                    <a href={`${API}/document/file/${d._id}`} alt={d.project.title} class="download-link badge badge-primary badge-pill">Download</a>
                                  </div>
                                      </Fragment>
                                     
                                    )
                                  })}
                                  

                                 

                                 

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
        </Fragment>
        );
      })}
      </Fragment>
    );
  };

  const footer = () => {
    return (
        <Fragment>
            <footer class="footer mt-auto footer-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy; Your Website 2020</div>
                        <div class="col-md-6 text-md-right small">
                            <a href="#!">Privacy Policy</a>
                            &middot;
                            <a href="#!">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}



  return (
    <Fragment>
    <Header/>
   <div id="layoutSidenav">
       <Menu/>
       <div id="layoutSidenav_content">

           <main> 

           {content()}
              
           
           </main>
           {
           footer()
       } </div>
   </div>
</Fragment>
  );
};

export default InestmentDetails;
