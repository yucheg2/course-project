import React from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, onPageChange, curentPage }) => {
    const pageCount = Math.ceil( itemsCount / pageSize )
    if (pageCount === 1) {
        return null
    }
    const pages =_.range(1,pageCount+1)
    return ( 
    <nav aria-label='Pagination'>
        <ul className='pagination'>
            {pages.map((num)=>{
                return (
                    <li className= {'page-item ' + (num === curentPage? ' active': '')} key = {num}>
                        <button onClick={()=>{onPageChange(num)}} className='page-link'>{num}</button>
                    </li>
                )
            })}
        </ul>
    </nav>);
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    curentPage: PropTypes.number.isRequired
}
 
export default Pagination;