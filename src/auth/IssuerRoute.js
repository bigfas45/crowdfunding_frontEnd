import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';


const IssuerRoute = ({component: Component, ...rest}) => (

  
     
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().user.userType === 0  ? (
        <Component {...props} />
    ) : (
        
        <Redirect to={{pathname: '/', state:{from: props.location}}} />
    )} />
);

export default IssuerRoute