import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [val, setVal] = useState("Upload image to predict");
  
  const [filename, setFilename] = useState("No file Uploaded")

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      });
  }, []);
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      axios.post("http://localhost:5000/upload", formData).then((res) => {
        console.log(res.data.message);
        setVal(res.data.message);
      });
      alert("File uploaded successfully");
    } catch (error) {
      console.error(error);
    }

  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFilename(file.name);
  };

  return (
    <>
    <div>
      <h1 className="flex items-center justify-center mt-[5rem] ml-4 text-3xl font-extrabold dark:text-green-800 md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-green-600 from-blue-900 ">
            Welcome to Waste Classifier 
    <br/>To Segregate Wet and Dry Waste 
      </span>
      </h1>
      </div>
      <p className="text-sm font-normal text-white lg:text-xl">
        Upload the image file to detect.
      </p>
      <form onSubmit={handleSubmit}>
    
      <div className="flex w-full items-start justify-center bg-green-lighter mb-5 mt-[5rem] ">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
          <svg
            className="w-8 h-8"
            fill="blue"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type="file"  name="file"  className="hidden" onChange={(e) => {setFile(e.target.files[0]); handleFileUpload(e) }}/>
        </label>
      </div>
      <span className="text-white">File Uploaded : {filename}</span>

      <div className="flex items-center justify-center">
        <button className="flex bg-violet-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-5" type="submit">
          The Trash Goes To..
        </button>
      </div>
      </form>

      <div className=" flex items-center justify-center mt-[5rem] mb-4 text-2xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-violet-600 from-blue-900 font-black">
          Detected Image is : {val}
        </span>
      </div>
    </>
  );
}

export default App;
