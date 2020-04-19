import { API } from "../config";



   export const createIndividualInvestorApplicationForm = (userId, token, data) => {
    return  fetch(`${API}/individual/investor/application/create/${userId}`, {
         method: "POST",
         headers: {
             Accept: "application/json",
             
             Authorization: `Bearer ${token}`
         },
         body: data
     })
         .then(response => {
             return response.json();
         })
         .catch(err => {
             console.log(err);
         });
 };


 export const createCorporateInvestorApplicationForm = (userId, token, data) => {
    return  fetch(`${API}/corporate/investor/application/create/${userId}`, {
         method: "POST",
         headers: {
             Accept: "application/json",
             
             Authorization: `Bearer ${token}`
         },
         body: data
     })
         .then(response => {
             return response.json();
         })
         .catch(err => {
             console.log(err);
         });
 };



 export const getCategories = () => {
    return fetch (`${API}/categories`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getFilteredProduct = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }
    return  fetch(`${API}/project/by/search`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    };



 

    export const getProject = (projectId) => {
        return fetch (`${API}/project/read/${projectId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };


    export const getProjectGallery = (projectId) => {
        return fetch (`${API}/gallery/related/${projectId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };

    export const getProjectAll = () => {
        return fetch (`${API}/project/listProject?order=desc&limit=6`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };



    export const getIndividualInvestorForm = (userId) => {
        return fetch (`${API}/individual/investor/related/${userId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };

    export const getCorporateInvestorForm = (userId) => {
        return fetch (`${API}/corporate/investor/related/${userId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };


    
 

 