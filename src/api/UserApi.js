import Network from '../helper/network.js'
import User from '../model/User.js';

const TYPE = 'user';

export default {
    //public
    googleLogin: (googleIdToken) => {
        return Network.PublicAxios.post(`${TYPE}/googleLogin`, { googleIdToken })
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `${TYPE}/googleLogin`));
    },
    register: (user,googleIdToken) => {
        console.log('object')
        console.log({...user,googleIdToken})
        return Network.PublicAxios.post(`${TYPE}/register`, { ...user, googleIdToken })
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `${TYPE}/register`));
    },
    //private
    getAllusernames: () => {
        return Network.PrivateAxios.get(`${TYPE}/getAllUsername`)
        .then(res => res.data.map(value => new User(value))) 
        .catch(err => Network.errHandler(err, `${TYPE}/getAllUsername`));
    },  
    searchUser: (search) => {
        console.warn('search', search)
        return Network.PrivateAxios.get(`${TYPE}/searchUser`, { params: { search } })
        .then(res => res.data.map(value => new User(value))) 
        .catch(err => Network.errHandler(err, `${TYPE}/searchUser`));
    }, 
    updateUser: (user) => {
        return Network.PrivateAxios.post(`${TYPE}/update`, user)
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `${TYPE}/update`));
    },  
    getUser: () => {
        return Network.PrivateAxios.get(`${TYPE}/getUser`)
        .then(res => new User(res.data))
        .catch(err => Network.errHandler(err, `${TYPE}/getUser`));
    },
    getOtherUser: (id) => {
        return Network.PrivateAxios.get(`${TYPE}/getOtherUser`, { params: { id } })
        .then(res => new User(res.data))
        .catch(err => Network.errHandler(err, `${TYPE}/getOtherUser`));
    },    
}