// import { PublicAxios,PrivateAxios,errHandler } from '../helper/network.js'
import Post from '../model/Post';
import Network from '../helper/network';
import Comment from '../model/Comment';

const TYPE = 'post';

export default {
    query: (search, isNeed) => { // typeId:INT , isNeed : "true"||"false"
        return Network.PublicAxios.get(`${TYPE}/query`, { params: { search, isNeed } })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    getById: (postId) => { // postId : String
        return Network.PublicAxios.get(`${TYPE}/getById`, { params: { postId } })
        .then(res => new Post(res.data))
        .catch(err => Network.errHandler(err))
    },
    getPosts: (typeId, isNeed) => { // typeId:INT , isNeed : "true"||"false"
        return  Network.PublicAxios.get(`${TYPE}/query`, { params: { typeId, isNeed } })
        .then(res => res.data.map(value=>new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    getLimitPosts: (typeId, isNeed, offset, limit) => { // typeId:INT , isNeed : "true"||"false" ,offset:INT, limit:INT,
        return  Network.PublicAxios.get(`${TYPE}/query`, {
            params: {
                typeId,
                isNeed,
                offset,
                limit,
            },
        })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    getMyPosts: (isNeed) => {
        return Network.PrivateAxios.get(`${TYPE}/getUserPosts`, { isNeed })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    getUserPosts: (userId, isNeed) => {
        return Network.PrivateAxios.get(`${TYPE}/getUserPosts`, { userId, isNeed })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err))
    },
    // private
    addNewPost: (post) => { // post : object(post)
        return  Network.PrivateAxios.post(`${TYPE}/addNewPost`, post)
        .then(res => res.data)
        .catch(err => Network.errHandler(err))
    },
    deletePost: (postId) => {
        return Network.PrivateAxios.delete(`${TYPE}/delete`, { params: { postId } })
        .then(res => res.data)
        .catch(err => Network.errHandler(err))
    },
    updatePost: (post) => {
        return Network.PrivateAxios.post(`${TYPE}/update`, post)
        .then(res => res.data)
        .catch(err => Network.errHandler(err))
    },
    addComment: (postId, text) => {
        return Network.PrivateAxios.post(`${TYPE}/addComment`, { postId, text })
        .then(res => {
            res.data.comment = new Comment(res.data.comment),
            res.data.post = new Post(res.data.post)
            return res.data
        })
        .catch(err => Network.errHandler(err))
    },
};
