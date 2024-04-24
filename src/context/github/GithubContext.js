import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    noUsers: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search User names
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text

    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    const { items } = await response.json();

    if (items.length > 0) {
      dispatch({
        type: 'GET_USERS',
        payload: items
      });
    } else {
      dispatch({
        type: 'NO_USERS'
      });

      setTimeout(() => {
        dispatch({
          type: 'REMOVE_NO_USER'
        });
      }, 3000);
    }

  };

  // Search Single user
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data
      });
    }
  };

  // Get user repos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10

    });
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data
    });

  };

  // Set loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING'
    });
  };

  // Clear Users from the state
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS'
    });
  };

  return <GithubContext.Provider value={{
    users: state.users,
    loading: state.loading,
    user: state.user,
    repos: state.repos,
    noUsers: state.noUsers,
    searchUsers,
    clearUsers,
    getUser,
    getUserRepos
  }}>
    {children}
  </GithubContext.Provider>;
};

export default GithubContext;