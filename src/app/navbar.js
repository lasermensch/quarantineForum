import React from 'react';
import { Link } from 'react-router-dom';


export const Navbar = () =>
{
    return (
        <nav>
            <section>
            <h1>Karantän!</h1>
            <h3>-Platsen där man kan dela med sig av sina karantänhobbys.</h3>
            <div className="navContent">
                <div className="navLinks">
                    <Link to="/">Hem</Link>
                </div>
            </div>
            </section>
        </nav>
    )
}