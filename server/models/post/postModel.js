const { default: mongoose } = require("mongoose");
const Post = require("../../schema/post/postSchema");
const User = require("../../schema/user/userSchema")
const { uploadImage } = require("../../helpers/helpers")
// const { redisClient } = require("../../redisConnect")

const createPost = async (data) => {
    try {
        let imageUrl = "";
        let { caption, file, location, tags, user } = data;
        const result = await uploadImage(file);
        imageUrl = result;
        let newPost = {};

        if(file && result){
            newPost = Post({
                _id : new mongoose.Types.ObjectId(),
                creator : user._id,
                caption : caption,
                tags : [tags],
                imageUrl,
                location
            })
        }else{
            newPost = Post({
                _id :new mongoose.Types.ObjectId(),
                creator : user._id,
                caption : caption,
                tags : [tags],
                location
            })
        }
        const post = await newPost.save();
        console.log("post", post, ":", user._id)

        await User.findByIdAndUpdate(user._id, 
            { $push : { posts : post._id } }
        )
        return post;
    } catch (error) {
        console.log("error",error);
        throw error;
    }
}

async function getPost(page, limit){
    try {
        // const posts = await redisClient.hGet('allPost', 'post');
        // if(posts){
        //     return JSON.parse(posts);
        // }else{
        //     const posts = await Post.find()
        //     .populate({
        //         path : "creator",
        //         select : { _id : 1, name : 1, username : 1, imageUrl : 1}
        //     })
        //     .sort({ createdAt : -1 })
        //     .skip(limit * (page - 1))
        //     .limit(limit); 
            
        //     await redisClient.hSet('allPost', 'post', JSON.stringify(posts))
        //     return posts;
        // }
        const posts = await Post.find()
            .populate({
                path : "creator",
                select : { _id : 1, name : 1, username : 1, imageUrl : 1}
            })
            .sort({ createdAt : -1 })
            .skip(limit * (page - 1))
            .limit(limit); 
            
            // await redisClient.hSet('allPost', 'post', JSON.stringify(posts))
        return posts;        
    } catch (error) {
        console.log("error",error);
        throw error;
    }
}

async function singlePost(postId){
    try {
        const post = await Post.findById(postId)
            .populate({
                path : "creator",
                select : { _id : 1, name: 1, username : 1, imageUrl : 1 }
            })
        return post;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletePost(postId){
    try {
        await Post.findByIdAndDelete(postId);
        return "post is deleted successfully";
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function likePost(postId, userId){
    try {
        const post = await Post.findById(postId);
        const isLiked = post.likes.includes(userId);
        const option = isLiked ? "$pull" : "$addToSet";

        const updatePost = await Post.findByIdAndUpdate(
            postId,
            { [option] : { likes : userId} },
            { new : true},
        );

        return updatePost;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function editPost(postId, data){
    try {
        const updatePost = await Post.findByIdAndUpdate(postId,{ 
                $set : {
                    caption : data.caption,
                    tags :  data.tags,
                    location : data.location
                }
            },
            { new : true},
        );

        return updatePost;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function searchPost(searchTerm){
    try{
        let regex = new RegExp(searchTerm, 'i');
        const postSearch = await Post.find({
            caption : { $regex : regex }
        }).populate({
            path : "creator",
            select : { _id : 1, name: 1, username : 1, imageUrl : 1 }
        })     
        
        return postSearch;

    }catch(error){
        throw error;
    }
}

async function savePost(postId, userId){
    try{
        const post = await Post.findById(postId);
        const isSaved = post.saved.includes(userId);
        const option = isSaved ? "$pull" : "$push";

        await Post.findByIdAndUpdate(postId, { [option] : {saved : userId }});
        await User.findByIdAndUpdate(userId, { [option] : {saved : postId }})

        return "saved post"
    }catch(error){
        throw error;
    }
}

module.exports = {
    createPost,
    getPost,
    likePost,
    editPost,
    deletePost,
    singlePost,
    searchPost,
    savePost
}