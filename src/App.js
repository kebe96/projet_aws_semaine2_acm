import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { useState } from 'react';
import  {Amplify, API } from 'aws-amplify';
import awsExports from "./aws-exports";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';




import '@aws-amplify/ui-react/styles.css';


Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: "api9fcc498d",
        endpoint: "https://ih52kciyv2.execute-api.us-east-1.amazonaws.com/dev",
        region: "us-east-1",
      },
    ],
  },
});

const App = () => {
 
  const fetchApiData = async () => {
    try {
      const response = await API.get('api9fcc498d', '/bucketS3');
      console.log('Resource response', response);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };
  
  useEffect(() => {
    fetchApiData();
  }, []);


  const [images, setImages] = useState([]);

  const addImage = (imageData) => {
    setImages([...images, imageData]);
  };

  return (
    <div>
      <h1>Page d'accueil</h1>
      <ImageUploader onSubmit={addImage} />
      <div>
        <img src="https://projetawssemaine2acmf60cfe3dad1b414cb943fddd33f173248-dev.s3.amazonaws.com/mansour.png" className="App-logo" alt="logo" />
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

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);

