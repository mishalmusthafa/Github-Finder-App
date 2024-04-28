import { useState, useContext } from 'react';
import TypeMe, { LineBreak, Delete } from 'react-typeme';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import InfoContext from '../../context/info/InfoContext';
import { searchUsers } from '../../context/github/GithubActions';
function UserSearch() {

  const [text, setText] = useState('');

  const { users, dispatch, clearUsers } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const { setInfo } = useContext(InfoContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === '') {
      setAlert('Please enter something', 'error');
    } else {
      dispatch({ type: 'SET_LOADING' });
      const users = await searchUsers(text);
      setText('');
      dispatch({ type: 'GET_USERS', payload: users });

      if (users.length === 0) {
        setInfo('No results found', 'info');
      }
    }
  };


  return <>
    {users.length === 0 && (
      <h2 className='text-5xl font-bold mb-10'>
        <TypeMe>
          Ennter Github Username
        </TypeMe>
      </h2>
    )}

    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-w md:grid-cols-2 mb-8 gap-8'>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <div className="join">
            <input type="text" className='join-item w-full bg-gray-200 input input-lg text-black' placeholder='Search' onChange={handleChange} value={text} />
            <button type='submit' className='join-item rounded-l-none btn btn-lg'> Go</button>
          </div>
        </div>

      </form>
      <div>
        {users.length > 0 &&
          (<button onClick={clearUsers} className="btn btn-ghost btn-lg">
            Clear
          </button>
          )}

      </div>
    </div>
  </>;



  // return <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-w md:grid-cols-2 mb-8 gap-8'>
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-control">
  //       <div className="relative">
  //         <input type="text" className='w-full pr-40 bg-gray-200 input input-lg text-black' placeholder='Search' onChange={handleChange} value={text} />
  //         <button type='submit' className='absolute top-0 right-0 rounded-l-none btn btn-lg'> Go</button>
  //       </div>
  //     </div>

  //   </form>
  //   <div>
  //     {users.length > 0 &&
  //       (<button onClick={clearUsers} className="btn btn-ghost btn-lg">
  //         Clear
  //       </button>
  //       )}

  //   </div>
  // </div>;
}

export default UserSearch;
