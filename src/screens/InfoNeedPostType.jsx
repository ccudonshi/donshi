import InfoScreen from './InfoScreen'
import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react'
// import fakeDatas from './test/fakeDatas'
import AppHelper from '../helper/AppDBHelper'
import { set } from 'date-fns';
import { useRefreshNthPost } from '../component/useRefreshNthPost';
import {useSocketIOInNavigation} from '../component/useSocketIO';
import { cancelable } from 'cancelable-promise';

export default function InfoNeedPostType({ route, isNeed }) {
    const REFRESH = route.params;
    const PATCH_NUMBER = 10;

    const [refresh, setRefresh] = useState(REFRESH)
    const [typeId, setTypeId] = useState(1);
    const [topicTypeId, setTopicTypeId] = useState(1);
    const [postList, setPostList] = useState([]);
    const [queryData, setQueryData] = useState([])
    const [firstMtx, setFirstMtx] = useState(true) // 專門檔useEffect第一次不要執行
    const [displayMtx, setDisplayMtx] = useState(false)
    const [isQuery, setIsQuery] = useState(false)
    const [topicList, setTopicList] = useState([]);
    const [offset,setOffset] = useState(0);
    const [canGetMoreData, setCanGetMoreData] = useState(0); //1才是可以拿 其他數字都不行 , -1是已經到底不用再拿了

    const [checkIsRefreshPost,goRefreshNthPost]= useRefreshNthPost(postList, setPostList); // 原本沒有sokcet 會需要這個來變化，有socket之後可以不用了
    
    const isQueryRef = useRef(null);
    isQueryRef.current = isQuery
    const onChange = ( { post } ) =>
        (isQueryRef.current)
            ? setQueryData(preDisplayData => 
                preDisplayData.map(postValue => 
                    (post.getId() === postValue.getId())
                        ? post
                        : postValue
            ))
            : setPostList(prePostList => 
                prePostList.map(postValue => 
                    (post.getId() === postValue.getId())
                    ? post
                    : postValue
            ))
    const [hasError,hasConnect] = useSocketIOInNavigation(onChange)
  
    // const showDisplayData = useCallback(() =>{
    //     if(isQuery)return queryData
    //     return (displayMtx)?postList.slice(0,5):postList
    // },[isQuery,queryData,postList,displayMtx])
    // ()=>(isQuery)?queryData:postList
  
   

    const needMoreData = ()=>{ if(canGetMoreData === 0 || canGetMoreData === 1) setCanGetMoreData(pre=>pre+1) };
    const isGettingMoreData = (canGetMoreData === 1);
    const alreadyGetAllData = (canGetMoreData === -1);
    
    const getLimitPost = useCallback(
        async (offset) => {
            const manager = await AppHelper();
            const posts = await manager.getLimitPosts(typeId, isNeed, offset, PATCH_NUMBER);
            return posts
        },
        [typeId],
    )
  
    const switchTopicDisplay = (targetTopic) => (
        setTopicList(preTopicList =>
            preTopicList.map(({topic,isDisplay}) => 
                (targetTopic.id === topic.id)
                ? {topic,isDisplay:!isDisplay}
                : {topic,isDisplay}
            )
        )
    )

    const showQueryData = (queryData)=>setQueryData(queryData)
    
    const endQuery = ()=>{if(isQuery)setIsQuery(false)}
    const startQuery = ()=>{if(!isQuery)setIsQuery(true)}

   

    // 從Query中回來，先取前五個再取全部
    useEffect(() => {
        if(firstMtx) return;
        if(isQuery) setQueryData([])
        // setDisplayMtx(true)
    }, [isQuery]) 
    // useEffect(() => {
    //     if(!displayMtx)return;
    //     const timeout = setTimeout((() => setDisplayMtx(false)), 500) 
    //     return ()=>(timeout !== null)?clearTimeout(timeout):null 
    // }, [displayMtx])

    const [topicMap, setTopicMap] = useState({})
    useEffect(() => {
        const mapping = {}
        topicList.forEach((value,index)=>{
            mapping[value?.topic?.id] = index
        })
        setTopicMap(mapping)
    }, [topicList,typeId])


    // 往下滑取得更多資料
    useEffect(() => { 
        if(!isGettingMoreData) return;
        setOffset(preOffset=>preOffset+PATCH_NUMBER)
    }, [canGetMoreData])


    useEffect(() => {
        if(offset===0)return;
        getLimitPost(offset)
            .then(posts=>{
                if(posts.length === 0) setCanGetMoreData(-1);
                else{
                    const newPostList = postList.concat(posts);
                    setPostList(newPostList);
                }
            });
    }, [offset])
    useEffect(() => { 
        console.log('postListChange')
        if(checkIsRefreshPost)return;
        setCanGetMoreData(0); 
    }, [postList])

    // 初始化
    useEffect(() => {
        console.log('init')
        let mounted = true;
        const getTopicWithType = async () => {
            const manager = await AppHelper();
            const topics = await manager.getTopicsWithType(typeId)
            console.log('topics')
            console.log(topics)
            return topics;
        }
        const fetchData = async()=>{
            const posts = await getLimitPost(0)
            const topics = await getTopicWithType()
            const newTopicList = topics.map(topic=>({topic,isDisplay:true}))
            if(mounted){
                setTopicList(newTopicList);
                setPostList(posts);
                setOffset(0);
                setFirstMtx(false);
            }  
        }
        const fetchDataPromise = cancelable(fetchData())
        return () => {
            mounted = false;
            if (!fetchDataPromise.isCanceled())
                fetchDataPromise.cancel()
        }

    }, [typeId,refresh])

    
    return (
        <InfoScreen
            goRefreshNthPost={goRefreshNthPost}
            alreadyGetAllData={alreadyGetAllData}
            isGettingMoreData={isGettingMoreData} 
            isNeed={isNeed}
            needMoreData={needMoreData}
            topicList={topicList}
            switchTopicDisplay={switchTopicDisplay}
            // displayData={showDisplayData()}
            topicMap={topicMap}
            postList={postList}
            // queryData={queryData}
            startQuery={startQuery}
            endQuery={endQuery}
            isQuery={isQuery}
            showQueryData={showQueryData}
            typeId={typeId}
            setTypeId={setTypeId} />
    )
}


