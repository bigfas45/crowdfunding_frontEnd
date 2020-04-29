import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import { getCategories } from "./ApiAdmin";
import Sidebar from "react-sidebar";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIndividualInvestorForm, getCorporateInvestorForm } from "../core/ApiCore";
import Footer from "./Footer";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategory(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const Reg = () => {
    return(
        <Fragment>
<section className="content">
  <div className="container-fluid">

    <div className="card card-default">
     

      <div className="card-body">
        <h3>Verify Your Identity</h3>
                 
        <div className="row">

  
      <div className="col-md-6">
       
          <div className="widget-user-header text-center">
            
              <img src={image2} alt="User Avatar"/>
              <p>I want to invest as an individual</p>
              <p>This will allow you to invest as an individual.</p>
              <a href="/individual/investor/registration"><button class="btn btn-block btn-primary ">VERIFY AS AN INDIVIDUAL</button></a>
          
          
          </div>
         
        </div>
     
      <div className="col-md-6">
       
          <div className="widget-user-header text-center">
            
              <img src={image} alt="User Avatar"/>
              <p>I want to invest as a company</p>
              <p>This will allow you to invest as a company.</p>
              <a href="/corporate/investor/registration"> <button class="btn btn-block btn-primary ">VERIFY AS A COMPANY</button></a>
          
          
         
        </div>
      </div>
     
    </div>
  

   
    </div>
    </div>
    </div>
    </section>
                          
        
      
   
   
      
 


        </Fragment>
    )
}

  const content = () => {
    return (
      <Fragment>
       
         

       <div class="row">
                      
                        <div class="col-xl-3 col-md-6 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <h5>86%</h5>
                                            <p class="mb-0">Total Product</p>
                                        </div>
                                        <div class="col-12">
                                            <div class="progress h-8 mb-0 mt-20 h-8">
                                                <div class="progress-bar bg-primary" role="progressbar" style={{width: "85%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                     
                        <div class="col-xl-3 col-md-6 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <h5>40%</h5>
                                            <p class="mb-0">Pending Product</p>
                                        </div>
                                        <div class="col-12">
                                            <div class="progress h-8 mb-0 mt-20 h-8">
                                                <div class="progress-bar bg-info" role="progressbar" style={{width: "40%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                      
                        <div class="col-xl-3 col-md-6 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <h5>56%</h5>
                                            <p class="mb-0">Product A</p>
                                        </div>
                                        <div class="col-12">
                                            <div class="progress mb-0 mt-20 h-8">
                                                <div class="progress-bar bg-primary" style={{width: "60%"}} role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                        <div class="col-xl-3 col-md-6 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <h5>26%</h5>
                                            <p class="mb-0">Product B</p>
                                        </div>
                                        <div class="col-12">
                                            <div class="progress mb-0 mt-20 h-8">
                                                <div class="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
         

         
      </Fragment>
    );
  };

  const activeTimeLine = () => {
    return(
      <Fragment>
         <div class="row">
                        <div class="col-lg-8 box-margin height-card">
                            <div class="card">
                                <div class="card-body">
                                    <div class="crm-chart">
                                        <div id="apex7"></div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>

                        <div class="col-xl-4">
                            <div class="card mb-30">
                                <div class="card-body">
                                    <div class="card-header border-none bg-transparent d-flex align-items-center justify-content-between p-0 mb-30">
                                        <div class="widgets-card-title">
                                            <h5 class="card-title mb-0">Activity Timeline</h5>
                                        </div>
                                    </div>

                                  
                                    <ul class="dashboard-active-timeline list-unstyled" id="dashboardTimeline">
                                        <li class="d-flex align-items-center mb-15">
                                            <div class="timeline-icon bg-primary mr-3">
                                                <i class="icon_plus"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Client Meeting</h6>
                                                <span>Bonbon macaroon jelly beans gummi bears jelly lollipop apple</span>
                                                <p class="mb-0 font-13">25 mins ago</p>
                                            </div>
                                        </li>

                                        <li class="d-flex align-items-center mb-15">
                                            <div class="timeline-icon bg-warning mr-3">
                                                <i class="icon_mic_alt"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Email Newsletter</h6>
                                                <span>Cupcake gummi bears soufflé caramels candy</span>
                                                <p class="mb-0 font-13">29 mins ago</p>
                                            </div>
                                        </li>

                                        <li class="d-flex align-items-center mb-15">
                                            <div class="timeline-icon bg-danger mr-3">
                                                <i class="icon_mail_alt"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Plan Webinar</h6>
                                                <span>Candy ice cream cake.</span>
                                                <p class="mb-0 font-13">28 mins ago</p>
                                            </div>
                                        </li>

                                        <li class="d-flex align-items-center mb-15">
                                            <div class="timeline-icon bg-success mr-3">
                                                <i class="icon_check"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Launch Website</h6>
                                                <span>Candy ice cream cake. </span>
                                                <p class="mb-0 font-13">45 mins ago</p>
                                            </div>
                                        </li>

                                        <li class="d-flex align-items-center mb-15">
                                            <div class="timeline-icon bg-danger mr-3">
                                                <i class="icon_mail_alt"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Plan Webinar</h6>
                                                <span>Candy ice cream cake.</span>
                                                <p class="mb-0 font-13">50 mins ago</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                      
                    </div>
                
      </Fragment>
    )
  }

  return (
    <Fragment>
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
        <Header></Header>
        <div className="main-content">
        <div class="container-fluid">
        {content()}
        {activeTimeLine()}
      
        </div>
     


        
        </div>
      
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
