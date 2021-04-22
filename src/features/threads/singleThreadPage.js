import React from 'react';
import {Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {postLikeToThread, selectThreadById} from './threadsSlice';
import {CommentsList} from '../comments/commentsList'

export const SingleThreadPage = ({ match }) =>
{
    const { id } = match.params;
    const dispatch = useDispatch();
    const thread = useSelector(state => selectThreadById(state, id));
    
    if (!thread)
    {
        return (
            <section>
                <h2>tråden kan inte hittas!</h2>
            </section>
        )
    }

    return (
        <section>
            <article id={thread._id}>
                <h2>{thread.title}</h2>
                <p>{thread.content}</p>
                <button onClick={() => dispatch(postLikeToThread(thread._id))} className="button">Gilla</button>
                <button><Link to={`/thread/${thread._id}/comment`}>Kommentera</Link></button>
                <div>antal gilla: {thread.likes.length}</div>
            </article>
            <CommentsList id={id} />
        </section>
    )
}