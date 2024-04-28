import { createContext, useReducer } from 'react';
import infoReducer from './InfoReducer';

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(infoReducer, initialState);

  const setInfo = (msg, type) => {
    dispatch({
      type: 'SET_INFO',
      payload: { msg, type }
    });
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_INFO',
      });
    }, 3000);
  };

  return (
    <InfoContext.Provider value={{
      info: state,
      setInfo
    }}>
      {children}
    </InfoContext.Provider>
  );
};

export default InfoContext;
