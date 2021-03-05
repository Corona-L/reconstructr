import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import data from './mockdata';

// Initial state
const initialState = data;

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function addNewFolder (userInput, ID) {
    dispatch({
      type: 'addFolder',
      payload: {userInput, ID}
    });
  }

  function addNewStep (text, url, ID) {
    dispatch({
      type: 'addStep',
      payload: {text, url, ID}
    });
  }

  return (<GlobalContext.Provider value={{
    projects: state,
    addNewFolder,
    addNewStep
  }}>
    {children}
  </GlobalContext.Provider>);
};