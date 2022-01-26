import Network from '../helper/network.js'
import Topic from '../model/Topic'
const TYPE = 'topic'
export default {
    //public
    getTopics:()=>{ 
        return  Network.PublicAxios({
            method: 'post',
            url: `${TYPE}/getAll`,
        })
        .then(res=>res.data.map(value=>new Topic(value)))
        .catch(err => Network.errHandler(err))
    },
    getTopicsWithType:(typeId)=>{
        return Network.PublicAxios(
            {
                method:'post',
                url:`${TYPE}/getWithType`,
                data:{typeId}
            }
        )
        .then(res=>res.data.map(value=>new Topic(value)))
        .catch(err => Network.errHandler(err))
    },
    //private
    deleteTopic:(topicId)=>{
        return Network.PrivateAxios(
            {
                method:'post',
                url:`${TYPE}/deleteTopic`,
                data:{topicId}
            }
        )
        .then(res=>new Topic(res.data))
        .catch(err => Network.errHandler(err))
    },
    addTopic:(typeId,topicName)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/addTopic`,
            data:{typeId,topicName}
        })
        .then(res=>new Topic(res.data))
        .catch(err => Network.errHandler(err))

    },
   

};
