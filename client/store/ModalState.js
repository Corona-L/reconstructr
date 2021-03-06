import React, { createContext, useReducer } from 'react';
import ModalReducer from './ModalReducer';

// Initial state
const on = false;

// Create context
export const ModalContext = createContext(on);


// Provider component
export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, on);

  // Actions
  function toggleModal () {
    dispatch({type: 'toggleModal'});
  }

  return (<ModalContext.Provider value={{
    modal: state,
    toggleModal
  }}>
    {children}
  </ModalContext.Provider>);
};