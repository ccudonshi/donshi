import Network from '../helper/network.js';
import Comment from '../model/Comment.js';
import Post from '../model/Post.js';
import Reply from '../model/Reply.js';

const TYPE = 'reply';

export default {
    deleteReply: (replyId) => {
        return Network.PrivateAxios.delete(`${TYPE}/delete`, { params: { id: replyId } })
        .then(res => {
            res.data.comment = new Comment(res.data.comment),
            res.data.post = new Post(res.data.post)
            res.data.reply = new Reply(res.data.reply)
            return res.data;
        })
        .catch(err => Network.errHandler(err, `${TYPE}/delete`));
    },
    updateReply: (replyId, text) => {
        return Network.PrivateAxios.post(`${TYPE}/update`, { id: replyId, text })
        .then(res => {
            res.data.comment = new Comment(res.data.comment),
            res.data.post = new Post(res.data.post)
            res.data.reply = new Reply(res.data.reply)
            return res.data;
        })
        .catch(err => Network.errHandler(err, `${TYPE}/update`));
    },
};