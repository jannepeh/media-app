import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  return (
    <tr>
      <td className="td p-4">
        <img
          className="img h-[150x] w-[260px] object-cover"
          src={
            item.thumbnail ||
            (item.screenshots && item.screenshots[2]) ||
            undefined
          }
          alt={item.title}
        />
      </td>
      <td className="td p-1">{item.title}</td>
      <td className="td p-1">{item.description}</td>
      <td className="td p-1">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="td p-1">{item.filesize}</td>
      <td className="td p-1">{item.media_type}</td>
      <td className="td p-1">{item.username}</td>
      <td className="td p-1">
        <Link
          className="transition-all duration-500 ease-in-out hover:bg-stone-700"
          to="/single"
          state={{item}}
        >
          Show
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
