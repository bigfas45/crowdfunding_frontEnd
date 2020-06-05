import React, {Component ,  Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { getPaymentByRef, paymentMail, processPayment } from "./ApiCore";
import PaystackButton from 'react-paystack';
import { Link, Redirect } from "react-router-dom";
import Menu from "./Menu"


const Paystack = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [refre, setrefre] = useState([]);

  const [values, setValues] = useState({
    clientToken: null,
    instance: {},
    error: false,
    success:false,
    redirectUser: false
  });

  let paymentId


  const initUpdatePayment =() => {
    processPayment(paymentId, user._id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectUser:true });
      }
    });
  };

  const initMail = () => {
    paymentMail(match.params.refId, user._id, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: "mail error" });
      } else {
        setValues({ ...values, success: data });
      }
    });
  };

const redirect = () => {
  if(values.redirectUser){
    if (!values.error) {
      return <Redirect to={`/invoice/${match.params.refId}`} />;
    }
  }
}

  let callback = (response) => {
    
    if (response.message === 'Success') {
     // console.log(response.message); 
      {initUpdatePayment()}
      {initMail()}
    }
  }

  let close = () => {
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

  // let email, amount
  let key ='pk_live_098c35141fc51e791417dbd444a3f1a152d968df'
  //       const process = () => {
  //           refre.map((r,i) => {
  //             email = r.userId.email
  //             amount = r.amount *100
  //           })
  //       }

  useEffect(() => {
    init(match.params.refId);

  }, []);

  
  const showError = (error) => (
    <div style={{display: error ? '' : 'none'}} className="alert alert-danger alert-dismissible bg-danger text-white border-0 fade show" role="alert">
    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    <strong>Error - </strong> {error}
</div>
  );


  const content = () => {
    return (
      <Fragment>
                <div class="container-fluid mt-n10">

                        {showError(values.error)}

                      

                        {refre.map((r,i) => {
                          paymentId = r._id
                          return (
                            <div className="mt-30" key={i}> 
                              <PaystackButton
                                text="Make Payment"
                                className="payButton"
                                callback={callback}
                                close={close}
                                disabled={true}
                                embed={true}
                                reference={match.params.refId}
                                email={ r.userId.email}
                                amount={r.amount*100}
                                paystackkey={key}
                                tag="button"
                              />
                            </div>
                          );
                        })}
                      </div>
                   
      </Fragment>
    );
  };

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
                          <span>Confirm Payment</span>
                      </h1>
                      <div class="page-header-subtitle"></div>
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

           <main> {
               contentHeader()
           }

           {content()}
              {redirect()}
            
         
           </main>
           {
           footer()
       } </div>
   </div>
</Fragment>
  );
};

export default Paystack;
