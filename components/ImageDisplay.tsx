import React, { useState } from 'react';

const ImageGenerator = () => {
  const imageFileNames = Array.from({ length: 7 }, (_, i) => `images/${i + 1}.jpg`);
  const [imageUrl, setImageUrl] = useState('');

  const handleHideImage = () => {
    setImageUrl('');
  };

  const handleImageClick = () => {
    const randomIndex = Math.floor(Math.random() * imageFileNames.length);
    const randomImageFileName = imageFileNames[randomIndex];
    const publicImageUrl = '/' + randomImageFileName;
    setImageUrl(publicImageUrl);
  };

  return (
    <div className="text-center mb-0">
      <button
        onClick={handleImageClick}
        className="py-5 px-5 mt-5 text-white bg-green-500 border border-green-600 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-green-300">
        Мне грустно
      </button>
      <button
        onClick={handleHideImage}
        className="ml-5 py-5 px-5 mt-5 text-white bg-red-500 border border-red-600 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
        Мне норм
      </button>
      {imageUrl && (
        <div className="mt-4 flex justify-center">
          <div className="w-64 h-64 border border-gray-300 overflow-hidden flex justify-center">
            <img src={imageUrl} alt="Generated Image" className="max-w-full max-h-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
