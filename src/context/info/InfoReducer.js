const infoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INFO':
      return action.payload;
    case 'REMOVE_INFO':
      return null;

    default:
      return state;
  }
};

export default infoReducer;