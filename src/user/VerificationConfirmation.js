import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { verified } from "../auth";
import  '../verificationstyle.css'



const Verification = ({match}) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const init = (userId) => {
        verified(userId).then(data => {
            if (data.error) {
               setError(data.error)
            }else{
                setData(data)
               
      
            }
        });
      };
        
      useEffect(() => {
        init(match.params.userId);
      },[]);


    return(
        <Fragment>
       <div class="realoutercontainer">
  <div class="outercontainer">
    <div class="outercontainer2">
      <div class="outercontainer3">
        <div class="outercontainer4">
          <h1>Your account has been verified!</h1>
          <p class="lead"><strong>Thank you for verifying your account and beginning the application process for NASD Crowdfunding</strong></p>
          <p>From now on, you will be able to access your application by logging into the NASD Crowdfunding Platform with your email address and password at  <Link class="btn btn-primary btn-sm" to="/signin" role="button"> Signin</Link>.</p>
          
          </div>
      </div>
    </div>
  </div>

  <div class="common-rectangleGrid original">
  
    <div class="backgroundContainer">
      <div class="grid">
        <div class="background"></div>
      </div>
    </div>
 
    <div class="rectangleContainer">
      <div class="grid">
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
      </div>
    </div>
  </div>
</div>
        </Fragment>
    )


}

export default Verification