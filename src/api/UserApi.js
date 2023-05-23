import Network from '../helper/network.js'
import User from '../model/User.js';
const TYPE = 'user';
export default {
    //public
    googleLogin: (googleIdToken) => {
        return Network.PublicAxios.post(`${TYPE}/googleLogin`, { googleIdToken })
        .then(res => res.data)
        .catch(err => Network.errHandler(err))
    },
    register: (user,googleIdToken) => {
        console.log('object')
        console.log({...user,googleIdToken})
        return Network.PublicAxios.post(`${TYPE}/register`, { ...user, googleIdToken })
        .then(res => res.data)
        .catch(err => Network.errHandler(err))
    },  
    checkExist: (account) => {
        return Network.PublicAxios.post(`${TYPE}/checkExist`, { account })
        .then(res => res.data) 
        .catch(err => Network.errHandler(err))
    },
    //private
    getAllusernames: () => {
        return Network.PrivateAxios.get(`${TYPE}/getAllUsername`)
        .then(res => res.data.map(value => new User(value))) 
        .catch(err => Network.errHandler(err))
    },  
    searchUser: (search) => {
        console.warn('search', search)
        return Network.PrivateAxios.get(`${TYPE}/searchUser`, { params: { search } })
        .then(res => res.data.map(value => new User(value))) 
        .catch(err => Network.errHandler(err))
    }, 
    updateUser: (user) => {
        return Network.PrivateAxios.post(`${TYPE}/update`, user)
        .then(res => res.data)
        .catch(err => Network.errHandler(err))
    },  
    getUser: () => {
        return Network.PrivateAxios.get(`${TYPE}/getUser`)
        .then(res => new User(res.data))
        .catch(err => Network.errHandler(err))
    },
    getOtherUser: (id) => {
        return Network.PrivateAxios.get(`${TYPE}/getOtherUser`, { params: { id } })
        .then(res => new User(res.data))
        .catch(err => Network.errHandler(err))
    },    
}