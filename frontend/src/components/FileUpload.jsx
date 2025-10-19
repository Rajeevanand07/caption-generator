import { useState, useRef, useCallback, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { MdCheckCircle } from "react-icons/md"; // Example icon

const FileUpload = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState(null);
  const fileInputRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the first file only
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      alert("Please select an image file");
    }
  };

  const generateCaption = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post("http://localhost:3000/api/post", formData, {
        withCredentials: true,
      });
      setSelectedFile(null);
      setCaption(res.data.post.caption);
      toast.success("Caption Generated...!", {
        icon: <MdCheckCircle style={{ color: "#006A71", fontSize: "40px" }} />
      });
      setLoading(false);
    } catch (error) {
      console.log("Error handling file upload:", error);
      toast.error("Failed to generate caption");
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setCaption(null);
      fileInputRef.current.click();
    } else {
      navigate("/login");
    }
  };

  // This is necessary to make the drop zone work.
  const handleDragEvents = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback(
    (e) => {
      handleDragEvents(e);
      setIsDragging(true);
    },
    [handleDragEvents]
  );

  const handleDragLeave = useCallback(
    (e) => {
      handleDragEvents(e);
      setIsDragging(false);
    },
    [handleDragEvents]
  );

  const handleDrop = useCallback(
    (e) => {
      handleDragEvents(e);
      setIsDragging(false);

      if (isAuthenticated) {
        const file = e.dataTransfer.files[0]; // Get the first dropped file
        if (file && file.type.startsWith("image/")) {
          setSelectedFile(file);
          const formData = new FormData();
          formData.append("image", file);

          // Handle the formData here
          console.log("File dropped:", file.name);
        } else {
          alert("Please drop an image file");
        }
      } else {
        navigate("/login");
      }
    },
    [handleDragEvents, isAuthenticated, navigate]
  );

  const copyToClipboard = (ref) => {
    if (ref.current) {
      navigator.clipboard
        .writeText(ref.current.innerText)
        .then(() => {
          alert("Caption copied!"); // Optional feedback
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragEvents}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging ? "border-[#48A6A7] bg-[#9ACBD0]/20" : "border-gray-300"
          }`}
        >
          <input
            type="file"
            accept="image/*" // Only accept image files
            id="fileInput"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          <button
            onClick={handleButtonClick}
            className="bg-[#006A71] hover:bg-[#48A6A7] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Choose Files
          </button>

          <p className="mt-4 text-sm text-gray-500">
            or drag and drop files here
          </p>

          <p className="mt-6 text-sm font-medium text-black">
            Max file size: 10MB
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Your files are processed locally and never uploaded.
          </p>

          {selectedFile && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Selected:{" "}
                <span className="text-blue-500">{selectedFile.name}</span>
              </p>
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="mt-2 max-w-xs mx-auto rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
      {selectedFile !== null && (
        <div className="flex justify-center">
          <button
            onClick={generateCaption}
            className="bg-[#006A71] hover:bg-[#48A6A7] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform cursor-pointer inline-flex items-center gap-2"
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>
      )}
      {caption !== null && (
        <div className="max-w-[80%] bg-[#FFFFFF] rounded-xl shadow-md p-6">
          {/* Top row with left caption and right copy icon */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-gray-500">Caption :</span>
            <span
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => copyToClipboard(captionRef)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            </span>
          </div>

          <h2
            ref={captionRef}
            className="text-xl font-bold text-center text-[#006A71]"
          >
            {caption || "Your generated caption will appear here."}
          </h2>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
