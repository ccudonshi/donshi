import Network from '../helper/network'
// Apis
import CommentApi from './CommentApi'
import PostApi from './PostApi'
import ReplyApi from './ReplyApi'
import TopicApi from './TopicApi'
import TypeApi from './TypeApi'
import UserApi from './UserApi'
import UtilApi from './UtilApi'

const APIcreator = async()=>{
    try {
        await Network.init();
    } catch (error) {
        console.error('error in APICREATOR '+ error)
    }
    return {
        CommentApi,
        PostApi,
        ReplyApi,
        TopicApi,
        TypeApi,
        UserApi,
        UtilApi
    }
}
export default APIcreator;