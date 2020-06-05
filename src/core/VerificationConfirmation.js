import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { verified } from "../auth";
import  '../verificationstyle.css'
import { isAuthenticated } from "../auth";
import { verificationMail } from "./ApiCore";



const Verification = ({match}) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);

    const {
      user: {
          _id,
          firstname,
          lastname,
          email,
          role
      }
  } = isAuthenticated();

    const init = (email) => {
      verificationMail(email).then(data => {
            if (data.error) {
               setError(data.error)
            }else{
                setData(data)
               
      
            }
        });
      };
        
      useEffect(() => {
        init(match.params.email);
      },[]);


    return(
        <Fragment>
       <div class="realoutercontainer">
  <div class="outercontainer">
    <div class="outercontainer2">
      <div class="outercontainer3">
        <div class="outercontainer4">
          <h1>Your Verification has been received!</h1>
          <p class="lead"><strong>We are reviewing your verification , and will get back to you within 1 business day with our approval or a request for more information.</strong></p>
          <p>  <Link class="btn btn-primary btn-sm" to="/investment" role="button"> Invest</Link>.</p>
          
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