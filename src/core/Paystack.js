import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import ShowImage from './ShowImage';
import randomstring from "randomstring";
import { getPaymentByRef } from "./ApiCore";
import PaystackButton from "react-paystack";

const Paystack = ({match}) => {
    const { user, token } = isAuthenticated();

      const [refre, setrefre] = useState([])
      const [error, setError] = useState(false)

     


      const init = refId => {
        getPaymentByRef(refId, user._id, token).then(data => {
          if (data.error) {
           setError(data.error)
          } else {
            setrefre(data);
          }
        });
      };

let email, amount
      const process = () => {
          refre.map((r,i) => {
            email = r.userId.email
            amount = r.amount
          })
      }

      
    
    
      

    
      useEffect(() => {
        init(match.params.refId);
      }, []);

      const [key, setKey] = useState(
        "pk_test_a3c6eed2d7700ebb41bf5417adeee9ae037f0fdc"
      );
   
    
      const callback =  response => {
        console.log(response); // card charged successfully, get reference here
      };
      const close = () => {
        console.log("Payment closed");
      };




      return (
        <Fragment>
          <div className="ecaps-page-wrapper">
            <Aside></Aside>
            <div className="ecaps-page-content">
              <Header></Header>
              <div className="main-content">
                <div class="container-fluid">
                <div>
            <p>
                {process()}
                <PaystackButton
                text="Make Payment"
                class="payButton"
                callback={callback()}
                close={close()}
                disabled={true} 
                embed={true} 
                reference={match.params.refId}
                email={email}
                amount={amount}
                paystackkey={key}
                tag="button"
              />
            </p>
          </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );

    }

    export default Paystack