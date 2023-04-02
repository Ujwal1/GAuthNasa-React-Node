import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState('');

  useEffect(() => {
    async function fetchImage() {
      const response = await axios.get('https://images-api.nasa.gov/search?q=space&media_type=image');
      const items = response.data.collection.items;
      const randomIndex = Math.floor(Math.random() * items.length);
      setImage(items[randomIndex].links[0].href);
    }
    fetchImage();
  }, []);

  return (
    <div>
      <img src={image} alt="NASA Random Image" />
    </div>
  );
}

export default App;