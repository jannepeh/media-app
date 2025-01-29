import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  console.log(item);
  return (
    <dialog open>
      {item && (
        <>
          <button
            onClick={() => {
              setSelectedItem(undefined);
            }}
          >
            Close
          </button>
          <h3>{item.title}</h3>
          <p>{new Date(item.created_at).toLocaleString('fi-FI')}</p>
          {item.media_type.includes('image') ? (
            <img src={item.filename} alt={item.title} />
          ) : (
            <video src={item.filename} controls />
          )}
          <p>{item.description}</p>
        </>
      )}
    </dialog>
  );
};
export default SingleView;
