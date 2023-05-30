import Network from '../helper/network';
import Post from '../model/Post';
import Comment from '../model/Comment';
import Reply from '../model/Reply';

const TYPE = 'comment';

export default {
    //private
    deleteComment: (commentId) => {
        return Network.PrivateAxios.delete(`${TYPE}/delete`, { params: { id: commentId } })
        .then(res => {
            res.data.comment = new Comment(res.data.comment);
            res.data.post = new Post(res.data.post);
            return res.data;
        })
        .catch(err => Network.errHandler(err, `${TYPE}/deleteComment`));
    },
    updateComment: (commentId, text) => {
        return Network.PrivateAxios.post(`${TYPE}/update`, { id: commentId, text })
        .then(res => {
            res.data.comment = new Comment(res.data.comment);
            res.data.post = new Post(res.data.post);
            return res.data;
        })
        .catch(err => Network.errHandler(err, `${TYPE}/updateComment`));
    },
    addReply: (commentId, text) => {
        return Network.PrivateAxios.post(`${TYPE}/addReply`, { commentId, text })
        .then(res => {
            res.data.comment = new Comment(res.data.comment);
            res.data.post = new Post(res.data.post);
            res.data.reply = new Reply(res.data.reply);
            return res.data;
        })
        .catch(err => Network.errHandler(err, `${TYPE}/addReply`));
    },
};