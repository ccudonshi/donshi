export default class Topic{
    id;
    topicName;
    constructor(options = {}){
        const {id,topicName} = options;
        this.id = id;
        this.topicName = topicName;
    }
}