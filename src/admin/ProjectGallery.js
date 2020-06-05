import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import {getProjectGallery } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import {API} from '../config';
import Menu from "./Menu";



const ProjectGallery = ({match}) => {

    const [gallery, setGallery] = useState([]);
    const [error, setError] = useState(false);


    const { user, token } = isAuthenticated();

      const init = (projectId) => {
        getProjectGallery(projectId).then(data => {
            if (data.error) {
               setError(data.error)
            }else{
                setGallery(data)
            }
        });
    };


   

    useEffect(() => {
      init(match.params.projectId);
  }, []);




    const projectHeaderForm = () => {
        return (
          <Fragment>
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1>Project Gallery</h1>
                  
                  </div>
                  
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <Link href="#">Home</Link>
                      </li>
                      <li className="breadcrumb-item active">Project Gallery</li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
            <div class="card-body pad table-responsive">
              <Link class="btn btn-primary" to={`/admin/project/gallery/create`}>Add</Link> 
              </div>
          </Fragment>
        );
      };


    const projectImageGallery = () => {
        return(
            <Fragment>
                 <section class="content">
      <div class="container-fluid">
        <div class="row">
              <div class="col-12">
            <div class="card card-primary">
              <div class="card-header">
                <div class="card-title">
                Project Gallery
                </div>
              </div>
             
              <div class="card-body">
                <div class="row">
                    { gallery.map((g, i) => {
                        return(
                            <div class="col-sm-2" key={i}>
                            <a href="https://via.placeholder.com/1200/FFFFFF.png?text=1" data-toggle="lightbox" data-title="sample 1 - white" data-gallery="gallery">
                            <img src={`${API}/gallery/file/${g._id}`} alt={g.project.title} style={{maxWidth:'100%', maxWidth: '100%'}} class="img-fluid mb-2" />
                            </a>
                          </div>
                        )
                    })}
                 
                 
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

    
    const footer = () => {
      return (<Fragment>
          <footer class="footer mt-auto footer-light">
              <div class="container-fluid">
                  <div class="row">
                      <div class="col-md-6 small">Copyright &copy;
                          <a href="ventureramp.com.ng">ventureramp.com.ng</a>
                          2020</div>
                      <div class="col-md-6 text-md-right small">
                          <a href="#!">Privacy Policy</a>
                          &middot;
                          <a href="#!">Terms &amp; Conditions</a>
                      </div>
                  </div>
              </div>
          </footer>
      </Fragment>)
  }

  const contentHeader = () => {
      return (<Fragment>


          <div class="page-header pb-10 page-header-dark bg-gradient-primary-to-secondary">
              <div class="container-fluid">
                  <div class="page-header-content">
                      <h1 class="page-header-title">
                          <div class="page-header-icon">
                              <i data-feather="file"></i>
                          </div>
                          <span>Project </span>
                      </h1>
                      <div class="page-header-subtitle">Manage your project here!</div>
                  </div>
              </div>
          </div>
      </Fragment>)
  }




return (<Fragment>
    <Header/>
    <div id="layoutSidenav">
        <Menu/>
        <div id="layoutSidenav_content">

            <main> {
                contentHeader()
            }

                {
                projectImageGallery()
            } </main>
            {
            footer()
        } </div>
    </div>
</Fragment>);

};

export default ProjectGallery;