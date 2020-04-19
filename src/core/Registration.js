import React, { Fragment } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';




const Registration = () => {
  

    const content = () => {
        return(
            <Fragment>
    <section class="content">
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
        </section>
                              
            
          
       
       
          
     
 

            </Fragment>
        )
    }


  return (
    <Fragment>
    <Header></Header>
    <Aside></Aside>
    <div class="content-wrapper">
        {content()}
    </div>

    </Fragment>
  );
};

export default  Registration 