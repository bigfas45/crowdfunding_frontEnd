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

      export const readUser = (userId, token) => {
        return fetch (`${API}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };


    export const payment = (userId, token, data) => {
        return  fetch(`${API}/payment/create/${userId}`, {
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


     export const getPaymentByRef = (refId, userId, token) => {
        return fetch (`${API}/payment/${refId}/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };


    
    export const getBraintreeClientToken = (userId, token) => {
        return fetch (`${API}/braintree/getToken/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };


    export const processPayment = (payId, userId, token, data) => {
        return fetch (`${API}/payment/${payId}/${userId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: data
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };
    


    export const paymentMail = (refId, userId, token) => {
        return fetch (`${API}/mail/payment/${refId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };


    export const getUserPayment = ( userId, token) => {
        return fetch (`${API}//payment/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
    };
    


    export const getProductPayment = (paymentId) => {
   
        return  fetch(`${API}/payment/project/${paymentId}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  
                },
            })
                .then(response => {
                    return response.json();
                })
                .catch(err => {
                    console.log(err);
                });
        };


        export const getProductDocument = (projectId) => {
   
            return  fetch(`${API}/document/related/${projectId}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      
                    },
                })
                    .then(response => {
                        return response.json();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            };
        
    



    
 

 