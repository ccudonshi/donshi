import Config from '../../Config'
const { BASEURL } = Config
export default class User {
    id;
    account;
    // password;
    username;
    gender; // '男', '女', "其他"
    birthday;
    introduction;
    phone;
    role; // 0: 管理者 , 1: 一般使用者 前端有這個資訊好像沒有用
    pictureUrl;
    hasUserTicket;
    constructor(options = {}) {
        Object.assign(this, options);

    }
    // public User(String account,String username) {
    //     this.account = account;
    //     this.username = username;
    // }
    getId() {
        return (this.id == undefined || this.id == null) ? '' : this.id
    }
    getAccount() {
        return (this.account == undefined || this.account == null) ? '無' : this.account
    }
    // setAccount(){

    // }

    getUserName() {
        return (this.username == undefined || this.username == null) ? '無' : this.username
    }
    // setUserName(value){
    //     if(value != null || value != undefined)this.username = value
    // }

    getGender() {
        return (this.gender == undefined || this.gender == null) ? '無' : this.gender
    }
    // setGender(value){
    //     if(value == '男' || value == '女' || value == '其他') this.gender = value
    // }    

    getBirthDay() {
        return (this.birthday == undefined || this.birthday == null || this.birthday == "0000-00-00")
            ? '無'
            : this.birthday
    }
    // setBirthDay(value){
    //     if(this.birthday !== undefined || this.birthday !== null || this.birthday !== "0000-00-00") 
    //         this.birthday = value
    // }

    getIntroduction() {
        return (this.introduction == undefined || this.introduction == null) ? '' : this.introduction
    }
    // setIntroduction(value){
    //     if(value != null || value != undefined)this.introduction = value
    // }


    getPhone() {
        return (this.phone == undefined || this.phone == null || this.phone == '') ? '無' : this.phone
    }
    // setIntroduction(value){
    //     if(value != null || value != undefined)this.introduction = value
    // }


    getPictureUrl() {
        if (this.pictureUrl !== '' && this.pictureUrl !== undefined && this.pictureUrl !== null)
            return BASEURL + this.pictureUrl
        else return null
    }

    getHasUserTicket() {
        return !!this.hasUserTicket;
    }
}