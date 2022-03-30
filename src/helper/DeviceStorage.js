import * as SecureStorage from 'expo-secure-store';

export default class DeviceStorage {
    /**
    * 获取
    * @param key
    * @returns {Promise<T>|*|Promise.<TResult>}
    */
    static async get(key) {
        const value = await SecureStorage.getItemAsync(key);
        return (value !== 'null') ? JSON.parse(value) : null;
    }
    /**
    * 保存
    * @param key
    * @param value
    * @returns {*}
    */
    static async save(key, value) {
        return await SecureStorage.setItemAsync(key, JSON.stringify(value));
    }
    /**
    * 更新
    * @param key
    * @param value
    * @returns {Promise<T>|Promise.<TResult>}
    */
    static async update(key, value) {
        const _value = await DeviceStorage.get(key);
        value = typeof value === 'string' ? value : Object.assign({}, _value, value);
        return await DeviceStorage.save(key, value);
    }
   
    /**
    * 更新
    * @param key
    * @returns {*}
    */
    static async delete(key) {
        return await SecureStorage.deleteItemAsync(key);
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