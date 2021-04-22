import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import { selectAllCategories, fetchCategories } from './categoriesSlice';

export const CategoriesList = () =>
{
    
    const categories = useSelector(selectAllCategories); 
    const dispatch = useDispatch();
    
    
    const catStatus = useSelector(state => state.categories.status);
    const error = useSelector(state => state.categories.error);

    useEffect(() => {
        if(catStatus === 'idle')
        {
            dispatch(fetchCategories());
        }
    }, [catStatus, dispatch]);

    let content;
    
    switch (catStatus)
    {
        case 'loading':
            content = <div className="loader">laddar...</div>
            break;
        case 'succeeded':
            content = <ul>
                {categories.map(cat => 
                (
                    <li><Link to={`/categories/${cat._id}`}>{cat.name}</Link></li>
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
}