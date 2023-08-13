import logo from './logo.svg';
import './App.css';

//function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Apprendre a connaitre l'homme
//         </a>
//       </header>
//     </div>
//   );
//}
//export default App;

import { Amplify, Analytics, API, Storage } from 'aws-amplify';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

const App = ({ signOut, user }) => {
  const [ressources, setRessources] = useState(null);
  const [fileList, setFileList] = useState([]);
  const fetchApiData = async () => {
    try {
      const response = await API.get('apiMonitoring', '/ressources');
      console.log('response AAAA A', response);
      setRessources(response);
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    try {
      await Storage.put(fileName, file, { level: 'private', contentType: file.type });
      console.log('File uploaded successfully');
    } catch (err) {
      console.error('Error uploading file: ', err);
    }
  };

  const showS3Content = async () => {
    try {
      const filesInRootFolder = await Storage.list('', { level: 'private' });
      const filesInRootFolderArray = Object.values(filesInRootFolder);
      const allFiles = [].concat(...filesInRootFolderArray);
      const fileNames = allFiles
        .filter(file => file && file.key)
        .map(file => file.key);
        //Analytics.record({ name: 'S3 content displayed' });
        Analytics.record({
          name: user.attributes.email,
          attributes: { 'S3 content displayed': 'true' },
          namespace: 'user',
          passthrough: { email: user.attributes.email },
          immediate: true
        });
      setFileList(fileNames);
    } catch (error) {
      console.error('Error fetching S3 content:', error);
    }
  };

  useEffect(() => {
    fetchApiData();
  }, []);

  return (
    <div style={styles.container}>
      <Heading level={1}>Bonjour {user.attributes.email}</Heading>
      <Button onClick={signOut} style={styles.button}>Sign out</Button>
      <h2>Amplify App</h2>

      <button onClick={fetchApiData} style={styles.button} >Charger les données de l'API</button>
      {ressources && (
        <div>
          <h2>Résultat de l'appel API :</h2>
          <pre>{JSON.stringify(ressources, null, 2)}</pre>
          <pre>{JSON.stringify(user.attributes.email, null, 2)}</pre>
        </div>

      )}



      <label htmlFor="myfile">Select a file:</label>
      <input type="file" id="myfile" name="myfile" onChange={handleFileUpload} />
      <button onClick={showS3Content} style={styles.button}>Show S3 Content</button>
      {Array.isArray(fileList) && fileList.length > 0 && (
        <div>
          <h2>List of files in S3:</h2>
          <pre>
            {fileList.map((file, index) => (
              file && file.name ? file.name + "\n" : null
            ))}
          </pre>
          <pre>
            {fileList.join("\n")}
          </pre>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator(App);
