import Network from '../helper/network.js'
import Topic from '../model/Topic'
const TYPE = 'topic'
export default {
    //public
    getTopicsWithType: (typeId) => {
        return Network.PublicAxios.get(`${TYPE}/getWithType`, { typeId })
        .then(res => res.data.map(value => new Topic(value)))
        .catch(err => Network.errHandler(err));
    },
    //private
    deleteTopic: (topicId) => {
        return Network.PrivateAxios.delete(`${TYPE}/deleteTopic`, { params: { topicId } })
        .then(res => new Topic(res.data))
        .catch(err => Network.errHandler(err));
    },
    addTopic: (typeId,topicName) => {
        return Network.PrivateAxios.post(`${TYPE}/addTopic`, { typeId, topicName })
        .then(res => new Topic(res.data))
        .catch(err => Network.errHandler(err));
    },
};
