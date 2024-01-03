import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function createPost(data, token){
    const response = await axios.post(`${BASE_URL}/post/create`, data, {
        headers : {
            'Content-Type': 'multipart/form-data',          
            'Authorization' : `Bearer ${token}`
        }
    });
    try{
        return response.data;
    }catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}

export async function getRecentPost(token, page, limit){
    const response = await axios.get(`${BASE_URL}/post`, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        params : {
            page,
            limit
        }
    });
    try {
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getPostById(token, postId){
    const response = await axios.get(`${BASE_URL}/post/${postId}`, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    try {
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deletePost(postId, token){
    const response = await axios.delete(`${BASE_URL}/post/${postId}`, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    try {
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function likePost(postId, token){
    const response = await axios.put(`${BASE_URL}/post/like/${postId}`,
    { data : "" },
    {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })
    try {
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
}