import React from 'react';
import {Link} from 'react-router-dom';

import './NotFound.css'


const NotFound = ()=>{
    return(
        <div className="NotFound">
            <h1 className="NotFound-ttitle">Page not Found</h1>
            <Link className="NotFound-link" to="/">go to home page</Link>
        </div>
    )
}

export default NotFound
