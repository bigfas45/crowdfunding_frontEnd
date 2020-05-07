import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link  ,Redirect} from "react-router-dom";
import { isAuthenticated } from "../auth";
import image from "../img/company.svg";
import image2 from "../img/person-investor.svg";
import { createIndividualInvestorApplicationForm } from "./ApiCore";

const IndividualInvestorForm = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    title: "",
    firstname: "",
    lastname: "",
    middlename: "",
    gender: "",
    dob: "",
    nationality: "",
    userId: "",
    countryOfResidence: "",
    identification: "",
    maidenname: "",
    industry: "",
    occupation: "",
    estimatedAnnualIncome: "",
    estimatedAnnualTurnOver: "",
    originOfFunds: "",
    maximumAmountForInvestment: "",
    currency: "",
    address: "",
    telephone: "",
    city: "",
    state: "",
    email: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const {
    title,
    firstname,
    lastname,
    middlename,
    gender,
    dob,
    nationality,
    userId,
    countryOfResidence,
    identification,
    maidenname,
    occupation,
    industry,
    estimatedAnnualIncome,
    estimatedAnnualTurnOver,
    originOfFunds,
    maximumAmountForInvestment,
    currency,
    address,
    telephone,
    city,
    state,
    email,
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
    formData.append('userId', user._id);
    setValues({ ...values, error: "", [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createIndividualInvestorApplicationForm(user._id, token, formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
         
            title: "",
            firstname: "",
            lastname: "",
            middlename: "",
            gender: "",
            dob: "",
            nationality: "",
            userId: "",
            countryOfResidence: "",
            identification: "",
            maidenname: "",
            occupation: "",
            industry: "",
            estimatedAnnualIncome: "",
            originOfFunds: "",
            maximumAmountForInvestment: "",
            currency: "",
            address: "",
            telephone: "",
            city: "",
            state: "",
            email: "",
            estimatedAnnualTurnOver: "",
            loading: false,
            error: false,
            createdProduct: data.title,
            redirectToProfile: true
          });
        }
      }
    );
  };


  const showSuccess = () => (


    <div class="alert alert-success alert-dismissible" style={{display: createdProduct ? '' : 'none'}}>
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
    <h5><i class="icon fas fa-check"></i> Alert!</h5>
    <span><strong>Success!</strong>  Project is updated. </span>
  </div>
  
  
  );
  
  const showError = () => (
  
    <div class="alert alert-danger alert-dismissible" style={{display: error ? '' : 'none'}}>
                  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                  <h5><i class="icon fas fa-ban"></i> Alert!</h5>
                  <span><strong>Error!</strong>   {error}</span>
                </div>
  );

  const redirectUser = () => {

    if (redirectToProfile) {
        if (!error) {
            return <Redirect to="/investor/verification" />
        }
    }
  
}
  

  const content = () => {
    return (
      <Fragment>
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Individual Investor Verification </h1>
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
                        Verification of your Identity requires answering the following questions
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
                                <label className="control-label">Title</label>
                                <select
                                  onChange={handleChange("title")}
                                  value={title}
                                  className="form-control"
                                >
                                  <option label="blank">Select Title</option>
                                  <option>M.r</option>
                                  <option>Mrs.</option>
                                  <option>Miss.</option>
                                </select>
                              </div>

                              <div className="form-group col-md-4">
                                <label className="control-label">Surname</label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("lastname")}
                                  value={lastname}
                                  className="form-control"
                                  placeholder="Enter First Name"
                                />
                              </div>
                              <div className="form-group col-md-4">
                                <label className="control-label">
                                  First Name
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("firstname")}
                                  value={firstname}
                                  className="form-control"
                                  placeholder="Enter First Name"
                                />
                              </div>
                              <div className="form-group col-md-4">
                                <label className="control-label">
                                  Middle Name
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("middlename")}
                                  value={middlename}
                                  className="form-control"
                                  placeholder="Middle Name"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">Gender</label>
                                <select
                                  className="form-control"
                                  onChange={handleChange("gender")}
                                  value={gender}
                                >
                                  <option label="blank">Select Gender</option>
                                  <option>Male</option>
                                  <option>Female</option>
                                </select>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Date of birth
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("dob")}
                                  value={dob}
                                  className="form-control"
                                  placeholder="21/12/1960"
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Nationality
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleChange("nationality")}
                                  value={nationality}
                                >
                                  <option label="blank">
                                    Select Nationality
                                  </option>
                                  <option value="afghan">Afghan</option>
                                  <option value="albanian">Albanian</option>
                                  <option value="algerian">Algerian</option>
                                  <option value="american">American</option>
                                  <option value="andorran">Andorran</option>
                                  <option value="angolan">Angolan</option>
                                  <option value="antiguans">Antiguans</option>
                                  <option value="argentinean">
                                    Argentinean
                                  </option>
                                  <option value="armenian">Armenian</option>
                                  <option value="australian">Australian</option>
                                  <option value="austrian">Austrian</option>
                                  <option value="azerbaijani">
                                    Azerbaijani
                                  </option>
                                  <option value="bahamian">Bahamian</option>
                                  <option value="bahraini">Bahraini</option>
                                  <option value="bangladeshi">
                                    Bangladeshi
                                  </option>
                                  <option value="barbadian">Barbadian</option>
                                  <option value="barbudans">Barbudans</option>
                                  <option value="batswana">Batswana</option>
                                  <option value="belarusian">Belarusian</option>
                                  <option value="belgian">Belgian</option>
                                  <option value="belizean">Belizean</option>
                                  <option value="beninese">Beninese</option>
                                  <option value="bhutanese">Bhutanese</option>
                                  <option value="bolivian">Bolivian</option>
                                  <option value="bosnian">Bosnian</option>
                                  <option value="brazilian">Brazilian</option>
                                  <option value="british">British</option>
                                  <option value="bruneian">Bruneian</option>
                                  <option value="bulgarian">Bulgarian</option>
                                  <option value="burkinabe">Burkinabe</option>
                                  <option value="burmese">Burmese</option>
                                  <option value="burundian">Burundian</option>
                                  <option value="cambodian">Cambodian</option>
                                  <option value="cameroonian">
                                    Cameroonian
                                  </option>
                                  <option value="canadian">Canadian</option>
                                  <option value="cape verdean">
                                    Cape Verdean
                                  </option>
                                  <option value="central african">
                                    Central African
                                  </option>
                                  <option value="chadian">Chadian</option>
                                  <option value="chilean">Chilean</option>
                                  <option value="chinese">Chinese</option>
                                  <option value="colombian">Colombian</option>
                                  <option value="comoran">Comoran</option>
                                  <option value="congolese">Congolese</option>
                                  <option value="costa rican">
                                    Costa Rican
                                  </option>
                                  <option value="croatian">Croatian</option>
                                  <option value="cuban">Cuban</option>
                                  <option value="cypriot">Cypriot</option>
                                  <option value="czech">Czech</option>
                                  <option value="danish">Danish</option>
                                  <option value="djibouti">Djibouti</option>
                                  <option value="dominican">Dominican</option>
                                  <option value="dutch">Dutch</option>
                                  <option value="east timorese">
                                    East Timorese
                                  </option>
                                  <option value="ecuadorean">Ecuadorean</option>
                                  <option value="egyptian">Egyptian</option>
                                  <option value="emirian">Emirian</option>
                                  <option value="equatorial guinean">
                                    Equatorial Guinean
                                  </option>
                                  <option value="eritrean">Eritrean</option>
                                  <option value="estonian">Estonian</option>
                                  <option value="ethiopian">Ethiopian</option>
                                  <option value="fijian">Fijian</option>
                                  <option value="filipino">Filipino</option>
                                  <option value="finnish">Finnish</option>
                                  <option value="french">French</option>
                                  <option value="gabonese">Gabonese</option>
                                  <option value="gambian">Gambian</option>
                                  <option value="georgian">Georgian</option>
                                  <option value="german">German</option>
                                  <option value="ghanaian">Ghanaian</option>
                                  <option value="greek">Greek</option>
                                  <option value="grenadian">Grenadian</option>
                                  <option value="guatemalan">Guatemalan</option>
                                  <option value="guinea-bissauan">
                                    Guinea-Bissauan
                                  </option>
                                  <option value="guinean">Guinean</option>
                                  <option value="guyanese">Guyanese</option>
                                  <option value="haitian">Haitian</option>
                                  <option value="herzegovinian">
                                    Herzegovinian
                                  </option>
                                  <option value="honduran">Honduran</option>
                                  <option value="hungarian">Hungarian</option>
                                  <option value="icelander">Icelander</option>
                                  <option value="indian">Indian</option>
                                  <option value="indonesian">Indonesian</option>
                                  <option value="iranian">Iranian</option>
                                  <option value="iraqi">Iraqi</option>
                                  <option value="irish">Irish</option>
                                  <option value="israeli">Israeli</option>
                                  <option value="italian">Italian</option>
                                  <option value="ivorian">Ivorian</option>
                                  <option value="jamaican">Jamaican</option>
                                  <option value="japanese">Japanese</option>
                                  <option value="jordanian">Jordanian</option>
                                  <option value="kazakhstani">
                                    Kazakhstani
                                  </option>
                                  <option value="kenyan">Kenyan</option>
                                  <option value="kittian and nevisian">
                                    Kittian and Nevisian
                                  </option>
                                  <option value="kuwaiti">Kuwaiti</option>
                                  <option value="kyrgyz">Kyrgyz</option>
                                  <option value="laotian">Laotian</option>
                                  <option value="latvian">Latvian</option>
                                  <option value="lebanese">Lebanese</option>
                                  <option value="liberian">Liberian</option>
                                  <option value="libyan">Libyan</option>
                                  <option value="liechtensteiner">
                                    Liechtensteiner
                                  </option>
                                  <option value="lithuanian">Lithuanian</option>
                                  <option value="luxembourger">
                                    Luxembourger
                                  </option>
                                  <option value="macedonian">Macedonian</option>
                                  <option value="malagasy">Malagasy</option>
                                  <option value="malawian">Malawian</option>
                                  <option value="malaysian">Malaysian</option>
                                  <option value="maldivan">Maldivan</option>
                                  <option value="malian">Malian</option>
                                  <option value="maltese">Maltese</option>
                                  <option value="marshallese">
                                    Marshallese
                                  </option>
                                  <option value="mauritanian">
                                    Mauritanian
                                  </option>
                                  <option value="mauritian">Mauritian</option>
                                  <option value="mexican">Mexican</option>
                                  <option value="micronesian">
                                    Micronesian
                                  </option>
                                  <option value="moldovan">Moldovan</option>
                                  <option value="monacan">Monacan</option>
                                  <option value="mongolian">Mongolian</option>
                                  <option value="moroccan">Moroccan</option>
                                  <option value="mosotho">Mosotho</option>
                                  <option value="motswana">Motswana</option>
                                  <option value="mozambican">Mozambican</option>
                                  <option value="namibian">Namibian</option>
                                  <option value="nauruan">Nauruan</option>
                                  <option value="nepalese">Nepalese</option>
                                  <option value="new zealander">
                                    New Zealander
                                  </option>
                                  <option value="ni-vanuatu">Ni-Vanuatu</option>
                                  <option value="nicaraguan">Nicaraguan</option>
                                  <option value="nigerien">Nigerian</option>
                                  <option value="north korean">
                                    North Korean
                                  </option>
                                  <option value="northern irish">
                                    Northern Irish
                                  </option>
                                  <option value="norwegian">Norwegian</option>
                                  <option value="omani">Omani</option>
                                  <option value="pakistani">Pakistani</option>
                                  <option value="palauan">Palauan</option>
                                  <option value="panamanian">Panamanian</option>
                                  <option value="papua new guinean">
                                    Papua New Guinean
                                  </option>
                                  <option value="paraguayan">Paraguayan</option>
                                  <option value="peruvian">Peruvian</option>
                                  <option value="polish">Polish</option>
                                  <option value="portuguese">Portuguese</option>
                                  <option value="qatari">Qatari</option>
                                  <option value="romanian">Romanian</option>
                                  <option value="russian">Russian</option>
                                  <option value="rwandan">Rwandan</option>
                                  <option value="saint lucian">
                                    Saint Lucian
                                  </option>
                                  <option value="salvadoran">Salvadoran</option>
                                  <option value="samoan">Samoan</option>
                                  <option value="san marinese">
                                    San Marinese
                                  </option>
                                  <option value="sao tomean">Sao Tomean</option>
                                  <option value="saudi">Saudi</option>
                                  <option value="scottish">Scottish</option>
                                  <option value="senegalese">Senegalese</option>
                                  <option value="serbian">Serbian</option>
                                  <option value="seychellois">
                                    Seychellois
                                  </option>
                                  <option value="sierra leonean">
                                    Sierra Leonean
                                  </option>
                                  <option value="singaporean">
                                    Singaporean
                                  </option>
                                  <option value="slovakian">Slovakian</option>
                                  <option value="slovenian">Slovenian</option>
                                  <option value="solomon islander">
                                    Solomon Islander
                                  </option>
                                  <option value="somali">Somali</option>
                                  <option value="south african">
                                    South African
                                  </option>
                                  <option value="south korean">
                                    South Korean
                                  </option>
                                  <option value="spanish">Spanish</option>
                                  <option value="sri lankan">Sri Lankan</option>
                                  <option value="sudanese">Sudanese</option>
                                  <option value="surinamer">Surinamer</option>
                                  <option value="swazi">Swazi</option>
                                  <option value="swedish">Swedish</option>
                                  <option value="swiss">Swiss</option>
                                  <option value="syrian">Syrian</option>
                                  <option value="taiwanese">Taiwanese</option>
                                  <option value="tajik">Tajik</option>
                                  <option value="tanzanian">Tanzanian</option>
                                  <option value="thai">Thai</option>
                                  <option value="togolese">Togolese</option>
                                  <option value="tongan">Tongan</option>
                                  <option value="trinidadian or tobagonian">
                                    Trinidadian or Tobagonian
                                  </option>
                                  <option value="tunisian">Tunisian</option>
                                  <option value="turkish">Turkish</option>
                                  <option value="tuvaluan">Tuvaluan</option>
                                  <option value="ugandan">Ugandan</option>
                                  <option value="ukrainian">Ukrainian</option>
                                  <option value="uruguayan">Uruguayan</option>
                                  <option value="uzbekistani">
                                    Uzbekistani
                                  </option>
                                  <option value="venezuelan">Venezuelan</option>
                                  <option value="vietnamese">Vietnamese</option>
                                  <option value="welsh">Welsh</option>
                                  <option value="yemenite">Yemenite</option>
                                  <option value="zambian">Zambian</option>
                                  <option value="zimbabwean">Zimbabwean</option>
                                </select>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Country of Residence
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleChange("countryOfResidence")}
                                  value={countryOfResidence}
                                >
                                  <option label="blank">
                                    Select Country of Residence
                                  </option>
                                  <option value="Afganistan">
                                    Afghanistan
                                  </option>
                                  <option value="Albania">Albania</option>
                                  <option value="Algeria">Algeria</option>
                                  <option value="American Samoa">
                                    American Samoa
                                  </option>
                                  <option value="Andorra">Andorra</option>
                                  <option value="Angola">Angola</option>
                                  <option value="Anguilla">Anguilla</option>
                                  <option value="Antigua & Barbuda">
                                    Antigua & Barbuda
                                  </option>
                                  <option value="Argentina">Argentina</option>
                                  <option value="Armenia">Armenia</option>
                                  <option value="Aruba">Aruba</option>
                                  <option value="Australia">Australia</option>
                                  <option value="Austria">Austria</option>
                                  <option value="Azerbaijan">Azerbaijan</option>
                                  <option value="Bahamas">Bahamas</option>
                                  <option value="Bahrain">Bahrain</option>
                                  <option value="Bangladesh">Bangladesh</option>
                                  <option value="Barbados">Barbados</option>
                                  <option value="Belarus">Belarus</option>
                                  <option value="Belgium">Belgium</option>
                                  <option value="Belize">Belize</option>
                                  <option value="Benin">Benin</option>
                                  <option value="Bermuda">Bermuda</option>
                                  <option value="Bhutan">Bhutan</option>
                                  <option value="Bolivia">Bolivia</option>
                                  <option value="Bonaire">Bonaire</option>
                                  <option value="Bosnia & Herzegovina">
                                    Bosnia & Herzegovina
                                  </option>
                                  <option value="Botswana">Botswana</option>
                                  <option value="Brazil">Brazil</option>
                                  <option value="British Indian Ocean Ter">
                                    British Indian Ocean Ter
                                  </option>
                                  <option value="Brunei">Brunei</option>
                                  <option value="Bulgaria">Bulgaria</option>
                                  <option value="Burkina Faso">
                                    Burkina Faso
                                  </option>
                                  <option value="Burundi">Burundi</option>
                                  <option value="Cambodia">Cambodia</option>
                                  <option value="Cameroon">Cameroon</option>
                                  <option value="Canada">Canada</option>
                                  <option value="Canary Islands">
                                    Canary Islands
                                  </option>
                                  <option value="Cape Verde">Cape Verde</option>
                                  <option value="Cayman Islands">
                                    Cayman Islands
                                  </option>
                                  <option value="Central African Republic">
                                    Central African Republic
                                  </option>
                                  <option value="Chad">Chad</option>
                                  <option value="Channel Islands">
                                    Channel Islands
                                  </option>
                                  <option value="Chile">Chile</option>
                                  <option value="China">China</option>
                                  <option value="Christmas Island">
                                    Christmas Island
                                  </option>
                                  <option value="Cocos Island">
                                    Cocos Island
                                  </option>
                                  <option value="Colombia">Colombia</option>
                                  <option value="Comoros">Comoros</option>
                                  <option value="Congo">Congo</option>
                                  <option value="Cook Islands">
                                    Cook Islands
                                  </option>
                                  <option value="Costa Rica">Costa Rica</option>
                                  <option value="Cote DIvoire">
                                    Cote DIvoire
                                  </option>
                                  <option value="Croatia">Croatia</option>
                                  <option value="Cuba">Cuba</option>
                                  <option value="Curaco">Curacao</option>
                                  <option value="Cyprus">Cyprus</option>
                                  <option value="Czech Republic">
                                    Czech Republic
                                  </option>
                                  <option value="Denmark">Denmark</option>
                                  <option value="Djibouti">Djibouti</option>
                                  <option value="Dominica">Dominica</option>
                                  <option value="Dominican Republic">
                                    Dominican Republic
                                  </option>
                                  <option value="East Timor">East Timor</option>
                                  <option value="Ecuador">Ecuador</option>
                                  <option value="Egypt">Egypt</option>
                                  <option value="El Salvador">
                                    El Salvador
                                  </option>
                                  <option value="Equatorial Guinea">
                                    Equatorial Guinea
                                  </option>
                                  <option value="Eritrea">Eritrea</option>
                                  <option value="Estonia">Estonia</option>
                                  <option value="Ethiopia">Ethiopia</option>
                                  <option value="Falkland Islands">
                                    Falkland Islands
                                  </option>
                                  <option value="Faroe Islands">
                                    Faroe Islands
                                  </option>
                                  <option value="Fiji">Fiji</option>
                                  <option value="Finland">Finland</option>
                                  <option value="France">France</option>
                                  <option value="French Guiana">
                                    French Guiana
                                  </option>
                                  <option value="French Polynesia">
                                    French Polynesia
                                  </option>
                                  <option value="French Southern Ter">
                                    French Southern Ter
                                  </option>
                                  <option value="Gabon">Gabon</option>
                                  <option value="Gambia">Gambia</option>
                                  <option value="Georgia">Georgia</option>
                                  <option value="Germany">Germany</option>
                                  <option value="Ghana">Ghana</option>
                                  <option value="Gibraltar">Gibraltar</option>
                                  <option value="Great Britain">
                                    Great Britain
                                  </option>
                                  <option value="Greece">Greece</option>
                                  <option value="Greenland">Greenland</option>
                                  <option value="Grenada">Grenada</option>
                                  <option value="Guadeloupe">Guadeloupe</option>
                                  <option value="Guam">Guam</option>
                                  <option value="Guatemala">Guatemala</option>
                                  <option value="Guinea">Guinea</option>
                                  <option value="Guyana">Guyana</option>
                                  <option value="Haiti">Haiti</option>
                                  <option value="Hawaii">Hawaii</option>
                                  <option value="Honduras">Honduras</option>
                                  <option value="Hong Kong">Hong Kong</option>
                                  <option value="Hungary">Hungary</option>
                                  <option value="Iceland">Iceland</option>
                                  <option value="Indonesia">Indonesia</option>
                                  <option value="India">India</option>
                                  <option value="Iran">Iran</option>
                                  <option value="Iraq">Iraq</option>
                                  <option value="Ireland">Ireland</option>
                                  <option value="Isle of Man">
                                    Isle of Man
                                  </option>
                                  <option value="Israel">Israel</option>
                                  <option value="Italy">Italy</option>
                                  <option value="Jamaica">Jamaica</option>
                                  <option value="Japan">Japan</option>
                                  <option value="Jordan">Jordan</option>
                                  <option value="Kazakhstan">Kazakhstan</option>
                                  <option value="Kenya">Kenya</option>
                                  <option value="Kiribati">Kiribati</option>
                                  <option value="Korea North">
                                    Korea North
                                  </option>
                                  <option value="Korea Sout">
                                    Korea South
                                  </option>
                                  <option value="Kuwait">Kuwait</option>
                                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                                  <option value="Laos">Laos</option>
                                  <option value="Latvia">Latvia</option>
                                  <option value="Lebanon">Lebanon</option>
                                  <option value="Lesotho">Lesotho</option>
                                  <option value="Liberia">Liberia</option>
                                  <option value="Libya">Libya</option>
                                  <option value="Liechtenstein">
                                    Liechtenstein
                                  </option>
                                  <option value="Lithuania">Lithuania</option>
                                  <option value="Luxembourg">Luxembourg</option>
                                  <option value="Macau">Macau</option>
                                  <option value="Macedonia">Macedonia</option>
                                  <option value="Madagascar">Madagascar</option>
                                  <option value="Malaysia">Malaysia</option>
                                  <option value="Malawi">Malawi</option>
                                  <option value="Maldives">Maldives</option>
                                  <option value="Mali">Mali</option>
                                  <option value="Malta">Malta</option>
                                  <option value="Marshall Islands">
                                    Marshall Islands
                                  </option>
                                  <option value="Martinique">Martinique</option>
                                  <option value="Mauritania">Mauritania</option>
                                  <option value="Mauritius">Mauritius</option>
                                  <option value="Mayotte">Mayotte</option>
                                  <option value="Mexico">Mexico</option>
                                  <option value="Midway Islands">
                                    Midway Islands
                                  </option>
                                  <option value="Moldova">Moldova</option>
                                  <option value="Monaco">Monaco</option>
                                  <option value="Mongolia">Mongolia</option>
                                  <option value="Montserrat">Montserrat</option>
                                  <option value="Morocco">Morocco</option>
                                  <option value="Mozambique">Mozambique</option>
                                  <option value="Myanmar">Myanmar</option>
                                  <option value="Nambia">Nambia</option>
                                  <option value="Nauru">Nauru</option>
                                  <option value="Nepal">Nepal</option>
                                  <option value="Netherland Antilles">
                                    Netherland Antilles
                                  </option>
                                  <option value="Netherlands">
                                    Netherlands (Holland, Europe)
                                  </option>
                                  <option value="Nevis">Nevis</option>
                                  <option value="New Caledonia">
                                    New Caledonia
                                  </option>
                                  <option value="New Zealand">
                                    New Zealand
                                  </option>
                                  <option value="Nicaragua">Nicaragua</option>
                                  <option value="Niger">Niger</option>
                                  <option value="Nigeria">Nigeria</option>
                                  <option value="Niue">Niue</option>
                                  <option value="Norfolk Island">
                                    Norfolk Island
                                  </option>
                                  <option value="Norway">Norway</option>
                                  <option value="Oman">Oman</option>
                                  <option value="Pakistan">Pakistan</option>
                                  <option value="Palau Island">
                                    Palau Island
                                  </option>
                                  <option value="Palestine">Palestine</option>
                                  <option value="Panama">Panama</option>
                                  <option value="Papua New Guinea">
                                    Papua New Guinea
                                  </option>
                                  <option value="Paraguay">Paraguay</option>
                                  <option value="Peru">Peru</option>
                                  <option value="Phillipines">
                                    Philippines
                                  </option>
                                  <option value="Pitcairn Island">
                                    Pitcairn Island
                                  </option>
                                  <option value="Poland">Poland</option>
                                  <option value="Portugal">Portugal</option>
                                  <option value="Puerto Rico">
                                    Puerto Rico
                                  </option>
                                  <option value="Qatar">Qatar</option>
                                  <option value="Republic of Montenegro">
                                    Republic of Montenegro
                                  </option>
                                  <option value="Republic of Serbia">
                                    Republic of Serbia
                                  </option>
                                  <option value="Reunion">Reunion</option>
                                  <option value="Romania">Romania</option>
                                  <option value="Russia">Russia</option>
                                  <option value="Rwanda">Rwanda</option>
                                  <option value="St Barthelemy">
                                    St Barthelemy
                                  </option>
                                  <option value="St Eustatius">
                                    St Eustatius
                                  </option>
                                  <option value="St Helena">St Helena</option>
                                  <option value="St Kitts-Nevis">
                                    St Kitts-Nevis
                                  </option>
                                  <option value="St Lucia">St Lucia</option>
                                  <option value="St Maarten">St Maarten</option>
                                  <option value="St Pierre & Miquelon">
                                    St Pierre & Miquelon
                                  </option>
                                  <option value="St Vincent & Grenadines">
                                    St Vincent & Grenadines
                                  </option>
                                  <option value="Saipan">Saipan</option>
                                  <option value="Samoa">Samoa</option>
                                  <option value="Samoa American">
                                    Samoa American
                                  </option>
                                  <option value="San Marino">San Marino</option>
                                  <option value="Sao Tome & Principe">
                                    Sao Tome & Principe
                                  </option>
                                  <option value="Saudi Arabia">
                                    Saudi Arabia
                                  </option>
                                  <option value="Senegal">Senegal</option>
                                  <option value="Seychelles">Seychelles</option>
                                  <option value="Sierra Leone">
                                    Sierra Leone
                                  </option>
                                  <option value="Singapore">Singapore</option>
                                  <option value="Slovakia">Slovakia</option>
                                  <option value="Slovenia">Slovenia</option>
                                  <option value="Solomon Islands">
                                    Solomon Islands
                                  </option>
                                  <option value="Somalia">Somalia</option>
                                  <option value="South Africa">
                                    South Africa
                                  </option>
                                  <option value="Spain">Spain</option>
                                  <option value="Sri Lanka">Sri Lanka</option>
                                  <option value="Sudan">Sudan</option>
                                  <option value="Suriname">Suriname</option>
                                  <option value="Swaziland">Swaziland</option>
                                  <option value="Sweden">Sweden</option>
                                  <option value="Switzerland">
                                    Switzerland
                                  </option>
                                  <option value="Syria">Syria</option>
                                  <option value="Tahiti">Tahiti</option>
                                  <option value="Taiwan">Taiwan</option>
                                  <option value="Tajikistan">Tajikistan</option>
                                  <option value="Tanzania">Tanzania</option>
                                  <option value="Thailand">Thailand</option>
                                  <option value="Togo">Togo</option>
                                  <option value="Tokelau">Tokelau</option>
                                  <option value="Tonga">Tonga</option>
                                  <option value="Trinidad & Tobago">
                                    Trinidad & Tobago
                                  </option>
                                  <option value="Tunisia">Tunisia</option>
                                  <option value="Turkey">Turkey</option>
                                  <option value="Turkmenistan">
                                    Turkmenistan
                                  </option>
                                  <option value="Turks & Caicos Is">
                                    Turks & Caicos Is
                                  </option>
                                  <option value="Tuvalu">Tuvalu</option>
                                  <option value="Uganda">Uganda</option>
                                  <option value="United Kingdom">
                                    United Kingdom
                                  </option>
                                  <option value="Ukraine">Ukraine</option>
                                  <option value="United Arab Erimates">
                                    United Arab Emirates
                                  </option>
                                  <option value="United States of America">
                                    United States of America
                                  </option>
                                  <option value="Uraguay">Uruguay</option>
                                  <option value="Uzbekistan">Uzbekistan</option>
                                  <option value="Vanuatu">Vanuatu</option>
                                  <option value="Vatican City State">
                                    Vatican City State
                                  </option>
                                  <option value="Venezuela">Venezuela</option>
                                  <option value="Vietnam">Vietnam</option>
                                  <option value="Virgin Islands (Brit)">
                                    Virgin Islands (Brit)
                                  </option>
                                  <option value="Virgin Islands (USA)">
                                    Virgin Islands (USA)
                                  </option>
                                  <option value="Wake Island">
                                    Wake Island
                                  </option>
                                  <option value="Wallis & Futana Is">
                                    Wallis & Futana Is
                                  </option>
                                  <option value="Yemen">Yemen</option>
                                  <option value="Zaire">Zaire</option>
                                  <option value="Zambia">Zambia</option>
                                  <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Means of Identification
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleChange("identification")}
                                  value={identification}
                                >
                                  <option label="blank">
                                    Select National Identity No
                                  </option>
                                  <option>National Identity No</option>
                                  <option>Voters Card No</option>
                                  <option>Intn’l Passport No</option>
                                </select>
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Mother's Maiden Name
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("maidenname")}
                                  value={maidenname}
                                  className="form-control"
                                  placeholder="Mother's Maiden Name"
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Occupation
                                </label>
                                <input
                                  maxLength="100"
                                  type="text"
                                  onChange={handleChange("occupation")}
                                  value={occupation}
                                  className="form-control"
                                  placeholder="Occupation"
                                />
                              </div>
                             

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Estimated Annual Income{" "}
                                </label>
                                <input
                                  maxLength="100"
                                  type="number"
                                  onChange={handleChange(
                                    "estimatedAnnualIncome"
                                  )}
                                  value={estimatedAnnualIncome}
                                  className="form-control"
                                />
                              </div>


                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Origin of Funds
                                </label>
                                <select
                                  className="form-control"
                                  onChange={handleChange("originOfFunds")}
                                  value={originOfFunds}
                                >
                                  <option label="">Select Currency</option>
                                  <option>Savings</option>
                                  <option>Profit</option>
                                  <option>Inheritance</option>
                                  <option>other</option>
                                </select>
                              </div>

                              <div className="form-group col-md-6">
                                <label className="control-label">
                                  Maximum amount of Investment{" "}
                                </label>
                                <input
                                  maxLength="100"
                                  type="number"
                                  className="form-control"
                                  onChange={handleChange(
                                    "maximumAmountForInvestment"
                                  )}
                                  value={maximumAmountForInvestment}
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
                            </div>
                          </div>
                          <div className="f1-buttons">
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
                            Set up your account:
                          </h5>
                          <div className="row">
                            <div className="form-group col-md-12">
                              <label className="control-label">
                                Street/No:{" "}
                              </label>
                              <input
                                maxLength="100"
                                type="text"
                                onChange={handleChange("address")}
                                value={address}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">City/LGA</label>
                              <input
                                maxLength="100"
                                type="text"
                                onChange={handleChange("city")}
                                value={city}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">State</label>
                              <input
                                maxLength="100"
                                type="text"
                                onChange={handleChange("state")}
                                value={state}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Telephone</label>
                              <input
                                maxLength="100"
                                type="number"
                                onChange={handleChange("telephone")}
                                value={telephone}
                                className="form-control"
                              />
                            </div>
                            <div className="form-group col-md-6">
                              <label className="control-label">Email</label>
                              <input
                                maxLength="100"
                                type="email"
                                onChange={handleChange("email")}
                                value={email}
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
                           
                          </h5>
                          <h3>Investor Declaration</h3>
                          <p>
                            1. I confirm that all information and documentation provided herein is true and correct; I further understand that I am responsible for the veracity of all information provided.
                          </p>
                          <p>
                            2. I have read and understood the contents including the terms and conditions of this Application form.
                          </p>
                          <p>
                            3. I have read and understood the latest MINIMUM DISCLOSURE DOCUMENTS that are relevant to the Crowdfunding Investment Project(s) of my choice. 
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
                              I agree with the Terms of Use and Privacy Policy
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
      <div className="ecaps-page-wrapper">
        <Aside></Aside>
        <div className="ecaps-page-content">
          <Header></Header>
          <div className="main-content">
            <div class="container-fluid">
          
              {content()}
              {redirectUser()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IndividualInvestorForm;
