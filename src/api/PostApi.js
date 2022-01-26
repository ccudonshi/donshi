// import { PublicAxios,PrivateAxios,errHandler } from '../helper/network.js'
import Post from '../model/Post';
import Network from '../helper/network';
import Comment from '../model/Comment';
const TYPE = 'post'
export default {
    query:(search,isNeed)=>{ // typeId:INT , isNeed : "true"||"false"
        return  Network.PublicAxios({
            method: 'post',
            url: `${TYPE}/query`,
            data:{search,isNeed}
        })
        .then(res=>res.data.map(value=>new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    getById:(postId)=>{ // postId : String
        return  Network.PublicAxios({
            method: 'post',
            url: `${TYPE}/getById`,
            data:{postId}
        })
        .then(res=>new Post(res.data))
        .catch(err => Network.errHandler(err))
    },
    getPosts:(typeId,isNeed)=>{ // typeId:INT , isNeed : "true"||"false"
        return  Network.PublicAxios({
            method: 'post',
            url: `${TYPE}/getAllWithType`,
            data:{typeId,isNeed}
        })
        .then(res=>res.data.map(value=>new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    getLimitPosts:(typeId,isNeed,offset,limit)=>{ // typeId:INT , isNeed : "true"||"false" ,offset:INT, limit:INT,
        return  Network.PublicAxios({
            method: 'post',
            url: `${TYPE}/getLimitWithType`,
            data:{typeId,isNeed,offset,limit}
        })
        .then(res=>res.data.map(value=>new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    // private
    addNewPost:(post)=>{ // post : object(post)
        return  Network.PrivateAxios({
            method: 'post',
            url: `${TYPE}/addNewPost`,
            data:{...post}
        })
        .then(res=>res.data)
        .catch(err => Network.errHandler(err))
    },
    // deletePost:(postId) 
    deletePost:(postId)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/delete`,
            data:{postId}
        })
        .then(res=>res.data)
        .catch(err=>Network.errHandler(err))
    },
    // updatePost:(post)
    updatePost:(post)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/update`,
            data:{...post}
        })
        .then(res=>res.data)
        .catch(err=>Network.errHandler(err))
    },
    // addComment(postId,text)
    addComment:(postId,text)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/addComment`,
            data:{postId,text}
        })
        .then(res=>{
            res.data.comment = new Comment(res.data.comment),
            res.data.post = new Post(res.data.post)
            return res.data
        })
        .catch(err=>Network.errHandler(err))
    }
    
    

};
