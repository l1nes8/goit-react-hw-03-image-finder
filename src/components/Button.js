import React from 'react';
import css from '../styles.module.css';

export const Button = ({ onClick, isVisible }) => {
  isVisible && (
    <button type="button" className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};
