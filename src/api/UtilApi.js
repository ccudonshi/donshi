import Network from '../helper/network'

export default {
    //private
    checkVersion:(currentVersion)=>{
        return Network.PrivateAxios(
            {
                method:'post',
                url:`/checkAPKversion`,
                data:{currentVersion}
            }
        )
        .then(res=>res)
        .catch(err => Network.errHandler(err))
    },
    checkTokExp:()=>{
        return Network.PrivateAxios(
            {
                method:'post',
                url:`/checkTokExp`,
            }
        )
        .then(res=>res.data)
        .catch(err => Network.errHandler(err))
    },
    uploadImage:(data)=>{
        return Network.PrivateAxios(
            {
                headers: {'Content-Type': 'multipart/form-data' },
                method:'post',
                url:`/uploadImg`,
                data:data
            }
        )
        .then(res=>res.data)
        .catch(err => Network.errHandler(err))
    },
    // not use
    getImage:(url)=>{
        return Network.FileAxios(
            {
                method:'post',
                url:url,
            }
        )
        .then(res=>res.data)
        .catch(err => Network.errHandler(err))
    }


}