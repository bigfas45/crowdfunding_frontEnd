import React, {Fragment, useEffect, useState} from "react";
import Header from "./Header";
import Aside from "./Aside";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import  image from  '../img/company.svg';
import  image2 from  '../img/person-investor.svg';
import {getIndividualInvestorForm, getCorporateInvestorForm } from "./ApiCore";


const Home = () => {
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
  const [error, setError] = useState(false);
  let individual = '';
  let corporate = '';


  const init = () => {
    getIndividualInvestorForm(_id).then(data => {
      if (data.error) {
         setError(data.error);
      }else{
        setInvestorForm(data)
        
      }
  });
};


const init2 = () => {
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
  init();
  init2();
}, []);



    
    const Reg = () => {
      return(
          <Fragment>
  <section className="content">
    <div className="container-fluid">

      <div className="card card-default">
       

        <div className="card-body">
          <h3>Verify Your Identity</h3>
                   
          <div className="row">

    
        <div className="col-md-6">
         
            <div className="widget-user-header text-center">
              
                <img src={image2} alt="User Avatar"/>
                <p>I want to invest as an individual</p>
                <p>This will allow you to invest as an individual.</p>
                <a href="/individual/investor/registration"><button class="btn btn-block btn-primary ">VERIFY AS AN INDIVIDUAL</button></a>
            
            
            </div>
           
          </div>
       
        <div className="col-md-6">
         
            <div className="widget-user-header text-center">
              
                <img src={image} alt="User Avatar"/>
                <p>I want to invest as a company</p>
                <p>This will allow you to invest as a company.</p>
                <a href="/corporate/investor/registration"> <button class="btn btn-block btn-primary ">VERIFY AS A COMPANY</button></a>
            
            
           
          </div>
        </div>
       
      </div>
    

     
      </div>
      </div>
      </div>
      </section>
                            
          
        
     
     
        
   


          </Fragment>
      )
  }


    const lastActivty = () => {

        return (
            <Fragment>
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Latest activity</h3>
                    </div>
                    <div className="card-body">
                        <strong>
                            <i className="fas fa-book mr-1"></i>
                            Education</strong>

                        <p className="text-muted">
                            B.S. in Computer Science from the University of Tennessee at Knoxville
                        </p>

                        <hr/>

                        <strong>
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            Location</strong>

                        <p className="text-muted">Malibu, California</p>

                        <hr/>

                        <strong>
                            <i className="fas fa-pencil-alt mr-1"></i>
                            Skills</strong>

                        <p className="text-muted">
                            <span className="tag tag-danger">UI Design</span>
                            <span className="tag tag-success">Coding</span>
                            <span className="tag tag-info">Javascript</span>
                            <span className="tag tag-warning">PHP</span>
                            <span className="tag tag-primary">Node.js</span>
                        </p>

                        <hr/>

                        <strong>
                            <i className="far fa-file-alt mr-1"></i>
                            Notes</strong>

                        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                    </div>

                </div>


            </Fragment>
        )
    }

    const contentHeader = () => {
        return (
            <Fragment> {/* <!-- Content Header (Page header) --> */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Welcome {firstname}
                                    {lastname}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active">Dashboard v2</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

  //   const display = (individual)  => {
      
  //  if (individual === _id || corporate === _id) {
  //    return ''
  //  } else {
  //   return  Reg();
  //  }
  //   }


    const content = () => {
        return (
            <Fragment>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9">
                                <div className="callout callout-info">
                                    <h5>
                                        <i className="fas fa-info"></i>
                                        Note:</h5>
                                    This is your dashboard. An overview of everything you have going on at any time such as your assets, investments, trades and fundraising campaigns, will show up here.
                                </div>
                                {process()}
                                {/* {display(individual)} */}

                                {individual === _id || corporate === _id ? '' : Reg()}
                         
                            </div>
                            <div className="col-3">
                                
                                
                              {  lastActivty() }
                            </div>


                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Header></Header>
            <Aside></Aside>
            <div className="content-wrapper">
                {
                contentHeader()
            }
         
                {
                content()
               
            }



             </div>

        </Fragment>
    );
};

export default Home;

