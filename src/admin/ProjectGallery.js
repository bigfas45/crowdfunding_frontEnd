import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import Aside from "./Aside";
import { isAuthenticated } from "../auth";
import {getProjectGallery } from "./ApiAdmin";
import { Spinner } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import {API} from '../config';



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




  return (
    <Fragment>
      <Header></Header>
      <Aside></Aside>
      <div className="content-wrapper">
      {projectHeaderForm()}
{projectImageGallery()}
      </div>
     
      <Footer></Footer>
    </Fragment>
  );
};

export default ProjectGallery;