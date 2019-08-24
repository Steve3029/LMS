import {useState,useReducer, useEffect} from 'react';
import * as api from './api';

const FETCH_INIT = "FETCH_INIT";
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      }
    case FETCH_FAILURE:
      return {
        isLoading: false,
        isError: true,
      }
    default:
      return new Error();
  }
}

export default function useFetchData(initialData, initialUrl) {
  const [endPoint, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({type: FETCH_INIT});
      try {
        const response = await api.FetchData(endPoint);  
        dispatch({type: FETCH_SUCCESS, payload: response.data});
      } catch (error) {
        dispatch({type: FETCH_FAILURE});
      }
    };

    fetchData();
  }, [endPoint]);

  return {state, setUrl};
}