import User from './User'
import Reply from './Reply';
export default class Comment{
   id;
   text;
   user;
   updatedAt;
   replies;

    constructor(options={}){
        // const {id,text,updatedAt,user,replies} =options
        // this.text = text;
        // this.updatedAt = updatedAt;
        // this.user =new User(user);
        Object.assign(this,options)
        this.replies = this.replies.map(value => new Reply(value));
        this.user =new User(this.user);

    }
    getId(){return this.id}

    getText() { return this.text; }
    setText(text) { this.text = text; }

    getUser() { return this.user; }
    getUserName() { return this.user.username; }
    setUser(user) { this.user = user; }

    getPostTimeString() { return this.updatedAt; }
    getPostTimeDate(){
        return new Date(this.updatedAt.replace(/\s/g,"T").concat('.000+08:00'))
    }

    
}