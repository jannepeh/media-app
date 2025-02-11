import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/Likes';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h2>Single</h2>
      <h3>{item.title}</h3>
      <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
      {item.media_type.includes('image') ? (
        <img className="max-w-full" src={item.filename} alt={item.title} />
      ) : (
        <video className="max-w-full" src={item.filename} controls />
      )}
      <Likes item={item} />
      <p>{item.description}</p>
      <p>Owner: {item.username}</p>
      <p>Type: {item.media_type}</p>
      <p>Size: {Math.round(item.filesize / 1024)} kB</p>
      <button
        className="m-[5px] cursor-pointer rounded-sm border border-solid border-white bg-white p-[10px] text-black"
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
    </>
  );
};

export default Single;
