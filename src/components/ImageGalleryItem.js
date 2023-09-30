import React from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => (
  <li className="gallery-item" onClick={() => onClick(largeImageURL)}>
    <img src={webformatURL} alt="" className="gallery-image" />
  </li>
);
