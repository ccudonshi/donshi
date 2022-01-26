import React, { useCallback } from 'react';
import CommentItem from './CommentItem';
import AppDBHelper from '../helper/AppDBHelper';
import MentionInputContainer  from './MentionInputContainer';

export default function CommentContainer(props) {

    const renderComments = useCallback(
        () => <>
            {props.post.comments.map((comment, index) => (
                <CommentItem userId={props.userId} key={index} comment={comment} />
            ))}
        </>,
        [props?.post?.comments]
    );
    const addComment = useCallback(
        async (text) => {
            if (!("post" in props)) return;
            const manager = await AppDBHelper();
            await manager.addComment(props.post.getId(), text);
        },
        [props?.post?.getId()]
    );
    const onRequestClose = () => props.setCommentContainerVisible(false)
    return <MentionInputContainer 
                {...props} 
                renderData={renderComments} 
                onSubmit={addComment} 
                onRequestClose={onRequestClose}/>;
}
