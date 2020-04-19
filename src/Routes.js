import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Registration from "./core/Registration";
import IndividualInvestorForm from "./core/IndividualInvestorForm";
import CorporateInvestorForm from "./core/CorporateInvestorForm";
import Investment from "./core/Investment";
import InvestmentDetails from "./core/InvestmentDetails";
import {signout} from "./auth";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from './auth/PrivateRoute'
import AdminRoute from './auth/AdminRoute'
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










const Routes = () => {
  return (
  
    <BrowserRouter>
 
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/investor/registration" exact component={Registration} />
        <PrivateRoute path="/individual/investor/registration" exact component={IndividualInvestorForm} />
        <PrivateRoute path="/corporate/investor/registration" exact component={CorporateInvestorForm} />
        <PrivateRoute path="/investment" exact component={Investment} />
        <PrivateRoute path="/investment/:projectId" exact component={InvestmentDetails} />
        <AdminRoute path="/admin/dashboard" exact component={AdminHome} />
        <AdminRoute path="/admin/category/create" exact component={Category} />
        <AdminRoute path="/category/:catId" exact component={UpdateCategory} />
        <AdminRoute path="/admin/project/create" exact component={Project} />
        <AdminRoute path="/admin/project/manage" exact component={ManageProducts} />
        <AdminRoute path="/admin/project/update/:projectId" exact component={UpdateProducts} />
        <AdminRoute path="/admin/project/gallery/create" exact component={Gallery} />
        <AdminRoute path="/admin/project/gallery/:projectId" exact component={ProjectGallery} />
        <AdminRoute path="/admin/user/manage" exact component={ManageUser} />
        <AdminRoute path="/admin/user/update/:userId" exact component={UpdateUser} />


        <Route path="/signout" exact component={signout} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
