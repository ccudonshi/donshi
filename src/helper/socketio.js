/* eslint-disable no-prototype-builtins */
import io from 'socket.io-client';
import Config from '../../Config'
import Comment from '../model/Comment';
import Post from '../model/Post';
import Reply from '../model/Reply';
const { APIKEY, BASEURL,HOST } = Config

export default class MySocketFactory{
    static #socket;

    static create(){
        
        try {
            this.#socket = io(HOST,{
                path: '/api/socket.io/',
                autoConnect:false,
                transportOptions: {
                  polling: {
                    extraHeaders: {
                      'api-key': APIKEY
                    }
                  }
                }
            });
        } catch (error) {
            console.warn(error)
        }
    }
    static getSocket(){
        if(this.#socket == null || this.#socket == 'undefined'){
            this.create();
        }
        if(!this.#socket?.connected){
            this.#socket.open()
        }
            
        return this.#socket;
    }
    static clearSocket(){
        if( !(this.#socket == null || this.#socket == 'undefined')){
            console.log('close socket')
            this.#socket.close()
        }
    }
    static preprocessData(data){
        if(data.hasOwnProperty('comment'))
            data.comment = new Comment(data.comment);
        if(data.hasOwnProperty('post'))
            data.post = new Post(data.post);
        if(data.hasOwnProperty('reply'))
            data.reply = new Reply(data.reply);
        data.effected = (data.hasOwnProperty('reply'))? 'reply': 'comment';
        return data
    }
    
}