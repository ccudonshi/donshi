import {AsyncStorage}from 'react-native';

export default class DeviceStorage {
    /**
    * 获取
    * @param key
    * @returns {Promise<T>|*|Promise.<TResult>}
    */
    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = (value !== 'null') ? JSON.parse(value):null;
            return jsonValue;
        });
    }
    /**
    * 保存
    * @param key
    * @param value
    * @returns {*}
    */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }
    /**
    * 更新
    * @param key
    * @param value
    * @returns {Promise<T>|Promise.<TResult>}
    */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
    });
    }
   
    /**
    * 更新
    * @param key
    * @returns {*}
    */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
   }
   
   
//    //使用的时候可以
//    Import Storage from from ‘DeviceStorage’
//    //appHotSearchTagList就是当时保存的时候所保存的key，而tags就是保存的值
//    DeviceStorage.get('appHotSearchTagList').then((tags) => {
//     this.setState({
//         tags: tags
//     })
//     });