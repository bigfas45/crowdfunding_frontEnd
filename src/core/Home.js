import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIndividualInvestorForm, getCorporateInvestorForm, getPayment } from "./ApiCore";
import Footer from "./Footer";
import swal from "sweetalert";
import IMG from "./color/drawkit-content-man-alt.svg"
import Menu from "./Menu"
import moment from "moment";



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
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  let individual = '';
  let corporate = '';
  let totalInvestmentCapital =0
  let totalUserCount = 0


  const init = () => {
    getIndividualInvestorForm(_id).then(data => {
      if (data.error) {
         setError(data.error);
      }else{
        setInvestorForm(data)
        
      }
  });
};

  const initInvestmentCount = () => {
    getPayment().then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setData(data);
        }
    });
};

const totalInvestedCapital = () => {
    data.map((d, i) => {
     let investment = d.amount
     totalInvestmentCapital +=investment
    })
  }
 


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
  initInvestmentCount()
}, []);



const dashboarddashboard = () => {
  swal({
    title: ` Disclaimer`,
    text: `NASD VentureRamp crowdfunding  PORTAL [“Portal”] is a product of NASD Technology Service Limited.
    Users of this Portal are subject to this Disclaimer, the Privacy Statement, Terms of Use, Risk Warning and all other Policies and Procedures.
    
    Any User that accesses this Portal agrees to be bound by this Disclaimer. All Investments including Crowdfunding Projects submitted on the NASD VentureRamp crowdfunding  Portals are highly speculative in nature and involves substantial risk of loss. We therefore encourage Investors to get advice from their Professional Investment Advisor and to make independent investigations before acting on any information published on the Portal. 
    
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
    return(
        <Fragment>
              <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid mt-5">
                    <div className="d-flex justify-content-between align-items-sm-center flex-column flex-sm-row mb-4">
                        <div className="mr-4 mb-3 mb-sm-0">
                            <h1 className="mb-0">Dashboard</h1>
                            <div className="small"><span className="font-weight-500 text-primary"> &middot; {moment().format('LLLL')} &middot;</span></div>
                        </div>
                        <div className="dropdown">
                            <Link className="btn btn-white btn-sm font-weight-500 line-height-normal p-3 dropdown-toggle" id="dropdownMenuLink" to="#" role="button" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false"><i className="text-primary mr-2" data-feather="calendar"></i>{moment().format("MMM - Do - YY") }</Link>
                            <div className="dropdown-menu dropdown-menu-sm-right animated--fade-in" aria-labelledby="dropdownMenuLink">
                                <Link className="dropdown-item" to="#!">Last 30 days</Link><Link className="dropdown-item" to="#!">Last week</Link><Link className="dropdown-item" to="#!">This year</Link><Link className="dropdown-item" to="#!">Yesterday</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="#!">Custom</Link>
                            </div>
                        </div>
                    </div>
                    <div className="alert alert-primary border-0 mb-4 mt-5 px-md-5">
                        <div className="position-relative">
                            <div className="row align-items-center justify-content-between">
                                <div className="col position-relative">
                                    <h2 className="text-primary">Welcome back, your dashboard is ready!</h2>
                                    <p className="text-gray-700">Great job, your affiliate dashboard is ready to go! You can view sales, generate links, prepare coupons, and download affiliate reports using this dashboard.</p>
                                    <Link className="btn btn-teal" to="/investment">Get started<i className="ml-1" data-feather="arrow-right"></i></Link>
                                </div>
                                <div className="col d-none d-md-block text-right pt-3"><img className="img-fluid mt-n5" src={IMG} style={{maxWidth: "25rem"}} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-top-0 border-bottom-0 border-right-0 border-left-lg border-blue h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <div className="small font-weight-bold text-blue mb-1">Total Projects</div>
                                            <div className="h6"></div>
                                            <div className="text-xs font-weight-bold text-success d-inline-flex align-items-center"><i className="mr-1" data-feather="trending-up"></i>12%</div>
                                        </div>
                                        <div className="ml-2"><i className="fas fa-dollar-sign fa-2x text-gray-200"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-top-0 border-bottom-0 border-right-0 border-left-lg border-purple h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <div className="small font-weight-bold text-purple mb-1">Total Amount Invested</div>
                                            <div className="h5">$27.00</div>
                                            <div className="text-xs font-weight-bold text-danger d-inline-flex align-items-center"><i className="mr-1" data-feather="trending-down"></i>3%</div>
                                        </div>
                                        <div className="ml-2"><i className="fas fa-tag fa-2x text-gray-200"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-top-0 border-bottom-0 border-right-0 border-left-lg border-green h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <div className="small font-weight-bold text-green mb-1">Investment Balance</div>
                                            <div className="h5">11,291</div>
                                            <div className="text-xs font-weight-bold text-success d-inline-flex align-items-center"><i className="mr-1" data-feather="trending-up"></i>12%</div>
                                        </div>
                                        <div className="ml-2"><i className="fas fa-mouse-pointer fa-2x text-gray-200"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-top-0 border-bottom-0 border-right-0 border-left-lg border-yellow h-100">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1">
                                            <div className="small font-weight-bold text-yellow mb-1">Last Login</div>
                                            <div className="h5">1.23%</div>
                                            <div className="text-xs font-weight-bold text-danger d-inline-flex align-items-center"><i className="mr-1" data-feather="trending-down"></i>1%</div>
                                        </div>
                                        <div className="ml-2"><i className="fas fa-percentage fa-2x text-gray-200"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-xl-3 mb-4">
                           
                           
                            <div className="card bg-secondary border-0">
                                <div className="card-body">
                                    <h5 className="text-white-50">Total Raised</h5>
                                    {totalInvestedCapital()}
                                    <div className="mb-4"><span className="display-4 text-white">₦{totalInvestmentCapital.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</span><span className="text-white-50"> current year</span></div>
                                    <div className="progress bg-white-25 rounded-pill" style={{height: "0.5rem"}}><div className="progress-bar bg-white w-75 rounded-pill" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-xl-9 mb-4">
                        {process()}

{individual === _id || corporate === _id ? '' : Reg()}
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer mt-auto footer-light">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 small">Copyright &copy;<a href="http://ventureramp.com.ng/">ventureramp.com.ng</a> 2020</div>
                        <div className="col-md-6 text-md-right small">
                            <Link to="#!">Privacy Policy</Link>
                            &middot;
                            <Link to="#!">Terms &amp; Conditions</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        </Fragment>
    )
}



  return (
   
    <Fragment>
           {dashboarddashboard()}
          <Header />
            <div id="layoutSidenav">
                <Menu />
                {content()}
            </div>
        </Fragment>
  );
};


export default Home;

