import React, {Component ,  Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { getPaymentByRef, getBraintreeClientToken, processPayment } from "./ApiCore";
import Dropln from "braintree-web-drop-in-react";
import PaystackButton from 'react-paystack';

const Paystack = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [refre, setrefre] = useState([]);

  const [values, setValues] = useState({
    clientToken: null,
    instance: {},
    error: false
  });

  const callback = (response) => {
    console.log(response); // card charged successfully, get reference here
  }

  const close = () => {
    console.log("Payment closed");
  }



  const init = refId => {
    getPaymentByRef(refId, user._id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setrefre(data);
      }
    });
  };

  let email, amount
  let key ='pk_test_a3c6eed2d7700ebb41bf5417adeee9ae037f0fdc'
        const process = () => {
            refre.map((r,i) => {
              email = r.userId.email
              amount = r.amount
            })
        }

  useEffect(() => {
    init(match.params.refId);

  }, []);

  
  const showError = (error) => (
    <div style={{display: error ? '' : 'none'}} class="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Error - </strong> {error}
</div>
  );


  const content = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-8">
            <div className="card box-margin">
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <div className="card-body">
                      <div className="checkout-area mb-50">
                 
                        <h4 className="card-title mt-0 mb-3">Fund Project {process()} (₦{amount})</h4>
                        {showError(values.error)}
                        
                          <div className="row">
                          
                          </div>

                          <div className="mt-30">
                          
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
                            </div>
                       
                      </div>
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
            <div className="container-fluid">
              <div className="mt-30">
             
                {content()}</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Paystack;
