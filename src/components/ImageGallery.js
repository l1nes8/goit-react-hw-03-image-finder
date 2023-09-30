import React from 'react';
import css from '../styles.module.css';

export const ImageGallery = ({ children }) => (
  <ul className={css.ImageGallery}>{children}</ul>
);
