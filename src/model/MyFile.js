import Config from '../../Config'
const { BASEURL } = Config

export default class MyFile{
    id; //int
    url;//String
    fileName; //String
    constructor(options = {}) {
        Object.assign(this, options);
    }
    getUrl(){
        if("url" in this) return BASEURL+this.url;
        else return null
    }

}