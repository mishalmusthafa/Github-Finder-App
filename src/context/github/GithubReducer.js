const githubReducer = (state, action) => {

  switch (action.type) {

    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        noUsers: false,
        loading: false,
      };

    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case 'NO_USERS':
      return {
        ...state,
        users: [],
        noUsers: true,
        loading: false
      };

    case 'REMOVE_NO_USERS':
      return {
        ...state,
        users: [],
        noUsers: false,
        loading: false
      };

    case 'GET_REPOS':
      return {
        ...state,
        repos: action.payload,
        loading: false
      };


    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'CLEAR_USERS':
      return {
        ...state,
        users: []
      };



    default:
      return state;
  }
};

export default githubReducer;