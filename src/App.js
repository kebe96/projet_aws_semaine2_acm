import logo from './logo.svg';
import './App.css';
import React from 'react';
import ImageUploader from './ImageUploader';
import { useState } from 'react';

function App() {
 
 
    // return (
    //   <div>
    //     <h1>Page d'accueil</h1>
    //     <ImageUploader />
    //   </div>
    // );

    //import React, { useState } from 'react';
//import ImageForm from './ImageUploader';
   

  const [images, setImages] = useState([]);

  const addImage = (imageData) => {
    setImages([...images, imageData]);
  };

  return (
    <div>
      <h1>Page d'accueil</h1>
      <ImageUploader onSubmit={addImage} />
      <div>
        <h2>Images téléversées :</h2>
        {images.map((imageData, index) => (
          <div key={index}>
            <img src={imageData.image} alt={`Image ${index}`} style={{ maxWidth: '100px' }} />
            <p>Commentaire : {imageData.comment}</p>
            <p>Note : {imageData.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default App;
