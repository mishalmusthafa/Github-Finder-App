import { useContext } from 'react';
import InfoContext from '../../context/info/InfoContext';

function Info() {
  const { info } = useContext(InfoContext);

  return <div
    className={`grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4`}
    style={{ visibility: info ? 'visible' : 'hidden' }}
  >
    <div className="alert alert-info">
      <div>
        <svg
          fill='none'
          viewBox='0 0 24 24'
          className='w-6 h-6 stroke-current mr-3'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636'
          ></path>
        </svg>
      </div>
      <span>{info?.msg}</span>
    </div>
  </div>;

}


export default Info;
