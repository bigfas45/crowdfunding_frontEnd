import React from 'react';
import {API} from '../config';
import '../styles.css';


const ShowImage = ({item , url}) => (

  
    <img class="card-img-top" src={`${API}/${url}/image/${item._id}`} alt={item.name}/>
);


export default ShowImage;