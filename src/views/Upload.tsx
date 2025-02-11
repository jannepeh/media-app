import {ChangeEvent, useRef, useState} from 'react';
import {useForm} from '../hooks/FormHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
// import {useNavigate} from 'react-router-dom';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
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
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="m-1 pt-10 pb-10 text-center">Upload</h1>
      <form
        className="flex flex-col items-center justify-center rounded-2xl bg-white pt-10 pb-5"
        onSubmit={handleSubmit}
      >
        <div className="flex w-[80%] flex-col">
          <label className="text-black" htmlFor="title">
            Title
          </label>
          <input
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px] text-black"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="flex w-[80%] flex-col">
          <label className="text-black" htmlFor="description">
            Description
          </label>
          <textarea
            className="m-[10px 0] rounded-sm border border-solid border-stone-300 p-[10px] text-black"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="flex w-[80%] flex-col">
          <label className="text-black" htmlFor="file">
            File
          </label>
          <input
            className="m-[10px 0] mb-10 rounded-sm border border-solid border-stone-300 p-[10px] text-black"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            // reference for useRef hook
            ref={fileRef}
          />
        </div>
        <img
          className="m-[10px 0] h-[200px] w-[200px] rounded-2xl object-cover"
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          className="m-[15px] cursor-pointer rounded-sm border-none bg-green-600 p-[10px] text-white hover:bg-green-800"
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button
          className="m-[15px] cursor-pointer rounded-sm border-none bg-red-600 p-[10px] text-white hover:bg-red-800"
          onClick={resetForm}
        >
          Reset
        </button>
        <p>{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
