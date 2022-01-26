
import Storage from '../helper/DeviceStorage'
import jwtDecode from 'jwt-decode'
import User from './User';
export default class MyToken {
    static tokenType="Bearer";
    static token;
    static STORAGE_TYPE = 'token';
    static async deleteToken(){
        await Storage.delete(this.STORAGE_TYPE)
    }
    static async hasToken(){
        const tk = await this.getTokenBody();
        return (tk == null || tk=="" || tk == undefined)?false:true
    }
    static async getToken(){
        if((this.token==null)||(this.token==""))
            await this.getTokenFromStorage();
        return `${this.tokenType} ${this.token}`
    }
    static async getTokenBody(){
        if((this.token==null)||(this.token==""))
            await this.getTokenFromStorage();
        return this.token;
    }
    static setToken(newToken){ this.token=newToken;}
    static saveToken(newToken){
        this.setToken(newToken);
        return Storage.save(this.STORAGE_TYPE,newToken)
    }
    static async getDecoded(){
        if((this.token==null)||(this.token==""))
            await this.getTokenFromStorage();
        let decoded = jwtDecode(this.token);
        decoded.payload = new User(decoded.payload);
        return decoded;
    }
    static async getTokenFromStorage(){
        console.log('get token...')
        this.token = await Storage.get(this.STORAGE_TYPE)
        console.log('get token finished')
    }
}