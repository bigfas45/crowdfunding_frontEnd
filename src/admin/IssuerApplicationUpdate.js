import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link, Redirect} from "react-router-dom";
import {getIssuerPApplication, updateStatus, declineStatusUpdate, sendDeclineMail, sendApprovedMail} from "./ApiAdmin";
import Footer from "./Footer";
import {isAuthenticated} from "../auth";
import {API} from '../config';
import swal from "sweetalert";



const IssuerApplicationUpdate = ({match}) => {
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
      companyname: "",
      applicationId:"",
      dateofincorporation: "",
      rcnum: "",
      registeredAddress: "",
      authorisedshare: "",
      industry: "",
      estimatedAnnualTurnOver: "",
      typeofsecurity: "",
      userId: "",
      projectDetails: "",
      projectDescription: "",
      estimatedsumtoachieveproject: "",
      file: "",
      first:"",
      principalOfficerContactName: "",
      principalOfficerPhonenumber: "",
      principallOfficerEmail: "",
      enquiriesContactName: "",
      enquiriesPhonenumber: "",
      enquiriesEmail: "",
      complianceContactName: "",
      compliancePhonenumber: "",
      complianceEmail: "",
      emailUser: "",
      loading: false,
      error: "",
      createdProduct: "",
      redirectToProfile: false,
      formData: ""
  });

  const {
      companyname,
      dateofincorporation,
      rcnum,
      applicationId,
      registeredAddress,
      authorisedshare,
      industry,
      estimatedAnnualTurnOver,
      typeofsecurity,
      userId,
      projectDetails,
      estimatedsumtoachieveproject,
      file,
      first,
      principalOfficerContactName,
      principalOfficerPhonenumber,
      principallOfficerEmail,
      enquiriesContactName,
      enquiriesPhonenumber,
      enquiriesEmail,
      complianceContactName,
      compliancePhonenumber,
      complianceEmail,
      emailUser,
      loading,
      error,
      createdProduct,
      redirectToProfile,
      formData
  } = values;

    const init = (id) => {
      getIssuerPApplication(id, _id, token).then(data => {
            if (data.error) {
              setValues({...values, error: data.error})
            } else {
              setValues({...values, 
                companyname: data.companyname, 
                dateofincorporation: data.dateofincorporation, 
                rcnum: data.rcnum,
                applicationId: data._id,
                registeredAddress: data.registeredAddress,
                authorisedshare: data.authorisedshare,
                industry: data.industry,
                estimatedAnnualTurnOver: data.estimatedAnnualTurnOver,
                typeofsecurity: data.typeofsecurity,
                firstname: data.userId.firstname,
                emailUser: data.userId.email,
                projectDetails: data.projectDetails,
                estimatedsumtoachieveproject: data.estimatedsumtoachieveproject,
                principalOfficerContactName: data.principalOfficerContactName,
                principalOfficerPhonenumber: data.principalOfficerPhonenumber,
                principallOfficerEmail: data.principallOfficerEmail,
                enquiriesContactName: data.enquiriesContactName,
                enquiriesPhonenumber: data.enquiriesPhonenumber,
                enquiriesEmail: data.enquiriesEmail,
                complianceContactName: data.complianceContactName,
                compliancePhonenumber: data.compliancePhonenumber,
                complianceEmail: data.complianceEmail,
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
      updateStatus(id, _id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          }else{
            approveMail()
            dashboarddashboard("Application Approved", `You have just approved the application of ${companyname}, an email as also be sent to notify the user `)
         
          }
      })
  }


 

  const decline = id => {
    declineStatusUpdate(id, _id, token).then(data => {
        if (data.error) {
            console.log(data.error);
        }else{
          declineMail()
          dashboarddashboard("Application Declined", `You have just declined the application of ${companyname}, an email as also be sent to notify the user `)

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
                                                <label for="proid" class="col-md-3">Company Name</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={companyname} class="form-control" id="proid" name="productid" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_sku"  class="col-md-3">RC Number</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={rcnum} class="form-control" name="product_sku" readOnly maxlength="15" id="product_sku"/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_name" class="col-md-3">Date of Incorporation</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={dateofincorporation} class="form-control" name="product_name" id="product_name" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_price" class="col-md-3">Registered Office Address</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={registeredAddress} class="form-control" name="product_price" id="product_price" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="selling_price" class="col-md-3">Authorised Share Capital</label>
                                                <div class="col-md-9">
                                                    <input type="number" value={authorisedshare}  class="form-control" name="selling_price" id="selling_price" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount" class="col-md-3">Industry/Sector</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={industry}  class="form-control" name="discount" id="discount" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount_starts" class="col-md-3">Estimated Annual Income</label>
                                                <div class="col-md-9">
                                                    <input class="form-control  datepicker" value={estimatedAnnualTurnOver}  type="text" name="discount_starts" id="discount_starts" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount_ends" class="col-md-3">Type of Security</label>
                                                <div class="col-md-9">
                                                    <input class="form-control datepicker" value={typeofsecurity}  type="text" name="discount_ends" id="discount_ends" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="quantity" class="col-md-3">Principal Officer Name</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={principalOfficerContactName}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="color" class="col-md-3">Principal Officer Email</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={principallOfficerEmail}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="color" class="col-md-3">Principal Officer Phone Number</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={principallOfficerEmail}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="size" class="col-md-3">Enquiries Contact Name</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={enquiriesContactName}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="quantity" class="col-md-3">Enquiries Phone Number</label>
                                                <div class="col-md-9">
                                                    <input type="number" class="form-control" value={enquiriesPhonenumber}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row mb-2">
                                                <label for="category" class="col-md-3">Enquiries Email</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={enquiriesEmail}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="sub_category" class="col-md-3">Compliance Contact Name</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={complianceContactName}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="brand" class="col-md-3">Compliance Phone Number</label>
                                                <div class="col-md-9">
                                                    <input type="number" class="form-control" value={compliancePhonenumber}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="brand" class="col-md-3">Compliance Email</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={complianceEmail}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="summary" class="col-md-3">project Details</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="summary" value={projectDetails}  name="summary" rows="6" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">Estimated sum toachieve project</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={estimatedsumtoachieveproject}  name="details" rows="1" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="summary" class="col-md-3">Document</label>
                                                <div class="col-md-4">
                                                <a href={`${API}/issuer/application/file/${applicationId}/${_id}`} >
                                                <div class="avatar-box thumb-xl align-self-center mr-2"><span class="avatar-title bg-soft-success rounded">
                                                DOC
                                                
                                                </span></div></a>  </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                

                                <div class="row mt-30">
                                        <div class="col-12">
                                            <button onClick={() => update(match.params.Id) }  id="btnSubmit" class="btn btn-success mr-2">Submit</button>
                                            <button onClick={() => decline(match.params.Id) }  name="submit" id="btnSubmit" class="btn btn-danger ml-2">Decline</button>
                                          <Link to={`/admin/issuer/application`} > <button  name="submit" id="btnSubmit" class="btn btn-primary ml-2">Back</button></Link>

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


export default IssuerApplicationUpdate

