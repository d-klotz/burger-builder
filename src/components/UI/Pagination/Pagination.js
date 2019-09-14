import React from 'react';
import classes from './Pagination.css';

const pagination = (props) => {
  const pageNumbers = [...Array(props.totalPages)].map((item, i) => (
    <span 
      key={i} 
      className={[classes.Pagination, props.activePage === i ? classes.Active : null].join(' ')} 
      onClick={() => props.clicked(i)}>{i + 1}
    </span>
  ));

  return (
      <div className={classes.CenterPagination}>
        {pageNumbers}
      </div>
  );
}

export default pagination;