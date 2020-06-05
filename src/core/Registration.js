import React, { Fragment } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import Menu from "./Menu"




const Registration = () => {
  

    const content = () => {
        return(
            <Fragment>
<div class="container-fluid mt-n10">
        <div class="container-fluid">

        <div class="card card-default">
         

          <div class="card-body">
            <h3>Verify Your Identity</h3>
                    
            <div class="row">

      
          <div class="col-md-6">
           
              <div class="widget-user-header text-center">
                
                  <img src={image2} alt="User Avatar"/>
                  <p>I want to invest as an individual</p>
                  <p>This will allow you to invest as an individual.</p>
                  <a href="/individual/investor/registration"><button class="btn btn-block btn-primary ">VERIFY AS AN INDIVIDUAL</button></a>
              
              
              </div>
             
            </div>
         
          <div class="col-md-6">
           
              <div class="widget-user-header text-center">
                
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
        </div>
          
            </Fragment>
        )
    }

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
const contentHeader = () => {
  return (
      <Fragment>


          <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
              <div class="container-fluid">
                  <div class="page-header-content">
                      <h1 class="page-header-title">
                          <div class="page-header-icon">
                              <i data-feather="file"></i>
                          </div>
                          <span>Individual Investor Verification</span>
                      </h1>
                      <div class="page-header-subtitle">Register here!</div>
                  </div>
              </div>
          </div>
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
            {contentHeader()}
           {content()}
              
           
           </main>
           {
           footer()
       } </div>
   </div>
</Fragment>
  );
};

export default  Registration 