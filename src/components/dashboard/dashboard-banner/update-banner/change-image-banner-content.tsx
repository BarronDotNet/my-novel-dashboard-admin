'use client';

import { ChangeEvent, useState, useEffect } from 'react';

interface IProps {
  imageUrl?: string;
}

const ChangeImageBannerContent = ({ imageUrl }: IProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    imageUrl || null
  );

  useEffect(() => {
    if (imageUrl) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label
      className="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
      tabIndex={0}
    >
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Selected"
          className="h-44 w-full object-cover rounded-md"
        />
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
  );
};

export default ChangeImageBannerContent;
