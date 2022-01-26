import Network from '../helper/network.js'
import Type from '../model/Type'
const TYPE = 'type'
export default {
    //public
    getTypes:()=>{ 
        return  Network.PublicAxios({
            method: 'post',
            url: `${TYPE}/getAll`,
        })
        .then(res=>res.data.map(value=>new Type(value)))
        .catch(err => Network.errHandler(err))
    }, 
};
