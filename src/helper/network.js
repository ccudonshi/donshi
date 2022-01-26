import axios from 'axios'
import Config from '../../Config'
import MyToken from '../model/MyToken'
const { APIKEY, BASEURL } = Config

/* 
axios
*/

export default class Network{
  static FileAxios;
  static PublicAxios;
  static PrivateAxios;
  static network
  
  static async init(){
  const token = await MyToken.getToken();
    if(this.FileAxios==null||this.PrivateAxios==null||this.PublicAxios==null)
      this.createAxios(token);
    this.errHandler = this.errHandler.bind(this);
  }

  static createAxios(token){
    this.FileAxios = axios.create({baseURL: `${BASEURL}/`,})
    this.PublicAxios = axios.create({
      baseURL: `${BASEURL}/public/`,
      headers:{
          "api-key":APIKEY
      },
    })
    this.PrivateAxios = axios.create({
          baseURL: `${BASEURL}/private/`,
          headers:{
              "api-key":APIKEY,
              "authorization":token
          },
    });
  }

  static renewPrivateAxios(newToken){
    this.PrivateAxios = axios.create({
      baseURL: `${BASEURL}/private/`,
      headers:{
          "api-key":APIKEY,
          "authorization":newToken
      },
    });
  }
 
  static errHandler(error) {
    console.log("get Error!!!!!!!!")
    console.log(typeof error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      switch (error.response.status) {
        case 401:
            console.log('Not Login !')
          break;
      
        default:
          break;
      }
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    
    return Promise.reject(error)
  }
}
