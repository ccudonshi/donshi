import Network from '../helper/network';

export default {
    //private
    checkVersion: (currentVersion) => {
        return Network.PrivateAxios.post(`/checkAPKversion`, { currentVersion })
        .then(res => res)
        .catch(err => Network.errHandler(err, `/checkAPKversion`));
    },
    checkTokExp: () => {
        return Network.PrivateAxios.post(`/checkTokExp`)
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `/checkTokExp`));
    },
    uploadImage: (data) => {
        return Network.PrivateAxios.post(`/uploadImg`, data, { 'Content-Type': 'multipart/form-data' })
        .then(res => res.data)
        .catch(err => Network.errHandler(err, `/uploadImg`));
    },
};