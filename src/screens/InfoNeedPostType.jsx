import InfoScreen from './InfoScreen';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import AppHelper from '../helper/AppDBHelper';
import { useRefreshNthPost } from '../component/useRefreshNthPost';
import { useSocketIOInNavigation } from '../component/useSocketIO';
import { cancelable } from 'cancelable-promise';

export default ({ isNeed }) => {
    const PATCH_NUMBER = 10;

    const [typeId, setTypeId] = useState(1);
    const [postList, setPostList] = useState([]);
    const [topicList, setTopicList] = useState([]);
    const [topicMap, setTopicMap] = useState({});
    const [offset,setOffset] = useState(0);
    const [canGetMoreData, setCanGetMoreData] = useState(0); //1才是可以拿 其他數字都不行 , -1是已經到底不用再拿了

    const [checkIsRefreshPost,goRefreshNthPost]= useRefreshNthPost(postList, setPostList); // 原本沒有sokcet 會需要這個來變化，有socket之後可以不用了

    const onChange = ( { post } ) => {
        setPostList(prePostList => prePostList.map(postValue => (post.getId() === postValue.getId()) ? post : postValue));
    };
    const [hasError,hasConnect] = useSocketIOInNavigation(onChange);

    const needMoreData = ()=>{ if(canGetMoreData === 0 || canGetMoreData === 1) setCanGetMoreData(pre=>pre+1) };
    const isGettingMoreData = (canGetMoreData === 1);
    const alreadyGetAllData = (canGetMoreData === -1);
    
    const getLimitPost = useCallback(async (offset) => {
        const manager = await AppHelper();
        const posts = await manager.getLimitPosts(typeId, isNeed, offset, PATCH_NUMBER);
        return posts;
    },[typeId]);
  
    const switchTopicDisplay = (targetTopic) => (
        setTopicList(preTopicList =>
            preTopicList.map(({topic,isDisplay}) => 
                (targetTopic.id === topic.id)
                ? {topic,isDisplay:!isDisplay}
                : {topic,isDisplay}
            )
        )
    )

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
    }, [offset]);

    useEffect(() => {
        if(checkIsRefreshPost)return;
        setCanGetMoreData(0); 
    }, [postList]);

    // 初始化
    useEffect(() => {
        let mounted = true;

        const getTopicWithType = async () => {
            const manager = await AppHelper();
            const topics = await manager.getTopicsWithType(typeId)
            return topics;
        }
        const fetchData = async () => {
            const posts = await getLimitPost(0)
            const topics = await getTopicWithType()
            const newTopicList = topics.map(topic=>({topic,isDisplay:true}))
            if(mounted){
                setTopicList(newTopicList);
                setPostList(posts);
                setOffset(0);
            }  
        }
        const fetchDataPromise = cancelable(fetchData());

        return () => {
            mounted = false;
            if (!fetchDataPromise.isCanceled()) fetchDataPromise.cancel();
        };
    }, [typeId])

    
    return (
        <InfoScreen
            goRefreshNthPost={goRefreshNthPost}
            alreadyGetAllData={alreadyGetAllData}
            isGettingMoreData={isGettingMoreData} 
            isNeed={isNeed}
            needMoreData={needMoreData}
            topicList={topicList}
            switchTopicDisplay={switchTopicDisplay}
            topicMap={topicMap}
            postList={postList}
            typeId={typeId}
            setTypeId={setTypeId}
        />
    );
};


