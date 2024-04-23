import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import GithubContext from '../../context/github/GithubContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function User() {
  const { user, getUser } = useContext(GithubContext);
  console.log(user);
  const params = useParams();

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
    hirable
  } = user;

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <>
    <div className="w-full mx-auto lg:w-10/12">
      <div className="mb-4">
        <Link to='/' className='btn btn-ghost'>Back to Search</Link>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
        <div className="custom-card-image mb-8 md:mb-0">
          <div className="rounded-lg shadow-xl card image-full">
            <figure>
              <img src={avatar_url} alt="" />
            </figure>
            <div className="card-body justify-end">
              <h2 className='card-title mb-0'>{name}</h2>
              <p flex-grow-0>{login}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>;
}

export default User;
