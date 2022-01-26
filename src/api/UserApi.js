import Network from '../helper/network.js'
import User from '../model/User.js';
import Post from '../model/Post.js';
const TYPE = 'user';
export default {
    //public
    googleLogin:(googleIdToken)=>{
        return Network.PublicAxios({
            method:'post',
            url:`${TYPE}/googleLogin`,
            data:{googleIdToken},
        })
        .then(res=>res.data)
        .catch(err=>Network.errHandler(err))
    },
    //will Deprecate
    login:(account)=>{
        return Network.PublicAxios({
            method:'post',
            url:`${TYPE}/login`,
            data:{account},
        })
        .then(res=>res.data)
        .catch(err=>Network.errHandler(err))
    },  
    register:(user,googleIdToken)=>{
        console.log('object')
        console.log({...user,googleIdToken})
        return Network.PublicAxios({
            method:'post',
            url:`${TYPE}/register`,
            data:{...user,googleIdToken}
        })
        .then(res=>res.data)
        .catch(err=>Network.errHandler(err))
    },  
    checkExist:(account)=>{
        return Network.PublicAxios({
            method:'post',
            url:`${TYPE}/checkExist`,
            data:{account}
        })
        .then(res=>res.data) 
        .catch(err=>Network.errHandler(err))
        // {
        //     "success": true,
        //     "txt": "REAPET ACCOUNT" || "NULL"
        //   }
    },
    //private
    getAllusernames:()=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/getAllUsername`,
        })
        .then(res=>res.data.map(value=>new User(value))) 
        .catch(err=>Network.errHandler(err))
    },  
    searchUser:(search)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/searchUser`,
            data:{search}
        })
        .then(res=>res.data.map(value=>new User(value))) 
        .catch(err=>Network.errHandler(err))
    }, 
    updateUser:(user)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/update`,
            data:{...user}
        })
        .then(res=>res.data)
        .catch(err=>Network.errHandler(err))
    },  
    getMyPosts:(isNeed)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/getPosts`,
            data:{isNeed} // 'false' || 'true'
        })
        .then(res=>res.data.map(value=>new Post(value)))
        .catch(err=>Network.errHandler(err))
    },
    getUser:()=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/getUser`,
        })
        .then(res=>new User(res.data))
        .catch(err=>Network.errHandler(err))
    },
    getOtherUser:(id)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/getOtherUser`,
            data:{id}
        })
        .then(res=>new User(res.data))
        .catch(err=>Network.errHandler(err))
    },
    getUserPosts:(id,isNeed)=>{
        return Network.PrivateAxios({
            method:'post',
            url:`${TYPE}/getUserPosts`,
            data:{id,isNeed}
        })
        .then(res=>res.data.map(value=>new Post(value)))
        .catch(err=>Network.errHandler(err))
    }
    
}