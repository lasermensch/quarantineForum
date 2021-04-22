import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import {selectAllThreads, fetchThreads} from './threadsSlice';
import {AddThreadForm} from './addThreadForm';

export const ThreadsList = ( {id} ) =>
{
    
    const threads = useSelector(selectAllThreads); 
    const dispatch = useDispatch();
    
    
    const threadStatus = useSelector(state => state.threads.status);
    const error = useSelector(state => state.threads.error);
    const catId = useSelector(state => state.threads.catId);
    
    
    useEffect(() => {
        if(id !== catId)
        {
            dispatch(fetchThreads(id));
        }
    }, [threadStatus, dispatch]);

    let content;
    switch (threadStatus)
    {
        case 'loading':
            content = <div className="loader">laddar...</div>
            break;
        case 'succeeded':
            content = <ul>
                <li><AddThreadForm catId={catId} /></li>
                {threads.map(t => 
                (
                    <li><Link to={`/threads/${t._id}`}>{t.title}</Link></li>
                ))}
                </ul>;
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