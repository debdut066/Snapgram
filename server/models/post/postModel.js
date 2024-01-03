const { default: mongoose } = require("mongoose");
const Post = require("../../schema/post/postSchema");
const { uploadImage } = require("../../helpers/helpers")

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
        console.log("newPost", newPost)
        const post = await newPost.save();
        return post;
    } catch (error) {
        console.log("error",error);
        throw error;
    }
}

async function getPost(page, limit){
    try {
        const posts = await Post.find()
            .populate({
                path : "creator",
                select : { _id : 1, name : 1, username : 1, imageUrl : 1}
            })
            .sort({ createdAt : -1 })
            .skip(limit * (page - 1))
            .limit(limit);        
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

module.exports = {
    createPost,
    getPost,
    likePost,
    deletePost,
    singlePost,
}