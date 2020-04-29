import React, { Fragment } from "react";

import { Link } from "react-router-dom";



const Footer = () => {


    return(
        <Fragment>
            <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <footer className="footer-area d-flex align-items-center flex-wrap">
                  <div className="copywrite-text">
                    <p>
                      Created by <Link to="#">Theme-zome</Link>
                    </p>
                  </div>

                  <ul className="footer-nav d-flex align-items-center">
                    <li>
                      <Link to="#">About</Link>
                    </li>
                    <li>
                      <Link to="#">Privacy</Link>
                    </li>
                    <li>
                      <Link to="#">Purchase</Link>
                    </li>
                  </ul>
                </footer>
              </div>
            </div>
          </div>
        </Fragment>
    )

}


export default Footer