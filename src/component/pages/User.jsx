import { FaCodepen, FaStore, FaUser, FaUserFriends } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import GithubContext from '../../context/github/GithubContext';
import { getUser, getUserRepos } from '../../context/github/GithubActions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';

function User() {
  const { user, loading, repos, dispatch } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const getUserData = async () => {

      const userData = await getUser(params.login);
      dispatch({ type: 'GET_USER', payload: userData });

      const userRepoData = await getUserRepos(params.login);
      dispatch({ type: 'GET_REPOS', payload: userRepoData });
    };

    getUserData();
  }, [dispatch, params.login]);

  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;



  if (loading) {
    return <Spinner />;
  } else
    return <>
      <div className="w-full mx-auto xl:w-10/12 ">
        <div className="mb-4">
          <Link to='/' className='btn btn-ghost'>BACK TO SEARCH</Link>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">

          <div className="custom-card-image mb-8 md:mb-0 ">
            <div className="rounded-lg shadow-xl card image-full ">
              <figure>
                <img src={avatar_url} alt="" />
              </figure>
              <div className="card-body justify-end ">
                <div className="card-title text-white">{name}</div>
                <div className='text-white'>{login}</div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="mb-6">
              <h1 className="text-3-xl card-title">{name}
                <div className="badge badge-success ml-2 mr-1">{type}</div>
                {hireable && (<div className="badge badge-info ml-2 mr-1">hireable</div>)}
              </h1>
              <p>{bio}</p>
              <div className="mt-4 card-action">
                <a href={html_url} target='_blank' rel='noreferrer' className='btn btn-outline' >Visit Github profile</a>
              </div>
            </div>
            <div className="w-full rounded-lg shadow-md bg-base-100 stats  
            stats-vertical 
            xl:stats-horizontal
             overflow-hidden">
              {location && (
                <div className="stat">
                  <div className="stat-title text-md">Location</div>
                  <div className="stat-value text-lg">{location}</div>
                </div>
              )}

              {blog && (
                <div className="stat">
                  <div className="stat-title text-md">Website</div>
                  <div className="stat-value text-lg">
                    <a href={`https://${blog}`} target='_blank' rel='noreferrer'>{blog}</a>
                  </div>
                </div>
              )}

              {twitter_username && (
                <div className="stat">
                  <div className="stat-title text-md">Twitter</div>
                  <div className="stat-value text-lg">
                    <a href={`https://twitter.com/${twitter_username}`} target='_blank' rel='noreferrer'>{twitter_username}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-basw-100 stats stats-vertical lg:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUser className='text-3xl md:text-5xl' />
            </div>
            <div className="stat-title pr-5">Followers</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{followers}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaUserFriends className='text-3xl md:text-5xl' />
            </div>
            <div className="stat-title pr-5">Following</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{following}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaCodepen className='text-3xl md:text-5xl' />
            </div>
            <div className="stat-title pr-5">Public Repos</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{public_repos}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaStore className='text-3xl md:text-5xl' />
            </div>
            <div className="stat-title pr-5">Public Gists</div>
            <div className="stat-value pr-5 text-3xl md:text-4xl">{public_gists}</div>
          </div>
        </div>
        <RepoList repos={repos} />
      </div>

    </>;
}

export default User;
