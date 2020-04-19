import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import image from "../img/puzzle-959x539.jpg";
import image2 from "../img/person-investor.svg";
import {getProjectAll, getCategories, getFilteredProduct} from "./ApiCore";
import Card from './Card';
import CheckBox from './Checkbox';


const Inestment = () => {

    const [myFilters, setMyFilters] = useState({
        filters:  {category: []}
    });
    const [projectAll, setProjectAll] = useState([]);
    const [error, setError]  = useState(false);
    const [limit, setLimit]  = useState(6);
    const [skip, setSkip]  = useState(0);
    const [size, setSize]  = useState(0);
    const [filterResults, setFilterResults] = useState([]);
    const [categories, setCategories] = useState([]);

    const loadCategories = () => {

        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setCategories(data)
            }
        });

    };
  
    const init = () => {
        getProjectAll().then(data => {
          if (data.error) {
             setError(data.error);
          }else{
            setProjectAll(data);
          }
      });
  };

  const loadFilterResult = newFilters => {
   // console.log(newFilters);
    getFilteredProduct(skip, limit, newFilters).then(data => {
        if (data.error) {
            setError(data.error);
        }else{
            setFilterResults(data.data);
            setSize(data.size)
           setSkip(0)
        }
    })
};

const loadLoadMore = () => {
  let toSkip = skip + limit
  // console.log(newFilters);
   getFilteredProduct(toSkip, limit, myFilters.filters).then(data => {
       if (data.error) {
           setError(data.error);
       }else{
           setFilterResults([...filterResults, ...data.data]);
           setSize(data.size)
          setSkip(toSkip)
       }
   })
};

const loadMoreButton = () =>{
  return(
    size > 0 && size >= limit && (
      <button onClick={loadLoadMore} className="btn btn-warning mb-5">Load more</button>
    )
  )
}
  
  
  useEffect(() => {
    init();
    loadCategories();
    loadFilterResult(skip, limit, myFilters.filters)
  
  }, []);




  const handleFilters = (filters, filterBy) => {
    //console.log("SHOP", filters, filterBy)
    const newFilters = {...myFilters};
    newFilters.filters[filterBy] = filters;

   
    loadFilterResult(myFilters.filters);
    setMyFilters(newFilters);
 };

 const bread = () => {
     return(
         <Fragment>
                <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-12">
                <h1 style={{color: "#08255e", fill: "currentColor", fontSize: "1.802rem" , fontWeight: "500", lineHeight: "1.12", textTransform: "none" }}>Investment opportunities</h1>
<p style={{fontSize: ".875rem!important", lineHeight: "1.6!important", lineHeight: "1.6!important", lineHeight: "1.6", color: "#434756", maxWidth: "840px" }}>Investing in early-stage and growth companies puts your capital at risk. Please read our Risk Disclosure Statement and the description of risks on each campaign page. Provided by NASD</p>
              </div>
              
            </div>
          </div>
        </section>

        </Fragment>
     )
 }






  const content = () => {
    return (
      <Fragment>
     
        <section class="content">
          <div class="container-fluid">
            <div class="card card-default">
              <div class="card-body">
                <div class="contentbar">
                  <div class="row">
                  {filterResults.map((p,i) => {
                    return(
                        <Card project={p} />
                        )
                    })}
                     <hr />
                       {loadMoreButton()}
                    
                 
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
          {bread()}
         
      <div className="row">
           <div className="col-md-12 col-lg-2 col-xl-2 card m-l-30 cat">
           <div class="panel panel-primary">
              <h6 className="card-body font-weight-bold"><b>FILTER BY CATEGORIES</b></h6> <hr/>
              
                </div>
                      
                        <ul>
                        <CheckBox categories={categories}  handleFilters={filters => handleFilters(filters, 'category')} />
                        </ul>
            </div>
            <div className="col-10">
                 {content()}
            </div>
        </div>
       
         
        </div>
    </Fragment>
  );
};

export default Inestment;
