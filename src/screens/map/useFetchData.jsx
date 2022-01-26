/* eslint-disable no-unused-vars */

import  React,{ useCallback,useEffect, useState } from 'react'

import AppDBHelper from '../../helper/AppDBHelper'
import { cancelable } from 'cancelable-promise';
import { useFocusEffect } from '@react-navigation/native';

// 地圖頁面所需取得資料邏輯

export default function useFetchData() {
    const [hasError, setHasError] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [datas, setDatas] = useState([]);
    const [types, setTypes] = useState([])


    useEffect(() => {
        console.log('useFetchTypes')
        async function fetchTypes() {
            const manager = await AppDBHelper();
            const types = await manager.getTypes();
            return types
        }
        
        const fetchTypesPromise = cancelable(
            fetchTypes()
                .then(types => setTypes(types))
                .catch(() => setHasError(true))
        )

        return () => {
            if (!fetchTypesPromise.isCanceled())
                fetchTypesPromise.cancel()
        }
    }, [])

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log('useFetchTypes')
    //         const fetchTypesPromise = cancelable(
    //             fetchTypes()
    //                 .then(types => setTypes(types))
    //                 .catch(() => setHasError(true))
    //         )
    
    //       return () => {
    //         if (!fetchTypesPromise.isCanceled())
    //             fetchTypesPromise.cancel()
    //       };
    //     }, [])
    //   );
    

    // useEffect(() => {
    //     console.log('useFetchPosts')
    //     let fetchPostsPromise = null;
    //     if (types.length !== 0) {
    //         console.log('fetchPosts')
    //         fetchPostsPromise = cancelable(
    //             fetchPosts(types)
    //                 .then(datas => setDatas(datas))
    //                 .catch(() => setHasError(true))
    //         )
    //     }
    //     return () => {
    //         if (fetchPostsPromise !== null && !fetchPostsPromise.isCanceled())
    //             fetchPostsPromise.cancel()
    //     }
    // }, [types])

    useFocusEffect(
        useCallback(() => {
            console.log('useFetchPosts')
            /**
            * @return { Object(
                * [info/isNeed][1..7]:{
                    * typeId: int,
                    * isDisplay: Boolean,
                    * isNeed: Boolean,
                    * posts: Array[Post] }
                    * )}
                */
            async function fetchPosts(types) {
                console.log('feching data...')
                const manager = await AppDBHelper();
        
                const getPostsPromise = (type, isNeed) =>
                    manager.getPosts(type.id, isNeed)
                            .then(posts =>
                                posts.filter(post =>
                                    (post.getLongitude() != undefined && post.getLatitude() != undefined)))
                            .then(posts => ({ typeId: type.id, isDisplay: true, isNeed, posts }));
        
                const getATypeOfPosts = (type) =>
                    Promise.all([false, true].map(isNeed => getPostsPromise(type, isNeed)));
        
                const getAllTypeOfPosts = () => Promise.all(types.map(type => getATypeOfPosts(type)))
        
                return (
                    getAllTypeOfPosts()
                        .then(values => values.flat())
                        .then(values => {
                            let datas = {}
                            values.forEach(value => {
                                const { isNeed, typeId } = value;
                                let keyName = ((isNeed) ? "need" : "info") + typeId;
                                datas[keyName] = value
        
                            });
                            console.log('feching finish!')
                            return datas;
                        })
                    )
            }

            let fetchPostsPromise = null;
            if (types.length !== 0) {
                console.log('fetchPosts')
                fetchPostsPromise = cancelable(
                    fetchPosts(types)
                        .then(datas => setDatas(datas))
                        .catch(() => setHasError(true))
                )
            }
            return () => {
                if (fetchPostsPromise !== null && !fetchPostsPromise.isCanceled())
                    fetchPostsPromise.cancel()
            }
        }, [types])
    );

    useEffect(() => { if (datas.length !== 0) setIsFinished(true); }, [datas])
    // useFocusEffect(
    //     useCallback(() => {
    //         if (datas.length !== 0) setIsFinished(true);
    //     }, [datas])
    // );
    return [hasError, isFinished, datas, setDatas, types]

}

