import axios from 'axios'
import Config from '../../Config'
import MyToken from '../model/MyToken'
const { APIKEY, BASEURL } = Config

/* 
axios
*/

export default class Network {
  static FileAxios;
  static PublicAxios;
  static PrivateAxios;
  static network
  
  static async init() {
  const token = await MyToken.getToken();
    if(this.FileAxios == null || this.PrivateAxios == null || this.PublicAxios == null) {
      this.createAxios(token);
    }
    this.errHandler = this.errHandler.bind(this);
  }

  static createAxios(token) {
    // 應後端要求，目前所有的request都先帶上token，詳情再與後端確認
    // 之後應該會將public及private的區隔拿掉
    this.FileAxios = axios.create({
      baseURL: `${BASEURL}/`,
      headers: {
        'api-key': APIKEY,
        'authorization': token,
      },
    });
    this.PublicAxios = axios.create({
      baseURL: `${BASEURL}/public/`,
      headers: {
        'api-key': APIKEY,
        'authorization': token,
      },
    });
    this.PrivateAxios = axios.create({
      baseURL: `${BASEURL}/private/`,
      headers: {
        'api-key': APIKEY,
        'authorization': token,
      },
    });
  }

  static renewPrivateAxios(newToken) {
    this.PrivateAxios = axios.create({
      baseURL: `${BASEURL}/private/`,
      headers: {
        'api-key': APIKEY,
        'authorization': newToken,
      },
    });
  }
 
  static errHandler(error) {
    console.warn('get Error!!!!!!!!')
    console.warn('error type: ', typeof error)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log('response data: ', error.response.data);
      console.log('response status: ', error.response.status);
      switch (error.response.status) {
        case 401:
          console.warn('Not Logged In!')
          break;
        case 404:
          console.warn('Not Found!')
        default:
          break;
      }
      console.log('response headers: ', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('request: ', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.warn('Network Error', error.message);
    }
    console.log('config: ', error.config);

    return Promise.reject(error)
  }
}
