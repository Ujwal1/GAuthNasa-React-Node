import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImage() {
      const response = await axios.get('https://images-api.nasa.gov/search?q=space&media_type=image');
      const items = response.data.collection.items;
      const randomIndex = Math.floor(Math.random() * items.length);
      setImage(items[randomIndex].links[0].href);
    }
    fetchImage();
    const interval = setInterval(() => {
      fetchImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='homepage'>
      <img src={image} className="homepage__image" />
      <div className="button" onClick = {() => {navigate("/login")}} >Logout</div>
    </div>
  );
}

export default Homepage;