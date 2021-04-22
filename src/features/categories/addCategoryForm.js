import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postCategory, selectAllCategories} from './categoriesSlice';


export const AddCategoryForm = () =>
{
    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const onNameChanged = (e) => setName(e.target.value);
    
    const onCreateCategoryClicked = () =>
    {
        categories.some(cat => name.localeCompare(cat.name) === 0) ? //Vore värdelöst om vi lägger till en kategori med ett namn som redan finns.
         alert("Namn upptaget!") : dispatch(postCategory(name)) && setName(''); //Refresh funkar bara inte...
    }
    const categories = useSelector(selectAllCategories);
    const canSave = Boolean(name); 
    

    return(
        <section className="adding-section">
            <h2>Lägg till en kategori!</h2>
            <form>
                <label htmlFor="categoryName">Kategorins namn: </label>
                <input type="text" id="categoryName" value={name} onChange={onNameChanged} />
                <button type="button" onClick={onCreateCategoryClicked} disabled={!canSave}>Skapa kategori!</button>
            </form>
        </section>
    )
}