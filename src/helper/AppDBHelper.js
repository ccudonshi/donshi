import Network from './network.js'
import MyToken from '../model/MyToken.js';
import APIcreator from '../api'
import FormData  from 'form-data'

const getFilename = ({ uri, fileName }) => (uri)
                                                ? (typeof fileName === "undefined")
                                                        ? uri.split("/")[uri.split("/").length - 1]
                                                        : fileName
                                                : null;
      
const uploadImg= async (files)=>{
        console.log('files')
        console.log(files)
        if(files.length==0)return ;
        let data = new FormData();
        files.map(value=>data.append('upload',{
                uri: value.uri,
                name: getFilename(value),
                type: 'image/*'
        }))
        let result = await (await APIcreator()).UtilApi.uploadImage(data)
        // result = result.map(value=>{
        //         value.url = Config.BASEURL + value.url;
        //         return value;
        // })
        console.log('result')
        console.log(result)
        return result;
  
};

const refreshTok = (data) =>  (data.success)
        ?   MyToken.saveToken(data.token)
                .then(()=>MyToken.getToken())
                .then(token=>Network.renewPrivateAxios(token))
                .then(()=>data)
        :   Promise.reject(new Error("failed login or register"));

const processIsNeed = (isNeed) =>(isNeed)?'true':'false';

// 以下是包好的功能，有看不懂的再問我
export default async function AppDBHelper(){
        const apis= await APIcreator();

        return {
                uploadImage:(files)                         => uploadImg(files),
                                                                
                /**
                 * @param  {int} currentVersion
                 */
                checkVersion:(currentVersion)               =>  apis.UtilApi.checkVersion(currentVersion),
                
                /**
                 * @param  {string} search                 
                 */
                searchUser:(search)                         =>  apis.UserApi.searchUser(search),

                getAllUsernames:()                          =>  apis.UserApi.getAllusernames(),
                
                /** 
                 * @param  {int} commentId
                 */
                deleteComment:(commentId)                   =>  apis.CommentApi.deleteComment(commentId),
                
                /**
                 * @param  {int} commentId
                 * @param  {String} text
                 */
                updateComment:(commentId,text)              =>  apis.CommentApi.updateComment(commentId,text),
                addReply:(commentId,text)                   =>  apis.CommentApi.addReply(commentId,text),
                
                /**
                 * @param  {int} replyId
                 */
                deleteReply:(replyId)                       =>  apis.ReplyApi.deleteReply(replyId),
                
                /**
                 * @param  {int} replyId
                 * @param  {String} text
                 */
                updateReply:(replyId,text)                  =>  apis.ReplyApi.updateReply(replyId,text),
                
                
                /**
                 * @param  {String} userId
                 */
                getOtherUser:(userId)                       =>  apis.UserApi.getOtherUser(userId),
                
                /**
                 * @param  {String} userId
                 * @param  {Boolean} isNeed
                 */
                getUserPosts:(userId,isNeed)                =>  apis.UserApi.getUserPosts(userId,processIsNeed(isNeed)),
                
                /**
                 * @param  {String} search
                 * @param  {Boolean} isNeed
                 */
                queryPost:(search,isNeed)                   =>  apis.PostApi.query(search,processIsNeed(isNeed)),
                
                /**
                 * @param  {Boolean} isNeed
                 */
                getMyPosts:(isNeed)                         =>  apis.UserApi.getMyPosts(processIsNeed(isNeed)),
                
                getMyInfo:()                                =>  apis.UserApi.getUser(),                                
                
                /**
                 * @param  {Array[Object{
                 * uri
                 * }]} files
                 * @param  {User} user
                 */
                updateUser:(files,user)                     =>  (files!=null&&files.length!=0)
                                                                ?   uploadImg(files)
                                                                        .then(urls  =>  {if(urls!=null)user.pictureUrl=urls[0];
                                                                                        return user;})
                                                                        .then(user  =>  apis.UserApi.updateUser(user))
                                                                : apis.UserApi.updateUser(user),
                /**
                 * @param  {String} postId
                 */
                getPostById:(postId)                        =>  apis.PostApi.getById(postId),
                
                /**
                 * @param  {int} typeId
                 * @param  {Boolean} isNeed
                 * @param  {int} offset 從第幾筆資料開始
                 * @param  {int} limit 一次幾筆
                 */
                getLimitPosts:(typeId,isNeed,offset,limit)  =>  apis.PostApi.getLimitPosts(typeId,processIsNeed(isNeed),offset,limit),
                
                /**
                 * @param  {int} typeId
                 * @param  {Boolean} isNeed
                 */
                getPosts:(typeId,isNeed)                    =>  apis.PostApi.getPosts(typeId,processIsNeed(isNeed)),
                
                /**
                 * @param  {Array[Object{
                 * uri
                 * }]} files
                 * @param  {Post} newPost
                 */
                addNewPost:(files,newPost)                  =>  (files!=null&&files.length!=0)
                                                                ? uploadImg(files)
                                                                        .then(urls  =>  {if(urls!=null)newPost.files=urls;
                                                                                        return newPost;})
                                                                        .then(post  =>  apis.PostApi.addNewPost(post))
                                                                : apis.PostApi.addNewPost(newPost),              
                /**
                 * @param  {Array[Object{
                 * uri
                 * }]} files
                 * @param  {Post} post
                 */
                updatePost:(files,post)                     =>  (post.id==null)
                                                                ?   Promise.reject(new Error('post.id need to has value when calling updatePost function!!'))
                                                                :   (files!=null&&files.length!=0)
                                                                        ? uploadImg(files)
                                                                        .then(urls  =>  {if(urls!=null)post.files=urls;
                                                                                                return post;})
                                                                        .then(post  =>  apis.PostApi.updatePost(post))
                                                                        : apis.PostApi.updatePost(post),
                /**
                 * @param  {String} postId
                 */
                deletePost:(postId)                         =>  apis.PostApi.deletePost(postId),

                /**
                 * @param  {String} postId
                 * @param  {String} text
                 */
                addComment:(postId,text)                    =>  apis.PostApi.addComment(postId,text)
                                                                                .then(data=>(data.success)?null:new Error('Add comment not success')),
                
                /**
                 * 取得所有大標 e.g.食衣住行育樂...
                 */
                getTypes:()                                 =>  apis.TypeApi.getTypes(),
                
                /**
                 * 取得所有小主題
                 */
                getTopics:()                                =>  apis.TopicApi.getTopics(),
                
                /**
                 * @param  {int} typeId
                 */
                getTopicsWithType:(typeId)                  =>  apis.TopicApi.getTopicsWithType(typeId),
                
                /**
                 * @param  {int} topicId
                 */
                deleteTopic:(topicId)                       =>  apis.TopicApi.deleteTopic(topicId),

                /**
                 * @param  {int} typeId
                 * @param  {String} topicName
                 */
                addTopic:(typeId,topicName)                 =>  apis.TopicApi.addTopic(typeId,topicName),
                
                checkTokExp:()                              =>  apis.UtilApi.checkTokExp().then(data=>(data.success)?refreshTok(data):data),
       
                /**
                 * @param  {String} account 
                 */
                login:(account)                             =>  apis.UserApi.login(account)
                                                                        .then(data=>refreshTok(data)),
                /**
                 * @param  {String} googleIdToken 
                 */
                googleLogin:(googleIdToken)                 =>  apis.UserApi.googleLogin(googleIdToken)
                                                                        .then(data=>(data.success)
                                                                                        ? refreshTok(data)
                                                                                        : Promise.resolve(data)),
                
                /**
                 * @param  {User} user
                 * @param  {Object{uri}} image
                 * @param  {String} googleIdToken
                 */
                register:(user,image,googleIdToken)         =>  apis.UserApi.register(user,googleIdToken)
                                                                .then(data=>refreshTok(data))
                                                                .then(data=>((image===null)
                                                                        ? Promise.resolve(data) 
                                                                        : uploadImg([image])
                                                                                .then(data => apis.UserApi.updateUser({...user,pictureUrl:data[0].url}))
                                                                )),

        }
}