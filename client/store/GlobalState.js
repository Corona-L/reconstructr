import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import data from './mockdata';


// Initial state
const initialState = data;
const on = false;

// Create context
export const GlobalContext = createContext(initialState);
export const modalVisibility = createContext(on);

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

  function addNewStep (userInput, url, ID) {
    dispatch({
      type: 'addStep',
      payload: {userInput, url, ID}
    });
  }

  // trying to add global toggle function
  // function toggleModal () {
  //   dispatch({
  //     type: 'toggleModal'
  //   });
  // }

  return (<GlobalContext.Provider value={{
    projects: state,
    addNewFolder,
    addNewStep,
    // toggleModal
  }}>
    {children}
  </GlobalContext.Provider>);
};