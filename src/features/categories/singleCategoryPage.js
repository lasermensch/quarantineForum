import React from 'react';
import { useSelector } from 'react-redux';


import { selectCategoryById } from './categoriesSlice';
import {ThreadsList} from '../threads/threadsList';

export const SingleCategoryPage = ({match}) =>
{
    const { id } = match.params;
    
    const category = useSelector(state => selectCategoryById(state, id));
    
    if (!category)
    {
        return (
            <section>
                <h2>Kategorin kan inte hittas!</h2>
            </section>
        )
    }

    return (
        <section>
            <h2>{category.name}</h2>
            <ThreadsList id={id} />
        </section>
    )
}