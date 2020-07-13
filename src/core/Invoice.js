import React, {Component ,  Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import { getPaymentByRef } from "./ApiCore";
import Menu from "./Menu"
import moment from 'moment';

const Invoice = ({ match }) => {

    const { user, token } = isAuthenticated();
    const [refre, setrefre] = useState([]);
    const [error, setError] = useState(false);
  


    const init = refId => {
        getPaymentByRef(refId, user._id, token).then(data => {
          if (data.error) {
           setError(data.error)
          } else {
            setrefre(data);
          }
        });
      };


      
  useEffect(() => {
    init(match.params.refId);
  }, []);


    const content = () => {
        return(
            <Fragment>
                {refre.map((r,i) => {
                    return(

     <div class="container-fluid mt-n10">
 <div class="row" key={i}>
                        <div class="offset-xl-2 col-xl-8">
                         
                            <div class="card mb-30">
                                <div class="card-body p-5">
                                    <div class="row align-items-center mb-3">
                                        <div class="col">
                                          
                                            <h6 class="font-14">Payments</h6>
                                           
                                     <p>Invoice {r.referenceId}</p>

                                        </div>
                                        <div class="col-auto">
                                           
                                          
                                            <a href="#!" class="btn btn-primary ml-2">
                                                PAID
                                            </a>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col text-right">
                                         
                                            <div class="badge badge-success">
                                                settled
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col text-center">
                                          
                                            <img src="https://nasdng.com/wp-content/uploads/2020/02/logo.png" style={{width: "130px"}} alt="..." class="img-fluid mb-4"/>

                                          
                                            <h5 class="mb-1">Invoice from NASD</h5>

                                       
                                            <p class="mb-30">
                                                Invoice {r.referenceId}
                                            </p>

                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-12 col-md-6">

                                            <h6 class="text-uppercase font-12 text-muted">Invoiced from</h6>

                                            <p class="text-muted mb-4">
                                                <strong class="text-body font-16 text-dark">NASD</strong> <br/>
                                                NASD PLC   <br/>
                                                9th Floor, UBA House,   <br/>
                                                57 Marina, Lagos State,   <br/>
                                                Nigeria   
                                            </p>

                                            <h6 class="text-uppercase text-muted font-12">
                                                Invoiced ID
                                            </h6>

                                            <p class="mb-4 text-dark">
                                            {r.referenceId}
                                            </p>

                                        </div>
                                        <div class="col-12 col-md-6 text-md-right">

                                            <h6 class="text-uppercase font-12 text-muted">
                                                Invoiced to
                                            </h6>

                                            <p class="text-muted mb-4">
                                                <strong class="text-body font-16 text-dark">{user.lastname} &nbsp; {user.firstname}</strong> <br/>
                                               {user.email}<br />
                                                {/* Acquisitions at Themers <br/>
                                                238 Main St., #201 <b/>
                                                Los Angeles, CA */}
                                            </p>

                                            <h6 class="text-uppercase text-muted font-12">
                                                Due date
                                            </h6>

                                            <p class="mb-4 text-dark">
                                                <time datetime="2019-10-15">{moment().format('ll')}</time>
                                            </p>

                                        </div>
                                    </div> 
                                    <div class="row">
                                        <div class="col-12">

                                       
                                            <div class="table-responsive">
                                                <table class="table my-4">
                                                    <thead>
                                                        <tr>
                                                            <th class="px-0 bg-transparent border-top-0">
                                                                <span class="font-14">Project</span>
                                                            </th>
                                                            <th class="px-0 bg-transparent border-top-0">
                                                                <span class="font-14">Type</span>
                                                            </th>
                                                            <th class="px-0 bg-transparent border-top-0 text-right">
                                                                <span class="font-14">Cost</span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td class="px-0">
                                                              {r.projectId.title}
                                                            </td>
                                                            <td class="px-0">
                                                            {r.projectId.projectType}
                                                            </td>
                                                            <td class="px-0 text-right">
                                                            ₦{r.amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                                            </td>
                                                        </tr>
                                                       
                                                        
                                                        <tr>
                                                            <td class="px-0 border-top border-top-2">
                                                                <strong>Total amount due</strong>
                                                            </td>
                                                            <td colspan="2" class="px-0 text-right border-top border-top-2">
                                                                <span class="font-20">
                                                                ₦{r.amount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <hr class="my-5"/>

                                        
                                            <h6 class="text-uppercase">
                                                Notes
                                            </h6>

                                          
                                            <p class="text-muted mb-0">
                                                We really appreciate your business and if there’s anything else we can do, please let us know! Also, should you need us to add VAT or anything else to this order, it’s super easy since this is a template, so just ask!
                                            </p>

                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>

                       
                       
                        </div>
                        </div>
                         )
                        })}
            </Fragment>
        )
    }


    const footer = () => {
        return (<Fragment>
            <footer class="footer mt-auto footer-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy; <a href="http://ventureramp.com.ng/">ventureramp.com.ng</a> 2020</div>
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
      return (
          <Fragment>
    
    
              <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                  <div class="container-fluid">
                      <div class="page-header-content">
                          <h1 class="page-header-title">
                              <div class="page-header-icon">
                                  <i data-feather="file"></i>
                              </div>
                              <span>Invoice</span>
                          </h1>
                          <div class="page-header-subtitle">Invoice Info</div>
                      </div>
                  </div>
              </div>
          </Fragment>
      )
    
    }



    return(
        <Fragment>
        <Header/>
       <div id="layoutSidenav">
           <Menu/>
           <div id="layoutSidenav_content">
    
               <main> {
                   contentHeader()
               }
    
               {content()}
               
             
               </main>
               {
               footer()
           } </div>
       </div>
    </Fragment>
    )

}


export default Invoice