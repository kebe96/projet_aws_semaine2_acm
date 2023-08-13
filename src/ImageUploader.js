import React, { useState } from 'react';
import './App.css';


// const ImageUploader = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <h2>Uploader une image</h2>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       {selectedImage && (
//         <div>
//           <h3>Image téléversée :</h3>
//           <img src={selectedImage} alt="Téléversé" style={{ maxWidth: '100%' }} />
//         </div>
//       )}
//     </div>
//   );
// };

//import React, { useState } from 'react';

const ImageUploader = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ image: selectedImage, comment, rating });
    setSelectedImage(null);
    setComment('');
    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter une image</h2>
      <div>
        <label>Image :</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
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

//export default ImageForm;


export default ImageUploader;
