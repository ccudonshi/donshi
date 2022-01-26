import User from './User'
export default class Reply{
    id;
    text;
    user;
    updatedAt;

    constructor(options = {}){
        Object.assign(this, options);

        // const {id,text,updatedAt,user}=options
        // this.id = id;
        // this.text = text;
        // this.updatedAt = updatedAt;
        // this.user = new User(user);
        this.user =new User(this.user);

    }
    getId(){return this.id}
    getText() { return this.text; }
    getUser() { return this.user; }
    getPostTimeString() { return this.updatedAt; }
    getPostTimeDate(){
        return new Date(this.updatedAt.replace(/\s/g,"T"))
    }
}