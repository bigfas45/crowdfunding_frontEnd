import { API } from "../config";

export const createCategory = (userId, token, category) => {
    return  fetch(`${API}/category/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    };

    export const updateCategory = (userId, catID, token, category) => {
        return  fetch(`${API}/category/${catID}/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(category)
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


    export const readCategories = (catId) => {
        return fetch (`${API}/category/${catId}`, {
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


     export const getProjects = () => {
        return fetch (`${API}/project`, {
            method: "GET"
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


    
    export const getAllUsers = (userId, token) => {
        return fetch (`${API}/users/${userId}`, {
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




    export const updateUser = (updatedUserId,  token, user) => {
        return fetch (`${API}/user/${updatedUserId}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
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



 