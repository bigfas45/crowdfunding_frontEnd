import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIndividualInvestorForm, getCorporateInvestorForm } from "./ApiCore";
import Footer from "./Footer";
import swal from "sweetalert";



const Home = () => {
    const {
        user: {
            _id,
            firstname,
            lastname,
            email,
            role
        }
    } = isAuthenticated();

  const [investorForm, setInvestorForm] = useState([]);
  const [corporateForm, setCorporateForm] = useState([]);
  const [error, setError] = useState(false);
  let individual = '';
  let corporate = '';


  const init = () => {
    getIndividualInvestorForm(_id).then(data => {
      if (data.error) {
         setError(data.error);
      }else{
        setInvestorForm(data)
        
      }
  });
};


const init2 = () => {
  getCorporateInvestorForm(_id).then(data => {
    if (data.error) {
       setError(data.error);
    }else{
      setCorporateForm(data);
    }
});
};

const process = () => {
  investorForm.map((invest, i) => {

    individual = invest.userId._id

  })

  corporateForm.map((cop, i) => {

    corporate = cop.userId._id

  })
}


useEffect(() => {
  init();
  init2();
}, []);



const dashboarddashboard = () => {
  swal({
    title: ` Disclaimer`,
    text: `NASD CROWDY PORTAL [“Portal”] is a product of NASD Technology Service Limited.
    Users of this Portal are subject to this Disclaimer, the Privacy Statement, Terms of Use, Risk Warning and all other Policies and Procedures.
    
    Any User that accesses this Portal agrees to be bound by this Disclaimer. All Investments including Crowdfunding Projects submitted on the NASD Crowdy Portals are highly speculative in nature and involves substantial risk of loss. We therefore encourage Investors to get advice from their Professional Investment Advisor and to make independent investigations before acting on any information published on the Portal. 
    
    We make no endorsements, representations or warranties whatsoever that any Investor will, or is likely to, achieve profits based on expected or simulated performance of a Crowdfunding Project as this is not necessarily indicative of future results.
   
    Please click "Ok" before proceeding.
    `,
    icon: "success"
  });
};




    
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


  const activeTimeLine = () => {
    return(
      <Fragment>
         <div class="row">
                        <div class="col-lg-8 box-margin height-card">
                            <div class="card">
                              
                             {process()}

                                {individual === _id || corporate === _id ? '' : Reg()}
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
                                            <div class="timeline-icon bg-success mr-3">
                                                <i class="icon_check"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Launch Website</h6>
                                                <span>Candy ice cream cake. </span>
                                                <p class="mb-0 font-13">45 mins ago</p>
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





  const content = () => {
    return (
      <Fragment>
       <div class="row">
                        <div class="col-md-6 col-xl-4 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="fa fa-list"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">Total projects</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">50</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-4 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="zmdi zmdi-network"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">Total amount invested</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">200,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-xl-4 height-card box-margin">
                            <div class="card">
                                <div class="card-body">
                                    <div class="single-widget-area d-flex align-items-center justify-content-between">
                                        <div class="profit-icon">
                                            <i class="fa fa-money"></i>
                                        </div>

                                        <div class="total-profit">
                                            <h6 class="mb-0">Investment Balance</h6>
                                            <div class="counter font-30 font-weight-bold" data-comma-separated="true">5,000,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
      </Fragment>
    );
  };


  return (
    <Fragment>
      {dashboarddashboard()}
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

