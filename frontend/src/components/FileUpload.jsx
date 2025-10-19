import React, { useState, useRef, useCallback } from 'react';

// Main App component to render the FileUpload



const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
  
  };

  const handleButtonClick = () => {

  };
  

  // This is necessary to make the drop zone work.
  const handleDragEvents = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e) => {
    handleDragEvents(e);
    setIsDragging(true);
  }, [handleDragEvents]);

  const handleDragLeave = useCallback((e) => {
    handleDragEvents(e);
    setIsDragging(false);
  }, [handleDragEvents]);

  const handleDrop = useCallback((e) => {
    handleDragEvents(e);
    setIsDragging(false);
    // Your file drop logic here
  }, [handleDragEvents]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
      <div 
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEvents}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${isDragging ? 'border-[#48A6A7] bg-[#9ACBD0]/20' : 'border-gray-300'}`}
      >
        <input 
          type="file" 
          id="fileInput" 
          multiple 
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        <button 
          onClick={handleButtonClick}
          className="bg-[#006A71] hover:bg-[#48A6A7] text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 inline-flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Choose Files
        </button>

        <p className="mt-4 text-sm text-gray-500">or drag and drop files here</p>
        
        <p className="mt-6 text-sm font-medium text-black">Max file size: 10MB</p>
        <p className="mt-1 text-xs text-gray-400">Your files are processed locally and never uploaded.</p>
      </div>
    
    </div>
  );
};


export default FileUpload;