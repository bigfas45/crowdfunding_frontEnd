import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import image from "../img/company.svg";
import image2 from "../img/person-investor.svg";
import {createIssuerApplicationForm, verificationMail} from "./ApiIssuer";
import { Spinner, Button } from "reactstrap";


const IssuerApplicationForm = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        companyname: "",
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
        principalOfficerContactName: "",
        principalOfficerPhonenumber: "",
        principallOfficerEmail: "",
        enquiriesContactName: "",
        enquiriesPhonenumber: "",
        enquiriesEmail: "",
        complianceContactName: "",
        compliancePhonenumber: "",
        complianceEmail: "",
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
        registeredAddress,
        authorisedshare,
        industry,
        estimatedAnnualTurnOver,
        typeofsecurity,
        userId,
        projectDetails,
        estimatedsumtoachieveproject,
        file,
        principalOfficerContactName,
        principalOfficerPhonenumber,
        principallOfficerEmail,
        enquiriesContactName,
        enquiriesPhonenumber,
        enquiriesEmail,
        complianceContactName,
        compliancePhonenumber,
        complianceEmail,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    useEffect(() => {
        setValues({
            ...values,
            formData: new FormData()
        });
    }, []);

    const handleChange = name => event => {
      const value = name === "file" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        formData.append("userId", user._id);
        setValues({
            ...values,
            error: "",
            [name]: value
        });
    };

    const initMail = () => {
      verificationMail( user.email).then(data => {
        if (data.error) {
          setValues({ ...values, error: "mail error" });
        } else {
          setValues({ ...values, success: data });
        }
      });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({
            ...values,
            error: "",
            loading: true
        });
        createIssuerApplicationForm(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({
                    ...values,
                    error: data.error
                });
            } else {
                setValues({
                    companyname: "",
                    dateofincorporation: "",
                    rcnum: "",
                    registeredAddress: "",
                    authorisedshare: "",
                    industry: "",
                    industry: "",
                    estimatedAnnualTurnOver: "",
                    typeofsecurity: "",
                    userId: "",
                    projectDetails: "",
                    projectDescription: "",
                    estimatedsumtoachieveproject: "",
                    principalOfficerContactName: "",
                    principalOfficerPhonenumber: "",
                    principallOfficerEmail: "",
                    enquiriesContactName: "",
                    enquiriesPhonenumber: "",
                    enquiriesEmail: "",
                    complianceContactName: "",
                    compliancePhonenumber: "",
                    complianceEmail: "",
                    loading: false,
                    error: false,
                    createdProduct: data.corporatename,
                    redirectToProfile: true
                });
                {initMail()}
            }
        });
    };

    const showSuccess = () => (
        <div class="alert alert-success alert-dismissible"
            style={
                {
                    display: createdProduct ? "" : "none"
                }
        }>
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                &times;
            </button>
            <h5>
                <i class="icon fas fa-check"></i>
                Alert!
            </h5>
            <span>
                <strong>Success!</strong>
                Project is updated.{" "} </span>
        </div>
    );

    const showError = () => (
        <div class="alert alert-danger alert-dismissible"
            style={
                {
                    display: error ? "" : "none"
                }
        }>
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                &times;
            </button>
            <h5>
                <i class="icon fas fa-ban"></i>
                Alert!
            </h5>
            <span>
                <strong>Error!</strong>
                {error} </span>
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/issuer/verification"/>;
                
            }
        }
    };

    const content = () => {
        return (
            <Fragment>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card box-margin">
                            <div class="card-body">

                                <div class="text-center">
                                    <form method="post" class="f1"
                                        onSubmit={clickSubmit}>
                                        <h3 class="mb-1 font-weight-600">Verify your identity</h3>
                                        <p class="mb-5">Before you can start investing, you need to verify your identity. This means answering a few questions and attaching your ID document.</p>
                                        <div class="f1-steps">
                                            <div class="f1-progress">
                                                <div class="f1-progress-line" data-now-value="16.66" data-number-of-steps="3"
                                                    style={
                                                        {width: "16.66%"}
                                                }></div>
                                            </div>
                                            <div class="f1-step active"
                                                style={
                                                    {width: "300px"}
                                            }>
                                                <div class="f1-step-icon">
                                                    <i class="btn-circle"></i>
                                                </div>
                                                <p>Step 1</p>
                                            </div>
                                            <div class="f1-step"
                                                style={
                                                    {width: "300px"}
                                            }>
                                                <div class="f1-step-icon">
                                                    <i class="btn-circle"></i>
                                                </div>
                                                <p>Step 2</p>
                                            </div>
                                            <div class="f1-step"
                                                style={
                                                    {width: "300px"}
                                            }>
                                                <div class="f1-step-icon">
                                                    <i class="btn-circle"></i>
                                                </div>
                                                <p>Step 3</p>
                                            </div>
                                            <div class="f1-step"
                                                style={
                                                    {width: "300px"}
                                            }>
                                                <div class="f1-step-icon">
                                                    <i class="btn-circle"></i>
                                                </div>
                                                <p>Step 4</p>
                                            </div>
                                        </div>
                                        <fieldset>


                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="form-group col-md-12">
                                                        <label class="control-label">Company Name</label>
                                                        <input onChange={
                                                                handleChange("companyname")
                                                            }
                                                            value={companyname}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Enter Company Name"/>

                                                    </div>


                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">RC Number</label>
                                                        <input onChange={
                                                                handleChange("rcnum")
                                                            }
                                                            value={rcnum}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Enter RC Number"/>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Date of Incorporation</label>
                                                        <input onChange={
                                                                handleChange("dateofincorporation")
                                                            }
                                                            value={dateofincorporation}
                                                            maxlength="100"
                                                            type="date"
                                                            class="form-control"/>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Registered Office Address</label>
                                                        <input onChange={
                                                                handleChange("registeredAddress")
                                                            }
                                                            value={registeredAddress}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>
                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Authorised Share Capital
                                                        </label>
                                                        <input onChange={
                                                                handleChange("authorisedshare")
                                                            }
                                                            value={authorisedshare}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Industry/Sector</label>
                                                        <input onChange={
                                                                handleChange("industry")
                                                            }
                                                            value={industry}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>
                                                    </div>


                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Estimated Annual Income</label>
                                                        <input onChange={
                                                                handleChange("estimatedAnnualTurnOver")
                                                            }
                                                            value={estimatedAnnualTurnOver}
                                                            type=""
                                                            name=""
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Type of Security
                                                        </label>
                                                        <select onChange={
                                                                handleChange("typeofsecurity")
                                                            }
                                                            value={typeofsecurity}
                                                            class="form-control">
                                                            <option label="blank">Select Security</option>
                                                            <option>Equity</option>
                                                            <option>Debt</option>
                                                            <option>Debentures</option>

                                                        </select>
                                                    </div>


                                                </div>

                                            </div>
                                            <div class="f1-buttons">

                                                <button type="button" class="btn btn-success btn-next">Next</button>
                                            </div>
                                        </fieldset>
                                        <fieldset>


                                            <div class="card-body">
                                                <div class="row">
                                                    <h4>Principal Officer Contact (1)</h4>
                                                    <div class="form-group col-md-12">
                                                        <label class="control-label">Name
                                                        </label>
                                                        <input onChange={
                                                                handleChange("principalOfficerContactName")
                                                            }
                                                            value={principalOfficerContactName}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Phone</label>
                                                        <input onChange={
                                                                handleChange("principalOfficerPhonenumber")
                                                            }
                                                            value={principalOfficerPhonenumber}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Email</label>
                                                        <input onChange={
                                                                handleChange("principallOfficerEmail")
                                                            }
                                                            value={principallOfficerEmail}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>


                                                </div>

                                                <div class="row">
                                                    <h4>Principal Officer Contact (2)</h4>
                                                    <div class="form-group col-md-12">
                                                        <label class="control-label">Name
                                                        </label>
                                                        <input onChange={
                                                                handleChange("enquiriesContactName")
                                                            }
                                                            value={enquiriesContactName}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Phone</label>
                                                        <input onChange={
                                                                handleChange("enquiriesPhonenumber")
                                                            }
                                                            value={enquiriesPhonenumber}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Email</label>
                                                        <input onChange={
                                                                handleChange("enquiriesEmail")
                                                            }
                                                            value={enquiriesEmail}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>


                                                </div>


                                                <div class="row">
                                                    <h4>Particulars of Company Secretary</h4>
                                                    <div class="form-group col-md-12">
                                                        <label class="control-label">Name
                                                        </label>
                                                        <input onChange={
                                                                handleChange("complianceContactName")
                                                            }
                                                            value={complianceContactName}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Phone</label>
                                                        <input onChange={
                                                                handleChange("compliancePhonenumber")
                                                            }
                                                            value={compliancePhonenumber}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>
                                                    <div class="form-group col-md-6">
                                                        <label class="control-label">Email</label>
                                                        <input onChange={
                                                                handleChange("complianceEmail")
                                                            }
                                                            value={complianceEmail}
                                                            maxlength="100"
                                                            type="text"
                                                            class="form-control"/>

                                                    </div>

                                                </div>
                                            </div>


                                            <div class="f1-buttons">
                                                <button type="button" class="btn btn-previous">Previous</button>
                                                <button type="button" class="btn btn-success btn-next">Next</button>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <h5 class="mb-3 font-weight-600">Details of project</h5>
                                            <div class="row">
                                                <div class="form-group col-md-12">
                                                    <label class="control-label">Brief description of Project:</label>
                                                    <textarea onChange={
                                                                handleChange("projectDetails")
                                                            }
                                                            value={projectDetails} class="form-control"></textarea>


                                                </div>
                                                <div class="form-group col-md-12">
                                                    <label class="control-label">Estimated sum to achieve Project:</label>
                                                    <input onChange={
                                                                handleChange("estimatedsumtoachieveproject")
                                                            }
                                                            value={estimatedsumtoachieveproject} maxlength="100" type="text" class="form-control"/>

                                                </div>
                                                <div class="form-group col-md-12">
                                                    <label class="control-label">Business Plan: (Upload PDF document)</label>
                                                    <input
                        onChange={handleChange("file")}
                        required=""
                        type="file"
                        name="file"
                        className="dropify"
                        data-height="300"
                      />
                                                </div>


                                            </div>
                                            <div class="f1-buttons">
                                                <button type="button" class="btn btn-previous">Previous</button>
                                                <button type="button" class="btn btn-success btn-next">Next</button>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <h5 class="mb-3 font-weight-600">Social media profiles:</h5>
                                            <h3>Investor declaration</h3>
                                            <p>1. I confirm that all information and documentation either signed or provided herein is true and correct and I further understand that I am responsible for the correctness of all information provided by myself or on my behalf.</p>
                                            <p>2. I have read and understand the contents including the terms and conditions of this application form.</p>
                                            <p>3. Before completing this form, I have read and understand the latest MINIMUM DISCLOSURE DOCUMENTS that are relevant to the crowdfunding investment project(s) of my choice. (Click on the name to download the document.)</p>
                                            <br/>

                                            <div class="form-group col-md-6">

                                                <div class="checkboxes in-row margin-bottom-20">

                                                    <input id="check-a" type="checkbox" name="check"/>
                                                    <label for="check-a">You agree with our
                                                                      Terms Privacy Policy</label>


                                                </div>

                                            </div>
                                            <div class="f1-buttons">
                                                <button type="button" class="btn btn-previous">Previous</button>
                                                {loading && loading ? (<Button className="btn btn-danger" variant="success" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>) : ( <input type="submit" class="btn btn-success btn-submit"   value="Submit" />)}
                                            </div>
                                        </fieldset>
                                    </form>

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
                        <div class="container-fluid">

                            {
                            content()
                        }
                            {redirectUser()  }
                         
                          
                             </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default IssuerApplicationForm;
