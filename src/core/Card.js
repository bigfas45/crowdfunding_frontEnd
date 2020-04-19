import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import image from "../img/puzzle-959x539.jpg";
import {getIndividualInvestorForm, getCorporateInvestorForm } from "./ApiCore";
import {isAuthenticated} from "../auth";






const Card = ({project}) => {






    return (
       
     
      <div class="col-md-12 col-lg-6 col-xl-4">
      <div class="card m-b-30">
     
        <ShowImage item={project} url="project" />
        <div class="card-body">
          <h5 class="property-title">
          <a target="_black" href={`${project.website}`} >{project.title}</a>
          </h5>
          <p>
            <span class="badge badge-success text-uppercase">
            {project.category.name}
            </span>
          </p>
          <span class="property-address">
            <i class="fas fa-map-marker-alt fa-xs"></i> {project.location}
          </span>
          <span class="property-agent-date">
            <i class="far fa-clock fa-md"></i>  &nbsp;&nbsp; {moment(project.createdAt). fromNow()}
          </span>
          <div
            class="property-price"
            style={{ fontSize: "30px", color: "red" }}
          >
           ₦{project.pledge.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}<span></span>{" "}
          </div>

          <ul class="property-info list-unstyled d-flex">
            <i
              class="fas fa-chart-bar"
              style={{ margin: " 4px 0px 0px 0px" }}
            ></i>{" "}
            &nbsp;&nbsp;{project.returns}% returns in {project.duration}
          </ul>
        </div>
        <div class="card-footer">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="blog-link">
               
                 
             
                
          
                    <Link to={`/investment/${project._id}`} class="btn btn-primary"> MORE <i class="feather icon-arrow-right ml-2"></i>
                    </Link>
                
                   
                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
       
    );
};

export default Card;