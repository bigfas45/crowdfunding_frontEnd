import React, {useState, useEffect, Fragment} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import Header from "./Header";
import Menu from "./Menu";
import { getSinglePayment,refundPayment } from "./ApiAdmin";
import { Spinner, Button } from "reactstrap";



const Payment = ({match}) => {

   
    const [values, setValues] = useState({
        transaction: "",
        amount:"",
        currency: "",
        merchant_note: "",
        customer_note:"",
        loading: false,
        error: "",
        createdReport: "",
        redirectToProfile: false,

        formData: ""
      });
    
      const {
        transaction,
        amount,
        currency, 
        merchant_note,
        customer_note,
        loading,
        error,
        createdReport,
        redirectToProfile,
        formData
      } = values;
    
      const { user, token } = isAuthenticated();
    
      const init = (paymentId) => {
        getSinglePayment(paymentId).then(data => {
              if(data.error){
                    setValues({...values, error: data.error})
              }else{
                // populate the state
                setValues({...values, 
                    transaction: data.referenceId, 
                    amount: data.amount, 
                    status: data.status,
                    userId: data.userId,
                     formData: new FormData()})
                // load security
             
              }
          })
      }

      useEffect(() => {
        init(match.params.paymentId);
      }, []);
    

      const handleChange = name => event => {
        const value = event.target.value;
        formData.set(name, value);
        // formData.append("transaction", transaction);
        // formData.append("amount", amount);
        // formData.append("currency", "NGN");
        setValues({ ...values, [name]: value });
      };
    


      const clickSubmit = event => {
        //
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
    
        refundPayment(formData).then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              ...values,
            
              loading: false,
              error: false,
              redirectToProfile: true,
              createdReport: data.title
            });
          }
        });
      };

    const refundForm = () => {
        return (<Fragment>

            <div class="container-fluid mt-n10">
                <div class="row">
                    <div class="offset-3 col-lg-6">
                        <div id="default">
                            <div class="card mb-4">
                                <div class="card-header">Category Form Controls</div>
                                <div class="card-body"> 
                                  
                                    <div class="sbp-preview">
                                        <div class="sbp-preview-content">
                                            <form onSubmit={clickSubmit}>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Transaction Id</label>
                                                    <input 
                                                       onChange={handleChange("transaction")}
                                                        value={transaction}
                                                        class="form-control"
                                                        id="exampleFormControlInput1"
                                                        type="text"
                                                     
                                                        placeholder="Enter category name"/>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Amount</label>
                                                    <input 
                                                     onChange={handleChange("amount")}
                                                    value={amount}
                                                        class="form-control"
                                                        id="exampleFormControlInput1"
                                                        type="text"
                                                      
                                                        placeholder="Enter category name"/>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Currency</label>
                                                    <input 
                                                     onChange={handleChange("currency")}
                                                        value={currency}
                                                        class="form-control"
                                                        id="exampleFormControlInput1"
                                                        type="text"
                                                      
                                                        placeholder="Enter category name"/>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Merchant Note</label>
                                                    <input 
                                                     onChange={handleChange("merchant_note")}
                                                     value={merchant_note}
                                                        class="form-control"
                                                        id="exampleFormControlInput1"
                                                        type="text"
                                                        placeholder="Enter Merchant Note"/>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleFormControlInput1">Customer Note</label>
                                                    <input 
                                                     onChange={handleChange("customer_note")}
                                                     value={customer_note}
                                                        class="form-control"
                                                        id="exampleFormControlInput1"
                                                        type="text"
                                                        placeholder="Enter Customer Note"/>
                                                </div>

                                                {loading && loading ? (<Button className="btn btn-danger float-right" variant="success" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>) : ( <input type="submit"  className="btn btn-success float-right"   value="Submit" />)}


                                               </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                   </div>
            </div>


        </Fragment>)
    }

   

    const footer = () => {
        return (<Fragment>
            <footer class="footer mt-auto footer-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy;
                            <a href="ventureramp.com.ng">ventureramp.com.ng</a>
                            2020</div>
                        <div class="col-md-6 text-md-right small">
                            <a href="#!">Privacy Policy</a>
                            &middot;
                            <a href="#!">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>)
      }
      
      const contentHeader = () => {
        return (<Fragment>
      
      
            <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                <div class="container-fluid">
                    <div class="page-header-content">
                        <h1 class="page-header-title">
                            <div class="page-header-icon">
                                <i data-feather="file"></i>
                            </div>
                            <span>Refund </span>
                        </h1>
                        <div class="page-header-subtitle"></div>
                    </div>
                </div>
            </div>
        </Fragment>)
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

                {refundForm()}
      
                  
              
                </main>
                {
                footer()
            } </div>
        </div>
      </Fragment>
    )
    

}


export default Payment