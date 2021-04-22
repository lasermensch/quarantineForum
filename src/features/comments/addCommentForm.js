import React, {useState} from 'react';

import { useDispatch} from 'react-redux';

import {postComment} from './commentsSlice';


export const AddCommentForm = ({match}) =>
{
    const {id} = match.params;
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    
    const onCreateCommentClicked = () =>
    {
        
        dispatch(postComment({"title": title, "content": content, "id": id})) && setTitle('') && setContent('');
        
    }
    
    const canSave = Boolean(title) && Boolean(content);
    

    return(
        <section className="adding-section">
            <h2>Lägg till en kommentar i tråden!</h2>
            <form>
                <label htmlFor="CommentTitle">Kommentarens titel: </label>
                <input type="text" id="CommentTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="commentContent">Innehåll: </label>
                <textarea id="commentContent" value={content} onChange={onContentChanged}></textarea>
                <button type="button" onClick={onCreateCommentClicked} disabled={!canSave}>Skapa kommentar!</button>
            </form>
        </section>
    )
}