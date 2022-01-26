import React, { useCallback } from 'react';
import AppDBHelper from '../helper/AppDBHelper';
import MentionInputContainer  from './MentionInputContainer';
import ReplyItem from './ReplyItem';
import ReplyComment from './ReplyComment2';

export default function ReplyContainer(props) {

    const renderCommentReplies = useCallback(
        () => <>
            <ReplyComment userId={props.userId} key={props.key} comment={props.comment} />
            {props.replies.map((reply, index) => (
                <ReplyItem userId={props.userId} key={index} reply={reply} />
            ))
            }
        </>,
        [props?.replies]
    );
    const addComment = useCallback(
        async (text) => {
            if (!("commentId" in props)) return;
            const manager = await AppDBHelper();
            await manager.addReply(props.commentId, text)
        },
        [props?.commentId]
    );
    const onRequestClose = () => props.setReplyContainerVisible(false)
    return <MentionInputContainer 
                {...props} 
                renderData={renderCommentReplies} 
                onSubmit={addComment} 
                onRequestClose={onRequestClose}/>;
}
