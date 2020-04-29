import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import {signup, sendVerificationMail} from '../auth';
import  '../verificationstyle.css'


const Verification = () => {



    return(
        <Fragment>
           <div class="realoutercontainer">
  <div class="outercontainer">
    <div class="outercontainer2">
      <div class="outercontainer3">
        <div class="outercontainer4">
          <h1>Let's get started!</h1>
          <p class="lead"><strong>Please check your email</strong> for further instructions on how to complete your account setup.</p>
          <p class="lead">
    <Link class="btn btn-danger btn-sm" to="/signin" role="button">Continue to signin</Link>
  </p>
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