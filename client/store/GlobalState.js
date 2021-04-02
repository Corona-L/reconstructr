import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import data from './mockdata';

const initialState = data;

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addNewFolder(userInput, ID) {
    dispatch({
      type: 'addFolder',
      payload: { userInput, ID }
    });
  }

  function addNewStep(userInput, url, ID) {
    dispatch({
      type: 'addStep',
      payload: { userInput, url, ID }
    });
  }

  function saveRecording(uri, id) {
    dispatch({
      type: 'addRecording',
      payload: { uri, id }
    });
  }

  return (<GlobalContext.Provider value={{
    projects: state,
    addNewFolder,
    addNewStep,
    saveRecording
  }}>
    {children}
  </GlobalContext.Provider>);
};