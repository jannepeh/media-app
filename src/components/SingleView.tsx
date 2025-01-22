import {MediaItem} from 'hybrid-types/DBTypes';

const SingleView = (props: {item: MediaItem | undefined; setSelectedItem: (item: MediaItem | undefined) => void}) => {
  const {item, setSelectedItem} = props;
  console.log(item);
  return (
    <>
      <button
        onClick={() => {
          setSelectedItem(item);
        }}
      ></button>

      <dialog className="media-dialog" open>
        {item && (
          <>
            <button className="close-button" onClick={() => setSelectedItem(undefined)}>
              Close
            </button>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>Created at: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
            {item.media_type.startsWith('video') ? (
              <video controls>
                <source src={item.filename} type={item.media_type} />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item.filename} alt={item.title} />
            )}
          </>
        )}
      </dialog>
    </>
  );
};
export default SingleView;
