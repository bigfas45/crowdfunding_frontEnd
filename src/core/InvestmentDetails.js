import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import image from "../img/puzzle-959x539.jpg";
import {getProject, getProjectGallery , getIndividualInvestorForm, getCorporateInvestorForm } from "./ApiCore";
import ReactHtmlParser from 'react-html-parser';
import '../styles.css';
import {API} from '../config';


const InestmentDetails = ({match}) => {
  const {
    user: {
        _id,
        firstname,
        lastname,
        email,
        role
    }
} = isAuthenticated();
const [investorForm, setInvestorForm] = useState([]);
  const [corporateForm, setCorporateForm] = useState([]);
  let individual = '';
  let corporate = '';


    const [projectAll, setProjectAll] = useState([]);
    const [gallery, setGallery] = useState([]);
  
    const [error, setError] = useState(false);
    let count =0;
  
    const init = (projectId) => {
      getProject(projectId).then(data => {
        if (data.error) {
           setError(data.error);
        }else{
          setProjectAll(data);
        }
    });
  };
  
  const initProjectGallery = (projectId) => {
    getProjectGallery(projectId).then(data => {
        if (data.error) {
           setError(data.error)
        }else{
            setGallery(data)
        }
    });
  };

  const initIndividual = () => {
    getIndividualInvestorForm(_id).then(data => {
      if (data.error) {
         setError(data.error);
      }else{
        setInvestorForm(data)
        
      }
  });
};

const initCorporate = () => {
  getCorporateInvestorForm(_id).then(data => {
    if (data.error) {
       setError(data.error);
    }else{
      setCorporateForm(data);
    }
});
};

const process = () => {
  investorForm.map((invest, i) => {

    individual = invest.userId._id

  })

  corporateForm.map((cop, i) => {

    corporate = cop.userId._id

  })
}
    
  useEffect(() => {
    init(match.params.projectId);
    initProjectGallery(match.params.projectId);
    initIndividual();
    initCorporate();
  }, []);

const content = () => {
    return(

        <Fragment>
             <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Project Details</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active"></li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    {projectAll.map((d,i) => {
        return (
    <section class="content">

   
      <div class="card card-solid">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-sm-6">
            <a target="_black" href={`${d.website}`} > <h3>{d.title}</h3></a>
           <p><span class="badge badge-pill badge-danger">{d.category.name} </span></p> 
              <div class="row mt-4">
            <nav class="w-100">
              <div class="nav nav-tabs" id="product-tab" role="tablist">
                <a class="nav-item nav-link active" id="product-desc-tab" data-toggle="tab" href="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Description</a>
                
                <a class="nav-item nav-link" id="product-rating-tab" data-toggle="tab" href="#product-rating" role="tab" aria-controls="product-rating" aria-selected="false">Gallery</a>

                <a class="nav-item nav-link" id="product-comments-tab" data-toggle="tab" href="#product-comments" role="tab" aria-controls="product-comments" aria-selected="false">Documents</a>

                 <a class="nav-item nav-link" id="product-update-tab" data-toggle="tab" href="#product-update" role="tab" aria-controls="product-update" aria-selected="false">Updates</a>
              </div>
            </nav>
            <div class="tab-content p-3" id="nav-tabContent">
              <div class="tab-pane fade show active" id="product-desc" role="tabpanel" aria-labelledby="product-desc-tab"> <p>{ReactHtmlParser(d.description)} </p> </div>

                <div class="tab-pane fade" id="product-rating" role="tabpanel" aria-labelledby="product-rating-tab"> <div class="card-body">
                <div class="row">
                { gallery.map((g, i) => {
                    return(
                  <div class="col-sm-4">
                    <a href="img/puzzle-959x539.jpg" data-toggle="lightbox"  data-gallery="gallery">
                      <img src={`${API}/gallery/file/${g._id}`} alt={g.name} class="img-fluid mb-2" alt="white sample"/>
                    </a>
                  </div>
                 
                 )
                })}
                  
                                 
                  
                </div>
              </div> </div>

              <div class="tab-pane fade" id="product-comments" role="tabpanel" aria-labelledby="product-comments-tab"> </div>

               <div class="tab-pane fade" id="product-update" role="tabpanel" aria-labelledby="product-update-tab"> </div>
             
            </div>
          </div>
            </div>
            <div class="col-12 col-sm-6">
              

              <hr />
           

              <h5 class="mt-3"><i class="fas fa-map-marker-alt fa-xs"></i>    {d.location}</h5>
              

              <div class=" py-2 px-3 mt-4">
                <h2 class="mb-0" style={{color: "red"}}>
                ₦{d.pledge.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                </h2>
                <h4 class="mt-0">
                  <small>Goal </small>
                </h4>
                 <h2 class="mb-0" style={{color: "green"}}>
                  ₦0
                </h2>
                <h4 class="mt-0">
                  <small>Raised </small>
                </h4>
                 <ul class="property-info list-unstyled d-flex">
                
                <i class="fas fa-chart-bar" style={{margin: "4px 0px 0px 0px"}}></i>   &nbsp;{d.returns}% returns in {d.duration} months
             
              </ul> 
              </div>

                  <div class="mt-4">
                <div class="btn btn-primary btn-lg btn-flat">
                  <i class="fas fa-plus fa-lg mr-2"></i> 
                  {process()}

                  {individual === _id || corporate === _id ? 'INVEST' : (
                    <Link to={`/investor/registration`} class="btn btn-primary"> REGISTER <i class="feather icon-arrow-right ml-2"></i>
                    </Link>
                  )} 
                </div>


              </div>

              <div class="mt-4">
            
             

              <div class="mt-4 product-share">
                <a href="#" class="text-gray">
                  <i class="fab fa-facebook-square fa-2x"></i>
                </a>
                <a href="#" class="text-gray">
                  <i class="fab fa-twitter-square fa-2x"></i>
                </a>
               
              </div>

            </div>
          </div>
         
        </div>
     
      </div>
      </div>

    </section>
    )
})}
        </Fragment>
    )
}


    return(
        <Fragment>
         
      <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
        {content()}
        </div>

        </Fragment>
    )

}


export default InestmentDetails