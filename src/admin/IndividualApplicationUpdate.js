import React, {Fragment, useState, useEffect} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link, Redirect} from "react-router-dom";
import {getIndividualPApplication, updateIndividualStatus, declineIndividualStatusUpdate, sendIndividualDeclineMail, sendIndividualApprovedMail} from "./ApiAdmin";
import Footer from "./Footer";
import {isAuthenticated} from "../auth";
import {API} from '../config';
import swal from "sweetalert";



const IndividualApplicationUpdate = ({match}) => {
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
        address: "",
        city: "",
        countryOfResidence: "",
        currency: "",
        dob2: "",
        emailUser: "",
        estimatedAnnualIncome: "",
        estimatedAnnualTurnOver: "",
        firstnameUser: "",
        gender: "",
        identification: "",
        industry: "",
        lastnameUser: "",
        maidenname: "",
        maximumAmountForInvestment: "",
        middlename: "",
        nationality: "",
        occupation: "",
        originOfFunds: "",
        state: "",
        telephone: "",
        title: "Mr",
      loading: false,
      error: "",
      createdProduct: "",
      redirectToProfile: false,
      formData: ""
  });

  const {
    address,
    city,
    countryOfResidence,
    currency,
    dob2,
    emailUser,
    estimatedAnnualIncome,
    estimatedAnnualTurnOver,
    firstnameUser,
    gender,
    identification,
    industry,
    lastnameUser,
    maidenname,
    maximumAmountForInvestment,
    middlename,
    nationality,
    occupation,
    originOfFunds,
    state,
    telephone,
    title,
      loading,
      error,
      createdProduct,
      redirectToProfile,
      formData
  } = values;

    const init = (id) => {
        getIndividualPApplication(id, _id, token).then(data => {
            if (data.error) {
              setValues({...values, error: data.error})
            } else {
              setValues({...values, 
                address: data.address,
                city: data.city,
                countryOfResidence: data.countryOfResidence,
                currency:data.currency,
                dob2: data.dob,
                emailUser:  data.userId.email,
                estimatedAnnualIncome: data.estimatedAnnualIncome,
                estimatedAnnualTurnOver: data.estimatedAnnualTurnOver,
                firstnameUser: data.firstname,
                gender: data.gender,
                identification: data.identification,
                industry: data.industry,
                lastnameUser: data.lastname,
                maidenname: data.maidenname,
                maximumAmountForInvestment: data.maximumAmountForInvestment,
                middlename: data.middlename,
                nationality: data.nationality,
                occupation: data.occupation,
                originOfFunds: data.originOfFunds,
                state: data.state,
                telephone: data.telephone,
                title: data.title,
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
      sendIndividualDeclineMail(emailUser).then(data => {
          if (data.error) {
              console.log(data.error);
          }else{
           
          }
      })
  }


  const approveMail = () => {
    sendIndividualApprovedMail(emailUser).then(data => {
        if (data.error) {
            console.log(data.error);
        }else{
        
        }
    })
}




    const update = id => {
      updateIndividualStatus(id, _id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          }else{
            approveMail()
            dashboarddashboard("Application Approved", `You have just approved the application of ${firstnameUser}, an email as also be sent to notify the user `)
         
          }
      })
  }


 

  const decline = id => {
    declineIndividualStatusUpdate(id, _id, token).then(data => {
        if (data.error) {
            console.log(data.error);
        }else{
          declineMail()
          dashboarddashboard("Application Declined", `You have just declined the application of ${firstnameUser}, an email as also be sent to notify the user `)

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
                                                <label for="proid" class="col-md-3">address</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={address} class="form-control" id="proid" name="productid" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_sku"  class="col-md-3">city</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={city} class="form-control" name="product_sku" readOnly maxlength="15" id="product_sku"/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_name" class="col-md-3">country of residence</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={countryOfResidence} class="form-control" name="product_name" id="product_name" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_price" class="col-md-3">currency</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={currency} class="form-control" name="product_price" id="product_price" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_price" class="col-md-3">dob</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={dob2} class="form-control" name="product_price" id="product_price" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount" class="col-md-3">emailUser</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={emailUser}  class="form-control" name="discount" id="discount" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount_starts" class="col-md-3">estimated annual income</label>
                                                <div class="col-md-9">
                                                    <input class="form-control  datepicker" value={estimatedAnnualIncome}  type="text" name="discount_starts" id="discount_starts" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="discount_ends" class="col-md-3">estimated annual turnOver</label>
                                                <div class="col-md-9">
                                                    <input class="form-control datepicker" value={estimatedAnnualTurnOver}  type="text" name="discount_ends" id="discount_ends" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="quantity" class="col-md-3">firstname</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={firstnameUser}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="color" class="col-md-3">gender</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={gender}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="color" class="col-md-3">identification</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={identification}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="size" class="col-md-3">industry</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={industry}  name="quantity" id="quantity" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="product_price" class="col-md-3">dob</label>
                                                <div class="col-md-9">
                                                    <input type="text" value={lastnameUser} class="form-control" name="product_price" id="product_price" readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row mb-2">
                                                <label for="category" class="col-md-3">maidenname</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={maidenname}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="sub_category" class="col-md-3">maximum amount for investment</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={maximumAmountForInvestment}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="sub_category" class="col-md-3">Middle Name</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={middlename}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="brand" class="col-md-3">nationality</label>
                                                <div class="col-md-9">
                                                    <input type="text" class="form-control" value={nationality}  name="barcode" id="barcode" readOnly/>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="summary" class="col-md-3">occupation</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="summary" value={occupation}  name="summary" rows="6" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">origin of funds</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={originOfFunds}  name="details" rows="1" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">state</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={state}  name="details" rows="1" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">telephone</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={telephone}  name="details" rows="1" readOnly></textarea>
                                                </div>
                                            </div>
                                            <div class="row mb-2">
                                                <label for="details" class="col-md-3">title</label>
                                                <div class="col-md-9">
                                                    <textarea class="form-control" id="details" value={title}  name="details" rows="1" readOnly></textarea>
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
                                          <Link to={`/admin/individual/application`} > <button  name="submit" id="btnSubmit" class="btn btn-primary ml-2">Back</button></Link>

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


export default IndividualApplicationUpdate

