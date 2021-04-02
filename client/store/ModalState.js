import React, { createContext, useReducer } from 'react';
import ModalReducer from './ModalReducer';

const on = false;

export const ModalContext = createContext(on);


export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, on);

  function toggleModal() {
    dispatch({ type: 'toggleModal' });
  }

  return (<ModalContext.Provider value={{
    modal: state,
    toggleModal
  }}>
    {children}
  </ModalContext.Provider>);
};