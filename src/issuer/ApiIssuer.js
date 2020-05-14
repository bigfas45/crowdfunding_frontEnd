import { API } from "../config";



   


    
 

export const createProject = (userId, token, product) => {
    return  fetch(`${API}/project/create/${userId}`, {
         method: "POST",
         headers: {
             Accept: "application/json",
             
             Authorization: `Bearer ${token}`
         },
         body: product
     })
         .then(response => {
             return response.json();
         })
         .catch(err => {
             console.log(err);
         });
 };


 export const getProjects = (userId, token) => {
    return fetch (`${API}/project/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getProject = (projectId) => {
    return fetch (`${API}/project/${projectId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getProjectRead = (projectId) => {
    return fetch (`${API}/project/read/${projectId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};



export const updateProject = (projectId, userId, token, project) => {
    return fetch (`${API}/project/${projectId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
     body: project
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const createGallery = (userId, token, gallery) => {
    return  fetch(`${API}/gallery/create/${userId}`, {
         method: "POST",
         headers: {
             Accept: "application/json",
             
             Authorization: `Bearer ${token}`
         },
         body: gallery
     })
         .then(response => {
             return response.json();
         })
         .catch(err => {
             console.log(err);
         });
 };


 export const getProjectGallery = (projectId) => {
    return fetch (`${API}/gallery/related/${projectId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getCategories = () => {
    return fetch (`${API}/categories`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": 'application/json'
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const createDocument = (userId, token, document) => {
    return  fetch(`${API}/document/create/${userId}`, {
         method: "POST",
         headers: {
             Accept: "application/json",
             
             Authorization: `Bearer ${token}`
         },
         body: document
     })
         .then(response => {
             return response.json();
         })
         .catch(err => {
             console.log(err);
         });
 };


 export const getProjectDocument = (projectId) => {
    return fetch (`${API}/document/related/${projectId}`, {
        method: "GET",
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getProductPayment = (productId, token) => {
    return fetch (`${API}/payment/project/${productId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const createIssuerApplicationForm = (userId, token, data) => {
    return  fetch(`${API}/issuer/application/create/${userId}`, {
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


 export const verificationMail = ( userId, token) => {
    return fetch (`${API}/mail/application/verification/${userId}`, {
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




export const getIssuerApplicationForm = (userId) => {
    return fetch (`${API}/issuer/related/${userId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getInvestorList = () => {
    return fetch (`${API}//users/investor/list`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getProjectCount = () => {
    return fetch (`${API}/project/listProject`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


export const getPayment = () => {
   
    return  fetch(`${API}/payments`, {
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