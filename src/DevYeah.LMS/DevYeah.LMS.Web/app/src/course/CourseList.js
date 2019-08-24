import React, { useState, useEffect } from 'react';
import * as api from '../common/api';
import useFetchData from '../common/useFetchData';
import usePagination from '../common/usePagination';
import DataLoading from '../common/DataLoading';
import DataNotFound from '../common/DataNotFound';
import FetchDataError from '../common/FetchDataError';
import CourseItem from './CourseItem';
import './course.css';

export default function CourseList({activeCat}) {
  const { state, setUrl } = useFetchData([], api.getFetchCoursesUrl(
    process.env.REACT_APP_PG_INITIAL_PAGE, 
    process.env.REACT_APP_PG_PAGESIZE,
    null
  ));
  const [pageSize, setPageSize] = useState(process.env.REACT_APP_PG_PAGESIZE);
  const { activePage, visiblePieces, goToPage } = usePagination({
    maxButtons: process.env.REACT_APP_PG_MAX_BUTTONS,
    initialPage: process.env.REACT_APP_PG_INITIAL_PAGE,
    numberOfPages: state.data.pageCount
  });

  useEffect(() => {
    goToPage(process.env.REACT_APP_PG_INITIAL_PAGE);
  }, [activeCat]);
  
  useEffect(() => {
    setUrl(api.getFetchCoursesUrl(activePage, pageSize, activeCat));
  }, [activeCat, activePage, pageSize, setUrl]);

  return (
    <div>
      {state.isError 
        ? <FetchDataError />
        : (state.isLoading 
          ? <DataLoading />
          : (state.data.length === 0 
            ? <DataNotFound />
            : (<div>
              {state.data.results.map((course, index) => (
                <CourseItem 
                  key={index}
                  course={course}
                />
              ))}
            </div>)))
      }
      {!state.isError 
        && 
        (<nav id="pagination" aria-label="Page navigation">
          <ul className="pagination pagination-lg justify-content-center">
            {visiblePieces.map((item, index) => {
              const key = `${item.type}-${index}`;

              if (item.type === 'ellipsis') {
                return (
                  <li key={key} className="page-item">
                    <span
                      className="page-number"
                    >
                      ...
                    </span>
                  </li>
                );
              }

              const { pageNumber } = item;
              const onClick = () => goToPage(pageNumber);

              if (item.type === 'page-number') {
                const isActive = pageNumber === activePage;
                const className = isActive ? "page-item active" : "page-item";

                return (
                  <li 
                    key={key}
                    className={className}
                    onClick={onClick}
                  >
                    <span className="page-link page-number">
                      {pageNumber}
                    </span>
                  </li>
                );
              }

              return (
                <li
                  key={key}
                  disabled={item.isDisable}
                  onClick={onClick}
                >
                  <span className="page-link page-number">
                    {item.type === 'next' ? 'Next' : 'Previous'}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>)
      }
    </div>
  );
}