import axios from 'axios';

const API = axios.create({ baseURL: "https://memories-server-jk5s.onrender.com" })

// for the server middleware to work correctly, we need to add something to each one of our API requests
API.interceptors.request.use((req) => {
    // to send token to the backend middleware to verify that the client is acutally logged in
    if (localStorage.getItem('profile'))    {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;

})


// we are exporting this becoz we want to add redux capabilites
// all actions to the backend are being done using redux in this project
// we will be dispatching those actions
// for that we will be creating some folder structure and files which will make managing the states easier
// which will have our consistency


export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
