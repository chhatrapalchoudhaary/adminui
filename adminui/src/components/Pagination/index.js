import React from 'react';
import './index.css'

const Pagination = ({ usersPerPage, totalUsers, paginate,currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  const lastPage = Math.ceil(totalUsers / usersPerPage)

  const goToNextPage = () => {
      if(currentPage===lastPage){
        paginate(5)
      }
      else{
          paginate(currentPage+1)
      }
  }

  const goToPreviousPage = () => {
    if(currentPage===1){
      paginate(1)
    }
    else{
        paginate(currentPage-1)
    }
}

  return (
    <nav>
      <ul className='pagination'>
          <li className="page-item gray" onClick={()=>paginate(1)}> 
              <span>{'<<'}</span>
          </li>
          <li className="page-item gray" onClick={goToPreviousPage}>
              <span>{'<'}</span>
          </li>
        {pageNumbers.map(number => {
            const activeclass = number===currentPage?"active":""
            return(
                <li key={number} onClick={() => paginate(number)} href='' className={`page-item ${activeclass} `}>
              {number}
          </li>        
            )
        }
        )}
        <li className="page-item gray" onClick={goToNextPage}>
              <span>{'>'}</span>
          </li>
          <li className="page-item gray" onClick={()=>paginate(lastPage)}>
              <span>{'>>'}</span>
          </li>
      </ul>
    </nav>
  );
};

export default Pagination;