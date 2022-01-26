
export default class Type{
    id;
    typeName;
    constructor(options = {}){
        const {id,typeName} = options;
        this.id = id;
        this.typeName = typeName;
    }
}
