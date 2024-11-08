'use client';

import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { AiOutlineClear } from 'react-icons/ai';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
  bookCover?: string;
}

const UploadBookCover = ({ bookCover }: IProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    bookCover || null
  );
  const [cropperVisible, setCropperVisible] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const cropperRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (bookCover) {
      setImagePreview(bookCover);
    }
  }, [bookCover]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setCropperVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    if (cropper) {
      setImagePreview(cropper.getCroppedCanvas().toDataURL());
      setCropperVisible(false);
    }
  };

  const handleClearImage = () => {
    setImagePreview(bookCover || null);
    setUploadedImage(null);
  };

  return (
    <div className="relative">
      {imagePreview && (
        <button
          onClick={handleClearImage}
          className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md hover:bg-gray-200 z-10"
          title="Clear image"
        >
          <AiOutlineClear className="text-gray-600" size={16} />
        </button>
      )}

      <label
        className="relative flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white p-1 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
        tabIndex={0}
      >
        {imagePreview ? (
          <div className="relative group h-60 w-44">
            <img
              src={imagePreview}
              alt="Selected"
              className="h-full w-full object-cover rounded-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 rounded-md transition duration-300 group-hover:bg-opacity-50">
              <MdOutlineFileUpload
                className="text-white opacity-0 transform translate-y-4 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                size={48}
              />
            </div>
          </div>
        ) : (
          <span className="flex items-center space-x-2">
            <svg className="h-44 w-full stroke-gray-400" viewBox="0 0 256 256">
              <path
                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
              <path
                d="M80,128a80,80,0,1,1,144,48"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></path>
              <polyline
                points="118.1 161.9 152 128 185.9 161.9"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></polyline>
              <line
                x1="152"
                y1="208"
                x2="152"
                y2="128"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
            <span className="text-xs font-medium text-gray-600">
              Drop files to Attach, or{' '}
              <span className="text-blue-600 underline">browse</span>
            </span>
          </span>
        )}
        <input
          id="photo-dropbox"
          type="file"
          className="sr-only"
          onChange={handleImageChange}
          accept="image/*"
        />
      </label>

      {/* Cropper Modal */}
      {cropperVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Crop your image</h2>
            {uploadedImage && (
              <Cropper
                src={uploadedImage}
                style={{ height: 300, width: '100%' }}
                aspectRatio={1 / 1.5} // Adjust this ratio as needed
                guides={false}
                ref={cropperRef}
                viewMode={1}
              />
            )}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setCropperVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCrop}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Crop & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBookCover;
