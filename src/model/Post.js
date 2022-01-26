import Topic from './Topic'
import Type from './Type'
import Comment from './Comment'
import MyFile from './MyFile'
import User from './User'
export default class Post {
        isNeed;
        id;
        type;
        topic;
        title;
        text;
        position;
        latitude;
        longitude;
        startDate;
        endDate;
        comments;
        files;
        updatedAt;
        user;
    
    constructor(options = {}) {
        Object.assign(this, options);
        if("type" in this && !(this.type instanceof Type))
                this.type=new Type(this.type);
        if("topic" in this &&!(this.topic instanceof Topic))
                this.topic=new Topic(this.topic);
        if("comments" in this)
                this.comments =(this.comments!=null)?this.comments.map(value=>new Comment(value)):null;
        if("files" in this)
                this.files=(this.files!=null)?this.files.map(value=>new MyFile(value)):null;
        if("user" in this)
                this.user = (this.user!=null)?new User(this.user):null;
     }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getType() { return this.type; }
    setType(type) { this.type = type; }
    getTypeName(){return this.type.typeName;}

    getTopic() { return this.topic; }
    setTopic(topic) { this.topic = topic; }
    getTopicName(){return  this.topic.topicName;}

    getTitle() { return this.title; }
    setTitle(title) { this.title = title; }

    getText() { return this.text; }
    setText(text) { this.text = text; }

    getPosition() { return this.position; }
    setPosition(position) { this.position = position; }

    getLatitude() { return this.latitude; }
    setLatitude(latitude) { this.latitude = latitude; }

    getLongitude() { return this.longitude; }
    setLongitude(longitude) { this.longitude = longitude; }

    getStartDate(){ return (this.startDate == null)
            ? "永久": this.startDate}
    setStartDate(startDate) { this.startDate = startDate; }

    getEndDate(){ return (this.endDate == null)
            ?"永久":this.endDate;}
    setEndDate(endDate) { this.endDate = endDate; }

    getPostTime(){return  this.updatedAt;}
    setPostTime(updatedAt) { this.updatedAt = updatedAt; }
    
    getAuthor() { return this.user; }
    setAuthor(user) { this.user = user; }
    getAuthorName(){ return (this.user == null) ? "使用者" : this.user.getUserName()}

    getComments() {return this.comments;}
    setComments(comments) { this.comments = comments; }

    getFiles() {return ("files" in this)?this.files:[]; }
    setFiles(files) { this.files = files; }

}
