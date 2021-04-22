import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';


import {selectAllComments, fetchComments, postLikeToComment} from './commentsSlice';

export const CommentsList = ( {id} ) =>
{
    
    const comments = useSelector(selectAllComments); 
    const dispatch = useDispatch();
    
    
    const commentStatus = useSelector(state => state.comments.status);
    const error = useSelector(state => state.comments.error);
    const threadId = useSelector(state => state.comments.threadId);
    
    
    
    useEffect(() => {
        if(id !== threadId)
        {
            dispatch(fetchComments(id));
        }
    }, [commentStatus, dispatch]);


    let content;
    switch (commentStatus)
    {
        case 'loading':
            content = <div className="loader">laddar...</div>
            break;
        case 'succeeded':
            content = (
                <section id="comments-section">
                    {comments.map(c =>
                        <article id={c._id}>
                            <h3>{c.title}</h3>
                            <p>{c.content}</p>
                            <button onClick={() => dispatch(postLikeToComment(c._id))} class="button">Gilla</button>
                            <div>antal gilla: {c.likes.length}</div>
                        </article>)}
                </section>
            )
            break;
        case 'failed':
            content = <div>{error}</div>
            break;
        default:
            break;

    }

    return (
        <div>{content}</div>
    )
    
};