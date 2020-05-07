import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import { getIssuerApplicationForm} from "./ApiIssuer";
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

const [data, setData] = useState([]);
const [error, setError] = useState(false);
let issuerUserId, issuerStatus


const init = () => {
  getIssuerApplicationForm(_id).then(data => {
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


useEffect(() => {
init();

}, []);


    const display = (issuerUserId, issuerStatus)  => {
      
   if (issuerUserId === _id && issuerStatus === 1) {
     return ''
   } else if(issuerUserId === _id && issuerStatus === 0) {
    return 'Your application is in process'
   }else if (issuerUserId === _id && issuerStatus === 0){
    return 'Your application is decline please check your mail for futher instructions'
   }else if (issuerUserId !== _id ){
    return (<div class="card-body">
    <div class="crm-chart">
        <div id="apex7"></div>
    </div>
</div>)
   }
    }





    const dashboarddashboard = () => {
      swal({
        title: ` Disclaimer`,
        text: `NASD CROWDY PORTAL [“Portal”] is a product of NASD Technology Service Limited.
        Users of this Portal are subject to this Disclaimer, the Privacy Statement, Terms of Use, Risk Warning and all other Policies and Procedures.
        
        Any User that accesses this Portal agrees to be bound by this Disclaimer. All Investments including Crowdfunding Projects submitted on the NASD Crowdy Portals are highly speculative in nature and involves substantial risk of loss. We therefore encourage Investors to get advice from their Professional Investment Advisor and to make independent investigations before acting on any information published on the Portal. 
        
        We make no endorsements, representations or warranties whatsoever that any Investor will, or is likely to, achieve profits based on expected or simulated performance of a Crowdfunding Project as this is not necessarily indicative of future results.
       
        Please click "Ok" to proceeding.
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
       

       
          <h3>Verify Your Identity</h3>
                   
          <div className="row">

    
        <div className=" offset-3 col-md-6">
         
            <div className="widget-user-header text-center">
              
                <img src={image2} alt="User Avatar"/>
                
                <a href="/issuer/application"><button class="btn btn-block btn-primary ">VERIFY AS AN ISSUER</button></a>
            
            
           
           
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
                               
                          { process()}
                        
                      
                         
                                {issuerUserId === _id   ? ( 
                                  <Fragment>
                                    <div class="card-body">
                                    <div class="crm-chart">
                                        <div id="apex7"></div>
                                    </div>
                                </div>
                                  </Fragment>
                                ) : Reg()}
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
                                        {/* <li class="d-flex align-items-center mb-15">
                                            <div class="timeline-icon bg-primary mr-3">
                                                <i class="icon_plus"></i>
                                            </div>
                                            <div class="timeline-info">
                                                <h6 class="mb-1 font-15">Client Meeting</h6>
                                                <span>Bonbon macaroon jelly beans gummi bears jelly lollipop apple</span>
                                                <p class="mb-0 font-13">25 mins ago</p>
                                            </div>
                                        </li> */}
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

