import React, { useState, useEffect, Fragment } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {getProjects, deleteProduct} from './ApiAdmin'
import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";
import moment from 'moment';




const ManageProducts = () => {
    const [projects, setProjects] = useState([]);

    const {user, token} = isAuthenticated();
    let count =0;

    const loadProject = () => {
        getProjects().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setProjects(data)
            }
        })
    }

    useEffect(() => {
        loadProject()
    }, [])



const header = () => {
    return(
        <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Projects</h1>
            </div>
            <div className="col-sm-2">
           
            <Link class="btn btn-block btn-success btn-sm" to="/admin/project/create"> Add  Project </Link>
               
            </div>
          </div>
        </div>
      </section>
  
    )
}

const body = () => {
    return(
        <Fragment>
             <section className="content">

<div className="card">
  <div className="card-header">
    <h3 className="card-title">Projects</h3>

    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse" data-toggle="tooltip" title="Collapse">
        <i className="fas fa-minus"></i></button>
      <button type="button" className="btn btn-tool" data-card-widget="remove" data-toggle="tooltip" title="Remove">
        <i className="fas fa-times"></i></button>
    </div>
  </div>
  <div className="card-body p-0">
    <table className="table table-striped projects">
        <thead>
            <tr>
                <th style={{width: "1%"}}>
                    #
                </th>
                <th style={{width: "20%"}}>
                    Project Name
                </th>
                <th style={{width: "30%"}}>
                    Pledge
                </th>
                <th>
                Pledge Duration
                </th>
                <th>
                Category
                </th>
                <th style={{width: "8%"}} className="text-center">
                    Status
                </th>
                <th style={{width: "20%"}}>
                </th>
            </tr>
        </thead>
        <tbody>

            {projects.map((p, i) => {
                count++
                return(
                    <Fragment>
 <tr key={i}>
                <td>
                    {count}
                </td>
                <td>
                    <a>
                        {p.title}
                    </a>
                    <br/>
                    <small>
                    {moment(p.createdAt).format('LL')}
                    </small>
                </td>
                <td>
                &#8358;{p.pledge.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                </td>
                <td className="project_progress">
                  {p.duration}
                </td>
                <td> {p.category.name} </td>
                <td className="project-state">
                    {getStatus(p.status)}
                </td>
                <td className="project-actions text-right">
                    <Link className="btn btn-primary btn-sm" to={`/admin/project/gallery/${p._id}`}>
                        <i className="fas fa-folder">
                        </i>
                        View
                    </Link>
                    <Link className="btn btn-info btn-sm"to={`/admin/project/update/${p._id}`}>
                        <i className="fas fa-pencil-alt">
                        </i>
                        Edit
                        </Link>
                        
                </td>
            </tr>
                    </Fragment>
                )
            })}
           
          
           
              
        </tbody>
    </table>
  </div>

</div>


</section>
        </Fragment>
    )
}

const getStatus = (status) => {
    if (status ===0) {
        return <span className="badge badge-danger">Inactive</span>  
    } if (status ===1) {
        return <span className="badge badge-success">Active</span> 
    }
}


return(
    <Fragment>
    <Header></Header>
    <Aside></Aside>
    <div className="content-wrapper">
    {header()}
    {body()}
    </div>
    <Footer></Footer>
  </Fragment>
)

}

export default ManageProducts