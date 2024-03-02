const { default: mongoose } = require("mongoose");
const Post = require("../../schema/post/postSchema");
const { publisher } = require("../../services/redis-Pub-Sub")
const User = require("../../schema/user/userSchema");
const { uploadImage } = require("../../helpers/helpers")
const { createOrUpdateTrending } = require("../trending/trendingModel")

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
                _id : new mongoose.Types.ObjectId(),
                creator : user._id,
                caption : caption,
                tags : tags.split(','),
                location
            })
        }
        const post = await newPost.save();
        await User.findByIdAndUpdate(user._id, 
            { $push : { posts : post._id } }
        )
        const hastags = tags.split(',');
        // console.log("hastag", hastags)
        // for(let hastag of hastags){
        //     await createOrUpdateTrending(hastag)
        // }
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
            .select('c_c caption creator comment imageUrl l_c location s_c tags _id likes saved createdAt')
            .populate({
                path : "creator",
                select : { _id : 1, name: 1, username : 1, imageUrl : 1 }
            })
            .populate({
                path : "comment",
                populate : {
                    path : "creator",
                    select : '_id username imageUrl'
                }
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

        if(!isLiked){
            let notiData = {
                type : 'like',
                actionBy : userId,
                target: {
                    type : 'post',
                    id : postId
                }
            }
            await publisher("NOTIFICATION", notiData)
        }

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