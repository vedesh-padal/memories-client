import axios from 'axios';

const url = 'https://memories-app-basic.onrender.com/posts'

// we are exporting this becoz we want to add redux capabilites
// all actions to the backend are being done using redux in this project
// we will be dispatching those actions
// for that we will be creating some folder structure and files which will make managing the states easier
// which will have our consistency

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);