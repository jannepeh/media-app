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

      <dialog open>{item && <img src={item.filename} alt={item.title} />}</dialog>
    </>
  );
};
export default SingleView;
