// This hook is inspired by eliseumds and his outstanding work on 
// react-pagination-hook: https://github.com/eliseumds/react-pagination-hook
// This is a plain JS edition of it.
import { useCallback, useState, useEffect } from 'react';

const defaultConfig = {
  numberOfPages: 0,
  initialPage: process.env.REACT_APP_PG_INITIAL_PAGE,
  maxButtons: process.env.REACT_APP_PG_MAX_BUTTONS,
  showEllipsis: process.env.REACT_APP_PG_SHOW_ELLIPSIS
};

function computeVisiblePieces(activePage, config) {
  const { maxButtons, numberOfPages, showEllipsis } = config;
  const visiblePieces = [];

  // when number of pages is less than number of page nav buttons, just need to render all these buttons on page
  if (numberOfPages <= maxButtons) {
    for (let page = 1; page <= numberOfPages; page++) {
      visiblePieces.push({ type: 'page-number', pageNumber: page });
    }

    return visiblePieces;
  }

  //start dealing with the situation that page number is more than page nav buttons 
  let lowerLimit = activePage;
  let upperLimit = activePage;

  visiblePieces.push({
    type: 'previous',
    pageNumber: Math.max(1, activePage - 1),
    isDisable: activePage === 1
  });

  // compute the first and the last number of page nav buttons
  for (let i = 1; i < maxButtons && i < numberOfPages;) {
    if (lowerLimit > 1) {
      lowerLimit--;
      i++;
    }

    if (upperLimit < maxButtons && upperLimit < numberOfPages) {
      upperLimit++;
      i++;
    }
  }

  // when the first page nav button is greater than 1 then showing first page button and ellipsis to enable user to nav to the first page
  if (lowerLimit > 1) {
    visiblePieces.push({ type: 'page-number', pageNumber: 1 });
    visiblePieces.push({ type: 'ellipsis' });
  }
  // making page nav buttons needed to render on page
  for (let i = lowerLimit; i <= upperLimit; i++) {
    visiblePieces.push({ type: 'page-number', pageNumber: i});
  }
  
  if (activePage < numberOfPages - 2) {
    visiblePieces.push({ type: 'ellipsis'});
    visiblePieces.push({ type: 'page-number', pageNumber: numberOfPages });
  }
  // same as lowerLimit
  visiblePieces.push({ 
    type: 'next',
    pageNumber: Math.min(numberOfPages, activePage + 1),
    isDisable: activePage === numberOfPages
  });

  return visiblePieces;
}

export default function usePagination(customizedConfig) {
  if (typeof customizedConfig !== 'object') {
    throw new Error(
      `usePagination(config): config must be a object. Go ${typeof customizedConfig} instead.`
    );
  }

  const config = { ...defaultConfig, ...customizedConfig };
  if (config.initialPage > config.numberOfPages) {
    config.initialPage = config.numberOfPages;
  }

  if (config.maxButtons > config.numberOfPages) {
    config.maxButtons = config.numberOfPages;
  }

  const [activePage, setActivePage] = useState(config.initialPage);
  const { numberOfPages } = config;
  const isFirst = activePage === 1;
  const isLast = activePage === numberOfPages;
  const hasPrivous = numberOfPages > 1 && activePage > 1;
  const hasNext = activePage < numberOfPages;
  const visiblePieces = computeVisiblePieces(activePage, config);
  const goToPage = useCallback(pageNumber => setActivePage(pageNumber), []);

  useEffect(() => {
    if (config.initialPage !== activePage) {
      setActivePage(config.initialPage);
    }
  }, [config.initialPage]);

  return {
    activePage,
    isFirst,
    isLast,
    hasPrivous,
    hasNext,
    visiblePieces,
    goToPage
  };
}