import React, { useState, useEffect } from 'react';
import CourseItem from './CourseItem';
import * as api from '../common/api';
import './course.css';

export default function CourseList({activeCat}) {
  const [courseList, setCourseList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumbers, setPageNumbers] = useState([1]);

  const fillList = async () => {
    const response = await api.fetchCourses(page, pageSize, activeCat);
    setCourseList(response.data.results);
    if (pageNumbers.length != response.data.pageCount) {
      const totalPage = response.data.pageCount;
      const pageArr = [];
      for (let index = 1; index <= totalPage; index++) {
        pageArr[index - 1] = index; 
      }
      setPageNumbers(pageArr);
    }
  };

  useEffect(() => {
    fillList();
  }, [activeCat, page, pageSize]);

  useEffect(() => {
    setPage(1);
    setPageSize(5);
    fillList();
  }, [activeCat]);

  return (
    <div>
      <div>
        {courseList.map((course, index) => (
          <CourseItem 
            key={index}
            course={course}
          />
        ))}
      </div>
      <nav id="pagination" aria-label="Page navigation">
        <ul className="pagination pagination-lg justify-content-center">
        {page > 1 
        ? <li className="page-item">
          <span 
            className="page-link page-number" 
            onClick={() => setPage(page - 1)}
          >
            Previous
          </span>
        </li>
        : ''}
          {pageNumbers.map((pageNo, index) => (
            <li key={index} className="page-item">
              <span 
                className="page-link page-number" 
                onClick={() => setPage(pageNo)}
              >
                {pageNo}
              </span>
            </li>
          ))}
          {page < pageNumbers.length 
          ? <li className="page-item">
            <span 
              className="page-link page-number" 
              onClick={() => setPage(page + 1)}
            >
              Next
            </span>
          </li>
          : ''}
        </ul>
      </nav>
    </div>
  );
}