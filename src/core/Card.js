import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import image from "../img/puzzle-959x539.jpg";
import {getProductPayment } from "./ApiCore";
import {isAuthenticated} from "../auth";






const Card = ({project}) => {

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
let amount=0
let total =0
let percentage=0

  const init = () => {
    getProductPayment(project._id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setData(data);
      }
    });
  };

  const payment = () => {
    data.map((p,i) => {
      amount = p.amount
      total += amount
      console.log(amount)
    })
  }

  const perce = (pledge)  => {
    percentage = ( ((total)/pledge) *100 )
    return percentage
  }



  useEffect(() => {
   
    init();
   
  }, []);





    return (
      
      <div class="col-sm-6 col-lg-6 col-xl-6">
      <div class="single-product-item mb-30">
          <div class="product-card">


              <div class="card-flag badge badge-danger badge-pill card-flag-top-right">    {project.projectType}</div>
              <ShowImage item={project} url="project" />
              <div class=""><br/>
              {  payment()}
                  <h3 class="text-primary mb-0"><a target="_black" href={`${project.website}`} >{project.title}</a></h3>
                  <div class="small text-gray-800 font-weight-500">
                      <span><br/><i style={
                                  {color: "green"}
                              }
                              class="fa fa-bar-chart"
                              style={
                                  {margin: "4px 0px 0px 0px;"}
                          }></i>
&nbsp;{project.returns}% returns in {project.duration}            
          </span>
                  </div>
                  <div class="small text-gray-500">
                      <h5 class="font-14">&nbsp;<span class="float-right">{perce(project.pledge).toFixed(0)}%</span>
                      </h5>
                      <div class="progress h-8 mb-20">
                          <div class="progress-bar bg-info wow animated progress-animated"
                              style={{width:`${perce(project.pledge).toFixed(0)}%`}}
                              role="progressbar">
                              <span class="sr-only">60% Complete</span>
                          </div>
                      </div>

                      <div class="d-flex justify-content-between align-items-center">
                          <h5 style={
                              {color: "red"}
                          }>   ₦{project.pledge.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}<p>Goal</p>
                          </h5>
                          <h5 style={
                              {color: "green"}
                          }>              ₦{total.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}<p>pledged</p>

                          </h5>
                          <h5 class="product-price mb-0 mt-0">  {moment(project.createdAt). fromNow()}<p>Duration</p>
                          </h5>

                      </div>
                  </div>
              </div>
              <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                  <div class="product-buttons">
                  <Link class="btn btn-default btn-light mt-30" to={`/investment/${project._id}`}>Read More</Link>
                  </div>
              </div>
          </div>
      </div>
  </div>

  
     
       
    );
};

export default Card;