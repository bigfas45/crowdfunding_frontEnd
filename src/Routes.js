import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Registration from "./core/Registration";
import IndividualInvestorForm from "./core/IndividualInvestorForm";
import CorporateInvestorForm from "./core/CorporateInvestorForm";
import Investment from "./core/Investment";
import InvestmentDetails from "./core/InvestmentDetails";
import FundProject from "./core/FundProject";
import Paystack from "./core/Paystack";
import Invoice from "./core/Invoice";
import Balance from "./core/Balance";
import VerificationInvestor from "./core/VerificationConfirmation";



import IssuerHome from "./issuer/Home";
import IssuerProject from "./issuer/Project";
import IssuerManageProducts from "./issuer/ManageProducts";
import IssuerUpdateProducts from "./issuer/UpdateProduct";
import IssuerGallery from "./issuer/Gallery";
import IssuerProjectGallery from "./issuer/ProjectGallery";
import Document from "./issuer/Document";
import Payment from "./issuer/Payment";
import IssuerApplicationForm from "./issuer/IssuerApplicationForm";
import VerificationIssuer from "./issuer/VerificationConfirmation";




import {signout} from "./auth";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Verification from "./user/Verification";
import VerificationConfirmation from "./user/VerificationConfirmation";
import ResetPassword from "./user/ResetPassword";

import ForgetPassword from "./user/ForgetPassword";
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
import IssuerRoute from './auth/IssuerRoute'
import AdminHome from "./admin/Home";
import Category from "./admin/Category";
import UpdateCategory from "./admin/UpdateCategory";
import Project from "./admin/Project";
import ManageProducts from "./admin/ManageProducts";
import UpdateProducts from "./admin/UpdateProduct";
import Gallery from "./admin/Gallery";
import ProjectGallery from "./admin/ProjectGallery";
import ManageUser from "./admin/ManageUser";
import UpdateUser from "./admin/UpdateUser";
import IssuerApplication from "./admin/IssuerApplication";
import IssuerApplicationUpdate from "./admin/IssuerApplicationUpdate";
import IndividualApplication from "./admin/IndividualApplication";
import IndividualApplicationUpdate from "./admin/IndividualApplicationUpdate";
import CorporateApplicationUpdate from "./admin/CorporateApplicationUpdate";
import CorporateApplication from "./admin/CorporateApplication";
import ManageBlog from "./admin/ManageBlog";
import Blog from "./admin/Blog";
import UpdateBlog from "./admin/UpdateBlog";
import AdminPayment from "./admin/Payment";










const Routes = () => {
  return (
  
    <BrowserRouter>
 
      <Switch>
        <PrivateRoute path="/investor/dashboard" exact component={Home} />
        <PrivateRoute path="/investor/registration" exact component={Registration} />
        <PrivateRoute path="/individual/investor/registration" exact component={IndividualInvestorForm} />
        <PrivateRoute path="/corporate/investor/registration" exact component={CorporateInvestorForm} />
        <PrivateRoute path="/investment" exact component={Investment} />
        <PrivateRoute path="/investment/:projectId" exact component={InvestmentDetails} />
        <PrivateRoute path="/project/fund/:projectId" exact component={FundProject} />
        <PrivateRoute path="/project/paystack/:refId" exact component={Paystack} />
        <PrivateRoute path="/invoice/:refId" exact component={Invoice} />
        <PrivateRoute path="/payment/balance" exact component={Balance} />
        <PrivateRoute path="/investor/verification/:email" exact component={VerificationInvestor} />


        <IssuerRoute path="/issuer/dashboard" exact component={IssuerHome} />
        <IssuerRoute path="/issuer/project/create" exact component={IssuerProject} />
        <IssuerRoute path="/issuer/project/manage" exact component={IssuerManageProducts} />
        <IssuerRoute path="/issuer/project/update/:projectId" exact component={IssuerUpdateProducts} />
        <IssuerRoute path="/issuer/project/gallery/create/:projectId" exact component={IssuerGallery} />
        <IssuerRoute path="/issuer/project/gallery/:projectId" exact component={IssuerProjectGallery} />
        <IssuerRoute path="/issuer/project/document/create/:projectId" exact component={Document} />
        <IssuerRoute path="/issuer/project/payment/:projectId" exact component={Payment} />
        <IssuerRoute path="/issuer/application" exact component={IssuerApplicationForm} />
        <IssuerRoute path="/issuer/verification" exact component={VerificationIssuer} />


        <AdminRoute path="/admin/dashboard" exact component={AdminHome} />
        <AdminRoute path="/admin/category/create" exact component={Category} />
        <AdminRoute path="/category/:catId" exact component={UpdateCategory} />
        <AdminRoute path="/admin/project/create" exact component={Project} />
        <AdminRoute path="/admin/project/manage" exact component={ManageProducts} />
        <AdminRoute path="/admin/project/update/:projectId" exact component={UpdateProducts} />
        <AdminRoute path="/admin/project/gallery/create/:projectId" exact component={Gallery} />
        <AdminRoute path="/admin/project/gallery/:projectId" exact component={ProjectGallery} />
        <AdminRoute path="/admin/user/manage" exact component={ManageUser} />
        <AdminRoute path="/admin/user/update/:userId" exact component={UpdateUser} />
        <AdminRoute path="/admin/issuer/application" exact component={IssuerApplication} />
        <AdminRoute path="/admin/issuer/application/:Id" exact component={IssuerApplicationUpdate} />
        <AdminRoute path="/admin/individual/application" exact component={IndividualApplication} />
        <AdminRoute path="/admin/individual/application/:Id" exact component={IndividualApplicationUpdate} />
        <AdminRoute path="/admin/corporate/application/:Id" exact component={CorporateApplicationUpdate} />
        <AdminRoute path="/admin/corporate/application" exact component={CorporateApplication} />
        <AdminRoute path="/admin/blog/manage" exact component={ManageBlog} />
        <AdminRoute path="/admin/blog/create" exact component={Blog} />
        <AdminRoute path="/admin/blog/update/:blogId" exact component={UpdateBlog} />
        <AdminRoute path="/admin/project/payment/:projectId" exact component={AdminPayment} />


        <Route path="/signout" exact component={signout} />
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/password/reset" exact component={ForgetPassword} />
        <Route path="/verification" exact component={Verification} />
        <Route path="/verification/:userId" exact component={VerificationConfirmation} />
        <Route path="/password/reset/:userId" exact component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
