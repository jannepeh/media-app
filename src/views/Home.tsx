import {MediaItem} from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import {useEffect, useState} from 'react';
import SingleView from '../components/SingleView';
import {fetchData} from '../lib/functions';

const Home = () => {
  const [mediaArray, setMediaArray] = useState<MediaItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>(
    undefined,
  );

  useEffect(() => {
    const getMedia = async () => {
      try {
        // Kaikki kuvat ilman thumbnailia tai screenshotteja
        const media = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );
        // haetaan mediat id:n perusteella, jotta saadaan thumbnailit
        const mediaWithThumbs = await Promise.all(
          media.map(async (item) => {
            const MediaItem = await fetchData<MediaItem>(
              import.meta.env.VITE_MEDIA_API + '/media/' + item.media_id,
            );
            MediaItem.filename =
              import.meta.env.VITE_FILE_URL + MediaItem.filename;
            MediaItem.thumbnail = MediaItem.thumbnail
              ? import.meta.env.VITE_FILE_URL + MediaItem.thumbnail
              : null;
            if (
              MediaItem.screenshots &&
              typeof MediaItem.screenshots === 'string'
            ) {
              MediaItem.screenshots = JSON.parse(
                MediaItem.screenshots as string,
              ).map((screenshot: string) => {
                return import.meta.env.VITE_FILE_URL + screenshot;
              });
            }
            return MediaItem;
          }),
        );

        console.log(mediaWithThumbs);

        setMediaArray(mediaWithThumbs);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    getMedia();
  }, []);

  console.log(mediaArray);

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
