import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIndividualInvestorForm, getCorporateInvestorForm } from "./ApiCore";
import Footer from "./Footer";


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
                                {/* <div class="card-body">
                                    <div class="crm-chart">
                                        <div id="apex7"></div>
                                    </div>
                                </div> */}
                                {Reg()}
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

    const contentHeader = () => {
        return (
            <Fragment> {/* <!-- Content Header (Page header) --> */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Welcome {firstname}&nbsp;{lastname}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Dashboard v2</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

  //   const display = (individual)  => {
      
  //  if (individual === _id || corporate === _id) {
  //    return ''
  //  } else {
  //   return  Reg();
  //  }
  //   }


    // const content = () => {
    //     return (
    //         <Fragment>
    //             <section className="content">
    //                 <div className="container-fluid">
    //                     <div className="row">
    //                         <div className="col-9">
    //                             <div className="callout callout-info">
    //                                 <h5>
    //                                     <i className="fas fa-info"></i>
    //                                     Note:</h5>
    //                                 This is your dashboard. An overview of everything you have going on at any time such as your assets, investments, trades and fundraising campaigns, will show up here.
    //                             </div>
    //                             {process()}
    //                             {/* {display(individual)} */}

    //                             {individual === _id || corporate === _id ? '' : Reg()}
                         
    //                         </div>
    //                         <div className="col-3">
                                
                                
    //                           {  lastActivty() }
    //                         </div>


    //                     </div>
    //                 </div>
    //             </section>
    //         </Fragment>
    //     )
    // }


    const contentnew = () => {
      return (
          <Fragment>
              <div className="main-content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-sm-6 col-lg-4">
                <div className="card box-margin">
                  <div className="card-body">
                    <div className="float-right">
                      <i className="fa fa-id-badge text-danger font-30"></i>
                    </div>
                    <span className="badge badge-danger">Sessions</span>
                    <h4 className="my-3">26k</h4>
                    <p className="mb-0">
                      <span className="text-success">
                        <i
                          className="fa fa-level-up mr-1"
                          aria-hidden="true"
                        ></i>
                        7.5%
                      </span>
                      New Sessions Today
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="card box-margin">
                  <div className="card-body">
                    <div className="float-right">
                      <i className="fa fa-bar-chart-o font-30"></i>
                    </div>
                    <span className="badge badge-secondary">
                      Avg.Sessions
                    </span>
                    <h4 className="my-3">00:28</h4>
                    <p className="mb-0">
                      <span className="text-danger">
                        <i
                          className="fa fa-level-down mr-1"
                          aria-hidden="true"
                        ></i>
                        1.4%
                      </span>{" "}
                      Weekly Avg.Sessions
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4">
                <div className="card box-margin">
                  <div className="card-body">
                    <div className="float-right">
                      <i className="fa fa-codiepie text-warning font-30"></i>
                    </div>
                    <span className="badge badge-warning">Bounce Rate</span>
                    <h4 className="my-3">$2500</h4>
                    <p className="mb-0">
                      <span className="text-danger">
                        <i
                          className="fa fa-level-down mr-1"
                          aria-hidden="true"
                        ></i>
                        45%
                      </span>{" "}
                      Bounce Rate Weekly
                    </p>
                  </div>
                </div>
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

