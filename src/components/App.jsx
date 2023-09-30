import React, { Component } from 'react';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import { Searchbar } from './Searchbar.js';
import { ImageGallery } from './ImageGallery.js';
import { ImageGalleryItem } from './ImageGalleryItem.js';
import { Button } from './Button.js';
import { Modal } from './Modal.js';
import css from '../styles.module.css';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
    modalImageURL: '',
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const apiKey = '38965444-221e39e59f698a8ee4d2c4c8b';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`;

    this.setState({ isLoading: true });

    axios
      .get(url)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          page: prevState.page + 1,
        }));
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        this.setState({ error: 'Error fetching images' });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  handleSearchSubmit = query => {
    this.setState({ query, images: [], page: 1 }, this.fetchImages);
  };

  handleLoadMoreClick = () => {
    this.fetchImages();
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, modalImageURL: largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false, modalImageURL: '' });
  };

  render() {
    const { images, isLoading, error, showModal, modalImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={this.handleImageClick}
            />
          ))}
        </ImageGallery>
        {isLoading && (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        )}
        {images.length > 0 && (
          <Button onClick={this.handleLoadMoreClick} isVisible={true} />
        )}
        {showModal && (
          <Modal
            largeImageURL={modalImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        {error && <p className="error">{error}</p>}
      </div>
    );
  }
}
