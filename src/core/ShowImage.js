import React from 'react';
import {API} from '../config';
import '../styles.css';
import {Link} from 'react-router-dom';



const ShowImage = ({item , url}) => (

  
    <Link to={`/investment/${item._id}`} > <img class="card-img-top" src={`${API}/${url}/image/${item._id}`} alt={item.name}/></Link>
);


export default ShowImage;