import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import image from "../img/puzzle-959x539.jpg";
import {getIndividualInvestorForm, getCorporateInvestorForm } from "./ApiCore";
import {isAuthenticated} from "../auth";






const Card = ({project}) => {






    return (
      <div class="col-sm-6 col-lg-6 col-xl-6">
      <div class="single-product-item mb-30">
        <div class="product-card">
          <a class="product-thumb" href="product-details.html">
          <ShowImage item={project} url="project" />
          </a>
          <div class="ribbon ribbon-content ribbon-right ribbon-danger">
            {project.projectType}
          </div>

          <h3 class="product font-17 mb-15 mt-20">  <a target="_black" href={`${project.website}`} >{project.title}</a></h3>

          <div class="d-flex justify-content-between align-items-center">
            <div class="div">
              <div class="badge badge-success badge-pill">
              {project.category.name}
              </div>
            </div>
          </div>

          <span>
            <br />
            <i
              style="color: green;"
              class="fa fa-bar-chart"
              style={{margin: "4px 0px 0px 0px"}}
            ></i>{" "}
            &nbsp;{project.returns}% returns in {project.duration}
          </span>
          <br />
          <br />

          <h5 class="font-14">
            &nbsp;<span class="float-right">90%</span>
          </h5>
          <div class="progress h-8 mb-20">
            <div
              class="progress-bar bg-info wow animated progress-animated"
              style={{width: "90%"}}
              role="progressbar"
            >
              {" "}
              <span class="sr-only">60% Complete</span>{" "}
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <h5 style={{color: "red"}}>
            ₦{project.pledge.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}<p>Goal</p>
            </h5>
            <h5 style={{color: "green"}}>
              ₦40,000<p>pledged</p>
            </h5>
            <h5>
            {moment(project.createdAt). fromNow()}<p>Duration</p>
            </h5>
          </div>

          <div class="product-buttons">
          <Link to={`/investment/${project._id}`} class="btn btn-primary">  MORE <i class="feather icon-arrow-right ml-2"></i>
                    </Link>
          </div>
        </div>
      </div>
    </div>

     
       
    );
};

export default Card;