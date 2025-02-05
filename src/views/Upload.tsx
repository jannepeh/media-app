import {ChangeEvent, useState} from 'react';
import {useForm} from '../hooks/FormHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
// import {useNavigate} from 'react-router-dom';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');
  const [file, setFile] = useState<File | null>(null);
  // const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);
      setUploading(false);
      // redirect to home
      // navigate('/');
      //or notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
  };

  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            // TODO: reset filename in form
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button type="reset" onClick={resetForm}>
          Reset
        </button>
        <p>{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
