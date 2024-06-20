import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    title: '',
    description: '',
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ajouter ici la logique pour traiter les données du formulaire
    console.log(formData);
    setIsFormOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMenuItemClick = () => {
    setIsFormOpen(true);
  };

  return (
    <div>
      <button onClick={handleMenuItemClick}>Publier</button>
      {isFormOpen && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Latitude:
            <input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} />
          </label>
          <label>
            Longitude:
            <input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} />
          </label>
          <label>
            Titre:
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleInputChange} />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      )}
    </div>
  );
};

export default App;
