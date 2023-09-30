import React from 'react';
import css from '../styles.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => (
  <li className={css.ImageGalleryItem} onClick={() => onClick(largeImageURL)}>
    <img src={webformatURL} alt="" className={css.ImageGalleryItemImage} />
  </li>
);
