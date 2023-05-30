// import { PublicAxios,PrivateAxios,errHandler } from '../helper/network.js'
import Post from '../model/Post';
import Network from '../helper/network';
import Comment from '../model/Comment';

const TYPE = 'post';

export default {
    query: (search, isNeed) => { // typeId:INT , isNeed : "true"||"false"
        return Network.PublicAxios.get(`${TYPE}/query`, { params: { search, isNeed } })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err, `${TYPE}/query`))
    },
    getById: (postId) => { // postId : String
        return Network.PublicAxios.get(`${TYPE}/getById`, { params: { postId } })
        .then(res => new Post(res.data))
        .catch(err => Network.errHandler(err, `${TYPE}/getById`))
    },
    getPosts: (typeId, isNeed) => { // typeId:INT , isNeed : "true"||"false"
        return  Network.PublicAxios.get(`${TYPE}/query`, { params: { typeId, isNeed } })
        .then(res => res.data.map(value=>new Post(value)))
        .catch(err => Network.errHandler(err, `${TYPE}/getPosts`))
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
        .catch(err => Network.errHandler(err, `${TYPE}/getLimitPosts`))
    },
    getMyPosts: (isNeed) => {
        return Network.PrivateAxios.get(`${TYPE}/getUserPosts`, { params: { isNeed } })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err, `${TYPE}/getMyPosts`))
    },
    getUserPosts: (userId, isNeed) => {
        return Network.PrivateAxios.get(`${TYPE}/getUserPosts`, { params: { userId, isNeed } })
        .then(res => res.data.map(value => new Post(value)))
        .catch(err => Network.errHandler(err, `${TYPE}/getUserPosts`))
    },
    // private
    addNewPost: (post) => { // post : object(post)
        return  Network.PrivateAxios.post(`${TYPE}/addNewPost`, post)
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `${TYPE}/addNewPost`))
    },
    deletePost: (postId) => {
        return Network.PrivateAxios.delete(`${TYPE}/delete`, { params: { postId } })
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `${TYPE}/deletePost`))
    },
    updatePost: (post) => {
        return Network.PrivateAxios.post(`${TYPE}/update`, post)
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `${TYPE}/updatePost`))
    },
    addComment: (postId, text) => {
        return Network.PrivateAxios.post(`${TYPE}/addComment`, { postId, text })
        .then(res => {
            res.data.comment = new Comment(res.data.comment),
            res.data.post = new Post(res.data.post)
            return res.data
        })
        .catch(err => Network.errHandler(err, `${TYPE}/addComment`))
    },
};
