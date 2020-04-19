import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import image from "../img/company.svg";
import image2 from "../img/person-investor.svg";
import { createCorporateInvestorApplicationForm } from "./ApiCore";

const CorporateInvestorForm = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    corporatename: "",
    dateofincorporation: "",
    rcnum: "",
    registeredAddress: "",
    officailEmailAddress: "",
    officialPhoneNumber: "",
    industry: "",
    estimatedAnnualTurnOver: "",
    userId: "",
    currency: "",
    bankName: "",
    accountNumber: "",
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
    corporatename,
    dateofincorporation,
    rcnum,
    registeredAddress,
    officailEmailAddress,
    officialPhoneNumber,
    industry,
    estimatedAnnualTurnOver,
    userId,
    currency,
    bankName,
    accountNumber,
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
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = name => event => {
    const value = event.target.value;
    formData.set(name, value);
    formData.append("userId", user._id);
    setValues({ ...values, error: "", [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createCorporateInvestorApplicationForm(user._id, token, formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            corporatename: "",
            dateofincorporation: "",
            dateofincorporation: "",
            dateofincorporation: "",
            registeredAddress: "",
            officailEmailAddress: "",
            officialPhoneNumber: "",
            industry: "",
            estimatedAnnualTurnOver: "",
            userId: "",
            currency: "",
            bankName: "",
            accountNumber: "",
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
        }
      }
    );
  };

  const showSuccess = () => (
    <div
      class="alert alert-success alert-dismissible"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        &times;
      </button>
      <h5>
        <i class="icon fas fa-check"></i> Alert!
      </h5>
      <span>
        <strong>Success!</strong> Project is updated.{" "}
      </span>
    </div>
  );

  const showError = () => (
    <div
      class="alert alert-danger alert-dismissible"
      style={{ display: error ? "" : "none" }}
    >
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-hidden="true"
      >
        &times;
      </button>
      <h5>
        <i class="icon fas fa-ban"></i> Alert!
      </h5>
      <span>
        <strong>Error!</strong> {error}
      </span>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/" />;
      }
    }
  };

  const content = () => {
    return (
      <Fragment>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Advanced Form</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Advanced Form</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="card card-default">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card-body text-center">
                      <form method="post" className="f1" onSubmit={clickSubmit}>
                        <h3 className="mb-1 font-weight-600">
                          Verify your identity
                        </h3>
                        {showSuccess()}
                        {showError()}
                        <p className="mb-5">
                          Before you can start investing, you need to verify
                          your identity. This means answering a few questions
                          and attaching your ID document.
                        </p>
                        <div className="f1-steps">
                          <div className="f1-progress">
                            <div
                              className="f1-progress-line"
                              data-now-value="16.66"
                              data-number-of-steps="3"
                              style={{ width: "16.66%" }}
                            ></div>
                          </div>
                          <div className="f1-step active">
                            <div className="f1-step-icon">
                              <i className="btn-circle"></i>
                            </div>
                            <p>Step 1</p>
                          </div>
                          <div className="f1-step">
                            <div className="f1-step-icon">
                              <i className="btn-circle"></i>
                            </div>
                            <p>Step 2</p>
                          </div>
                          <div className="f1-step">
                            <div className="f1-step-icon">
                              <i className="btn-circle"></i>
                            </div>
                            <p>Step 3</p>
                          </div>
                        </div>

                        <fieldset>
                          <div className="card-body">
                            <div className="row">
                              <div className="form-group col-md-12">
                                <label className="control-label">
                                  Full Corporate Name:
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("corporatename")}
                                  value={corporatename}
                                  className="form-control"
                                  placeholder="Full Corporate Name"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Date of Incorporation:
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("dateofincorporation")}
                                  value={dateofincorporation}
                                  className="form-control"
                                  placeholder="Date of Incorporation"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">RC Num:</label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("rcnum")}
                                  value={rcnum}
                                  className="form-control"
                                  placeholder="RC Num:"
                                />
                              </div>
                              <div className="form-group col-md-12">
                                <label className="control-label">
                                  Registered address:
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("registeredAddress")}
                                  value={registeredAddress}
                                  className="form-control"
                                  placeholder="Registered address"
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Official email address
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange(
                                    "officailEmailAddress"
                                  )}
                                  value={officailEmailAddress}
                                  className="form-control"
                                  placeholder="Official email address"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Official phone number
                                </label>
                                <input
                                  maxLength="100"
                                  type="number"
                                  onChange={handleChange("officialPhoneNumber")}
                                  value={officialPhoneNumber}
                                  className="form-control"
                                  placeholder="Official phone number"
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Industry/Sector
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("industry")}
                                  value={industry}
                                  className="form-control"
                                  placeholder="Industry/Sector"
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Estimated Annual Turnover
                                </label>
                                <input
                                  maxLength="100"
                                  type="number"
                                  onChange={handleChange("estimatedAnnualTurnOver")}
                                  value={estimatedAnnualTurnOver}
                                  className="form-control"
                                  placeholder="Estimated Annual Turnover"
                                />
                              </div>

                              <div className="form-group col-md-12">
                                <label className="control-label">
                                  Preferred Currency{" "}
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleChange("currency")}
                                  value={currency}
                                >
                                  <option label="blank">Select Currency</option>
                                  <option value="Naira">Naira(₦)</option>
                                  <option value="Dollars">Dollars($)</option>
                                </select>
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Bank Name{" "}
                                </label>
                                <input
                                  maxLength="100"
                                  onChange={handleChange("bankName")}
                                  value={bankName}
                                  type="text"
                                  className="form-control"
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Account Number{" "}
                                </label>
                                <input
                                  maxLength="100"
                                  onChange={handleChange("accountNumber")}
                                  value={accountNumber}
                                  type="number"
                                  type="number"
                                  className="form-control"
                                />
                              </div>
                              <div className="f1-buttons">
                                <button
                                  type="button"
                                  className="btn btn-success btn-next"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <fieldset>
                          <div className="row">
                            <h4>Principal Officer Contact</h4>
                            <div className="form-group col-md-12">
                              <label className="control-label">Name </label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "principalOfficerContactName"
                                )}
                                value={principalOfficerContactName}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Phone</label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "principalOfficerPhonenumber"
                                )}
                                value={principalOfficerPhonenumber}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Email</label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "principallOfficerEmail"
                                )}
                                value={principallOfficerEmail}
                                type="email"
                                className="form-control"
                              />
                            </div>
                            <hr />
                            <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
                            <br /> <br />
                            <h4>Enquiries Contact</h4>
                            <div className="form-group col-md-12">
                              <label className="control-label">Name </label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "enquiriesContactName"
                                )}
                                value={enquiriesContactName}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Phone</label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "enquiriesPhonenumber"
                                )}
                                value={enquiriesPhonenumber}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Email</label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "enquiriesEmail"
                                )}
                                value={enquiriesEmail}
                                type="email"
                                className="form-control"
                              />
                            </div>
                            <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
                            <br /> <br />
                            <h4>Compliance Contact</h4>
                            <div className="form-group col-md-12">
                              <label className="control-label">Name </label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "complianceContactName"
                                )}
                                value={complianceContactName}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Phone</label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "compliancePhonenumber"
                                )}
                                value={compliancePhonenumber}
                                type="text"
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Email</label>
                              <input
                                maxLength="100"
                                onChange={handleChange(
                                  "complianceEmail"
                                )}
                                value={complianceEmail}
                                type="email"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="f1-buttons">
                            <button type="button" className="btn btn-previous">
                              Previous
                            </button>
                            <button
                              type="button"
                              className="btn btn-success btn-next"
                            >
                              Next
                            </button>
                          </div>
                        </fieldset>

                        <fieldset>
                          <h5 className="mb-3 font-weight-600">
                            Social media profiles:
                          </h5>
                          <h3>Investor declaration</h3>
                          <p>
                            1. I confirm that all information and documentation
                            either signed or provided herein is true and correct
                            and I further understand that I am responsible for
                            the correctness of all information provided by
                            myself or on my behalf.
                          </p>
                          <p>
                            2. I have read and understand the contents including
                            the terms and conditions of this application form.
                          </p>
                          <p>
                            3. Before completing this form, I have read and
                            understand the latest MINIMUM DISCLOSURE DOCUMENTS
                            that are relevant to the crowdfunding investment
                            project(s) of my choice. (Click on the name to
                            download the document.)
                          </p>
                          <br />

                          <div className="form-group col-md-6">
                            <div className="checkboxes in-row margin-bottom-20">
                              <input
                                id="check-a"
                                required="required"
                                type="checkbox"
                                name="check"
                              />
                              <label for="check-a">
                                You agree with our Terms Privacy Policy
                              </label>
                            </div>
                          </div>
                          <div className="f1-buttons">
                            <button type="button" className="btn btn-previous">
                              Previous
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success btn-submit"
                            >
                              Submit
                            </button>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
        {content()}
        {redirectUser()}
      </div>
    </Fragment>
  );
};

export default CorporateInvestorForm;
