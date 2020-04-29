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
        <div class="row">
          <div class="col-md-3">
            <div class="accordion" id="productPanels">
              <div class="card-">
                <h6 class="card-header bg-white accordion-heading single-product mb-0">
                  <a
                    class="text-dark"
                    href="#productInfo"
                    role="button"
                    data-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="productInfo"
                  >
                    <i class="fa fa-eercast mr-3 font-16"></i>Filter By Category
                  </a>
                </h6>
                <div
                  class="collapse show"
                  id="productInfo"
                  data-parent="#productPanels"
                >
                  <div class="card-body pb-0 border-bottom">
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
              {header()}
              {content2()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Inestment;
