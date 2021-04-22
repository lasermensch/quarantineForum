import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postThread, selectAllThreads} from './threadsSlice';


export const AddThreadForm = ({catId}) =>
{
    console.log("input: ", catId)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    
    const onCreateThreadClicked = () =>
    {
        
        threads.some(t => title.localeCompare(t.title) === 0) ? 
         alert("Titel upptagen!") : dispatch(postThread({"title":title, "content": content, "catId": catId})) && setTitle('') && setContent(' '); //Refresh funkar bara inte...
    }
    const threads = useSelector(selectAllThreads);
    const canSave = Boolean(title) && Boolean(content);
    

    return(
        <section className="adding-section">
            <h2>Lägg till en Tråd!</h2>
            <form>
                <label htmlFor="threadTitle">Trådens titel: </label>
                <input type="text" id="threadTitle" value={title} onChange={onTitleChanged} />
                <label htmlFor="threadContent">Innehåll: </label>
                <textarea id="threadContent" value={content} onChange={onContentChanged}></textarea>
                <button type="button" onClick={onCreateThreadClicked} disabled={!canSave}>Skapa tråd!</button>
            </form>
        </section>
    )
}