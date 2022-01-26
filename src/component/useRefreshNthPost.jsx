import { useState, useEffect } from 'react';
import AppHelper from '../helper/AppDBHelper';

export function useRefreshNthPost(postList, setPostList) {
    const [refreshPostIdx, setRefreshPostIdx] = useState(-1); // refresh the nth post in the posList 
    const goRefreshNthPost = (idx) => () => setRefreshPostIdx(idx);
    const checkIsRefreshPost = (refreshPostIdx !== -1);

    useEffect(() => {
        if (refreshPostIdx !== -1) {
            const updatePost = async () => {
                const postId = postList[refreshPostIdx].getId();
                const manager = await AppHelper();
                const post = await manager.getPostById(postId);
                setPostList(prePostList => {
                    const newPostList = prePostList.slice();
                    newPostList[refreshPostIdx] = post;
                    return newPostList;
                });
            };
            updatePost();
        }
        return () => { };
    }, [refreshPostIdx]);
    useEffect(() => {
        if (checkIsRefreshPost)setRefreshPostIdx(-1);
    }, [postList]);
    return [checkIsRefreshPost, goRefreshNthPost];
}
