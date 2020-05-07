import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link, Redirect} from "react-router-dom";
import {getCorporateRApplication, updateCorporateStatus, declineCorporateStatusUpdate, sendDeclineMail, sendApprovedMail} from "./ApiAdmin";
import Footer from "./Footer";
import {isAuthenticated} from "../auth";
import {API} from '../config';
import swal from "sweetalert";



const CorporateApplicationUpdate = ({match}) => {
    let count = 0;
    const {
        user: {
            _id,
            firstname,
            lastname,
            email,
            role
        },
        token
    } = isAuthenticated();

    const [values, setValues] = useState({
        accountNumber: "",
        bankName: "",
        complianceContactName: "",
        complianceEmail: "",
        compliancePhonenumber: "",
        corporatename: "",
        createdAt: "",
        currency: "",
        dateofincorporation: "",
        enquiriesContactName: "",
        enquiriesEmail: "",
        enquiriesPhonenumber: "",
        estimatedAnnualTurnOver: "",
        industry2: "",
        officailEmailAddress: "",
        officialPhoneNumber: "",
        principalOfficerContactName: "",
        principalOfficerPhonenumber: "",
        principallOfficerEmail: "",
        rcnum: "",
        emailUser:"",
        registeredAddress: "",
      loading: false,
      error: "",
      createdProduct: "",
      redirectToProfile: false,
      formData: ""
  });

  const {
    accountNumber,
    bankName,
    complianceContactName,
    complianceEmail,
    compliancePhonenumber,
    corporatename,
    createdAt,
    currency,
    dateofincorporation,
    enquiriesContactName,
    enquiriesEmail,
    enquiriesPhonenumber,
    estimatedAnnualTurnOver,
    industry2,
    officailEmailAddress,
    officialPhoneNumber,
    principalOfficerContactName,
    principalOfficerPhonenumber,
    principallOfficerEmail,
    rcnum,
    emailUser,
    registeredAddress,
      loading,
      error,
      createdProduct,
      redirectToProfile,
      formData
  } = values;

    const init = (id) => {
        getCorporateRApplication(id, _id, token).then(data => {
            if (data.error) {
              setValues({...values, error: data.error})
            } else {
              setValues({...values, 
                accountNumber: data.accountNumber,
                bankName: data.bankName,
                complianceContactName: data.complianceContactName,
                complianceEmail: data.complianceEmail,
                compliancePhonenumber: data.compliancePhonenumber,
                corporatename: data.corporatename,
                createdAt: data.createdAt,
                currency: data.currency,
                dateofincorporation: data.dateofincorporation,
                enquiriesContactName: data.enquiriesContactName,
                enquiriesEmail: data.enquiriesEmail,
                enquiriesPhonenumber: data.enquiriesPhonenumber,
                estimatedAnnualTurnOver: data.estimatedAnnualTurnOver,
                industry2: data.industry,
                officailEmailAddress: data.officailEmailAddress,
                officialPhoneNumber: data.officialPhoneNumber,
                principalOfficerContactName: data.principalOfficerContactName,
                principalOfficerPhonenumber: data.principalOfficerPhonenumber,
                principallOfficerEmail: data.principallOfficerEmail,
                rcnum: data.rcnum,
                emailUser: data.userId.email,
                registeredAddress: data.registeredAddress,
                redirectToProfile: true,
                 formData: new FormData()})
            }
        });
    };

    const back = () => {
      if (redirectToProfile) {
        if (!error) {
          return <Redirect to="/issuer/project/manage"/>
        }
      }
    };

    const dashboarddashboard = (title, text) => {
      swal({
        title: ` ${title}`,
        text: `${text}`,
        icon: "success"
      });
    };

  
  

    const declineMail = () => {
      sendDeclineMail(emailUser).then(data => {
          if (data.error) {
              console.log(data.error);
          }else{
           
          }
      })
  }


  const approveMail = () => {
    sendApprovedMail(emailUser).then(data => {
        if (data.error) {
            console.log(data.error);
        }else{
        
        }
    })
}




    const update = id => {
      updateCorporateStatus(id, _id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          }else{
            approveMail()
            dashboarddashboard("Application Approved", `You have just approved the application of ${corporatename}, an email as also be sent to notify the user `)
         
          }
      })
  }


 

  const decline = id => {
    declineCorporateStatusUpdate(id, _id, token).then(data => {
        if (data.error) {
            console.log(data.error);
        }else{
          declineMail()
          dashboarddashboard("Application Declined", `You have just declined the application of ${corporatename}, an email as also be sent to notify the user `)

        }
    })
}

    useEffect(() => {
        init(match.params.Id);
    }, []);


    


    const body = () => {
        return (
            <Fragment>
                <div class="row">
                    <div class="col-12">
                        <div class="card mb-30">
                            <div class="card-body">
                                <h6 class="card-title mb-30">Issure Application For {firstname}
                                </h6>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="row mb-2">
                                                <label for="proid" class="col-md-3">accountNumber</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={accountNumber} class="form-control" id="proid" name="productid" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_sku"  class="col-md-3">bankName</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={bankName} class="form-control" name="product_sku" readOnly maxlength="15" id="product_sku"/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_name" class="col-md-3">complianceContactName</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={complianceContactName} class="form-control" name="product_name" id="product_name" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_price" class="col-md-3">complianceEmail</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={complianceEmail} class="form-control" name="product_price" id="product_price" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="selling_price" class="col-md-3">compliancePhonenumber</label>
                                                <div class="col-md-9">
                                                    <input type="number" value={compliancePhonenumber}  class="form-control" name="selling_price" id="selling_price" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount" class="col-md-3">corporatename</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={corporatename}  class="form-control" name="discount" id="discount" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount_starts" class="col-md-3">currency</label>
                                                <div class="col-md-9">
                                                    <input class="form-control  datepicker" value={estimatedAnnualTurnOver}  type="text" name="discount_starts" id="discount_starts" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount_ends" class="col-md-3">dateofincorporation</label>
                                                <div class="col-md-9">
                                                    <input class="form-control datepicker" value={dateofincorporation}  type="text" name="discount_ends" id="discount_ends" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="quantity" class="col-md-3">enquiriesContactName</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={enquiriesContactName}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="color" class="col-md-3">enquiriesEmail</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={enquiriesEmail}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="color" class="col-md-3">enquiriesPhonenumber</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={enquiriesPhonenumber}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="size" class="col-md-3">estimatedAnnualTurnOver</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={estimatedAnnualTurnOver}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="size" class="col-md-3">Industry</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={industry2}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row mb-2">
                                                <label for="category" class="col-md-3">officailEmailAddressl</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={officailEmailAddress}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="sub_category" class="col-md-3">officialPhoneNumber</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={officialPhoneNumber}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="sub_category" class="col-md-3">principalOfficerContactName</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={principalOfficerContactName}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="brand" class="col-md-3">principalOfficerPhonenumber</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={principalOfficerPhonenumber}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="summary" class="col-md-3">principallOfficerEmail</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="summary" value={principallOfficerEmail}  name="summary" rows="6" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">rcnum</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={rcnum}  name="details" rows="1" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">registeredAddress</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={registeredAddress}  name="details" rows="1" readOnly></textarea>
                                                </div>
                                            </div>
                                            {/* <div class="row mb-2">
                                                <label for="summary" class="col-md-3">Document</label>
                                                <div class="col-md-4">
                                                <a href={`${API}/issuer/application/file/${applicationId}/${_id}`} >
                                                <div class="avatar-box thumb-xl align-self-center mr-2"><span class="avatar-title bg-soft-success rounded">
                                                DOC
                                                
                                                </span></div></a>  </div>
                                            </div> */}
                                        </div>
                                    </div>
                                   
                                

                                <div class="row mt-30">
                                        <div class="col-12">
                                            <button onClick={() => update(match.params.Id) }  id="btnSubmit" class="btn btn-success mr-2">Submit</button>
                                            <button onClick={() => decline(match.params.Id) }  name="submit" id="btnSubmit" class="btn btn-danger ml-2">Decline</button>
                                          <Link to={`/admin/corporate/application`} > <button  name="submit" id="btnSubmit" class="btn btn-primary ml-2">Back</button></Link>

                                        </div>
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }

    return (

        <Fragment>
            <div className="ecaps-page-wrapper">
                <Aside></Aside>
                <div className="ecaps-page-content">
                    <Header></Header>
                    <div className="main-content">
                        <div class="container-fluid">
                            {
                            body()
                        } 
                     
                        
                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    )


}


export default CorporateApplicationUpdate

