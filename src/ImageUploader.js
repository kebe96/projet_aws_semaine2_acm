import React, { useState } from 'react';
import './App.css';
//import ImageUploader from './ImageUploader';
import './App.js';

const ImageUploader = ({ onSubmit,uploadImageToS3 }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Upload the image to S3
      await uploadImageToS3(file);

      // Call the onSubmit function to update images in App component
      onSubmit({
        image: file.name, // Assuming you want to store the image filename
        comment: '', // You can customize this
        rating: 0, // You can customize this
      });
    }
  };

  // return (
  //   <div>
  //     <h3>Uploader une image :</h3>
  //     <input type="file" accept="image/*" onChange={handleImageUpload} />
  //   </div>
  // );
  return (
    <form onSubmit={handleSubmit}>
    <h2>Ajouter une image</h2>
    <div>
    <label>Image :</label>
    <input type="file" accept="image/*" onChange={handleSubmit} />
    </div>
    <div>
    <label>Commentaire :</label>
    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
    </div>
    <div>
    <label>Note :</label>
    <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
    </div>
    <button type="submit">Ajouter</button>
    </form>
      );
};

export default ImageUploader;
