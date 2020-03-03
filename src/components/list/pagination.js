import React from 'react';
import PropTypes from 'prop-types';

import './pagination.css'

const Pagination = (props) => {
    const {handlePaginationClick, page, totalPages} = props;
    return(
        <div className='Pagination'>
            <button className='Pagination-button' onClick={() => {handlePaginationClick('prev')}} disabled={page <=1}>&larr;</button>
            <span className="Pagination-info">page <b>{page}</b> of <b>{totalPages}</b></span>
            <button className='Pagination-button' onClick={() => {handlePaginationClick('next')}} disabled={page>=totalPages}>&rarr;</button>
        </div>
    )
}

Pagination.propTypes = {
    handlePaginationClick: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
}

export default Pagination
