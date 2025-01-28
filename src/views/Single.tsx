import {MediaItem} from 'hybrid-types/DBTypes';
import {useLocation} from 'react-router-dom';
import {NavigateFunction, useNavigate} from 'react-router-dom';

const Single = () => {
  const {state} = useLocation();
  const item: MediaItem = state.item;
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <h1>{item.title}</h1>
      <p>{item.description}</p>
      <p>Size: {Math.round(item.filesize / 1024)} KB</p>{' '}
      <p>Created at: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      <div className="media-container">
        {item.media_type.startsWith('video') ? (
          <video controls>
            <source src={item.filename} type={item.media_type} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img src={item.filename} alt={item.title} />
        )}
        <button className="go-back-button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    </>
  );
};

export default Single;
