import React, { Fragment, useEffect, useState } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import image from "../img/puzzle-959x539.jpg";
import image2 from "../img/person-investor.svg";
import { getProjectAll, getCategories, getFilteredProduct } from "./ApiCore";
import Card from "./Card";
import CheckBox from "./Checkbox";
import headerImg from "../img/hand.jpg";
import Menu from "./Menu"

const Inestment = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] }
  });
  const [projectAll, setProjectAll] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filterResults, setFilterResults] = useState([]);
  const [categories, setCategories] = useState([]);

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const init = () => {
    getProjectAll().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProjectAll(data);
      }
    });
  };

  const loadFilterResult = newFilters => {
    // console.log(newFilters);
    getFilteredProduct(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadLoadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProduct(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilterResults([...filterResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadLoadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadCategories();
    loadFilterResult(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    //console.log("SHOP", filters, filterBy)
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilterResult(myFilters.filters);
    setMyFilters(newFilters);
  };



  const header = () => {
    return (
      <div class="row">
        <div class="col-12 box-margin">
          <div class="card">
            <div
              class="bg-size-cover bg-img py-5"
              style={{ backgroundImage: `url(${headerImg})` }}
            >
              <div class="row">
                <div class="col-lg-6 col-md-8">
                  <div class="pl-4">
                    <h3 class="mb-4">Investment opportunities</h3>
                    <p>
                      Investing in early-stage and growth companies puts your
                      capital at risk. Please read our{" "}
                      <a href="#"> Risk Disclosure Statement</a> and the
                      description of risks on each campaign page. Provided by
                      NASD.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

const content2 = () => {
    return (
        <Fragment>
            <div class="container-fluid mt-n10">
                <div class="card">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card box-margin">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-3">


                                            <div class="accordion" id="productPanels">
                                                <div class="card-">
                                                    <h6 class="card-header bg-white accordion-heading single-product mb-0">
                                                        <a class="text-dark" href="#productInfo" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="productInfo">
                                                            <i class="fa fa-eercast mr-3 font-16"></i>Filter By Status</a>
                                                    </h6>
                                                    <div class="collapse show" id="productInfo" data-parent="#productPanels">
                                                        <div class="card-body pb-0 border-bottom">

                                                            <div class="form-group">
                                                                <div class="checkbox checkbox-primary d-inline">
                                                                    <input type="checkbox" name="checkbox-p-1" id="checkbox-p-1"/>
                                                                    <label for="checkbox-p-1" class="cr">Loan</label>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="checkbox checkbox-primary d-inline">
                                                                    <input type="checkbox" name="checkbox-p-2" id="checkbox-p-2"/>
                                                                    <label for="checkbox-p-2" class="cr">Equity</label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-">
                                                    <h6 class="card-header bg-white accordion-heading single-product mb-0">
                                                        <a class="collapsed text-dark" href="#shippingOptions" role="button" data-toggle="collapse" aria-expanded="true" aria-controls="shippingOptions">
                                                            <i class="fa fa-eercast mr-3 font-16"></i>Filter By Category</a>
                                                    </h6>

                                                    <div class="collapse" id="shippingOptions" data-parent="#productPanels">
                                                        <div class="card-body border-bottom">
                                                           
                                                           
                                                        <CheckBox
                      categories={categories}
                      handleFilters={filters =>
                        handleFilters(filters, "category")
                      }
                    />

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                        <div class="col-md-9">

                                            <div class="row">

                                            {filterResults.map((p, i) => {
                return <Card project={p} />;
              })}
              <hr />
              {loadMoreButton()}


                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
};



const contentHeader = () => {
    return (
        <Fragment>


            <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
                <div class="container-fluid">
                    <div class="page-header-content">
                        <h1 class="page-header-title">
                            <div class="page-header-icon">
                                <i class="fa fa-money"></i>
                            </div>
                            <span>Investment opportunities</span>
                        </h1>
                        <div class="page-header-subtitle" style={{color: "white"}}>Investing in early-stage and growth companies puts your capital at risk. Please read our Risk Disclosure Statement and the description of risks on each campaign page. Provided by NASD.</div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}



  
  const footer = () => {
    return (
        <Fragment>
            <footer class="footer mt-auto footer-light">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 small">Copyright &copy; Your Website 2020</div>
                        <div class="col-md-6 text-md-right small">
                            <a href="#!">Privacy Policy</a>
                            &middot;
                            <a href="#!">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
  

  return (
    <Fragment>
    <Header/>
   <div id="layoutSidenav">
       <Menu/>
       <div id="layoutSidenav_content">

           <main> {
               contentHeader()
           }

           {content2()}
              
           
           </main>
           {
           footer()
       } </div>
   </div>
</Fragment>
  );
};

export default Inestment;
