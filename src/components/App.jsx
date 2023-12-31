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
    perPage: 12,
    isLoading: false,
    error: null,
    showModal: false,
    modalImageURL: '',
    totalHits: 0,
  };

  fetchImages = () => {
    const { query, page, perPage } = this.state;
    const apiKey = '38965444-221e39e59f698a8ee4d2c4c8b';
    const url = `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

    this.setState({ isLoading: true, error: '' });

    axios
      .get(url)
      .then(response => {
        const { hits } = response.data;

        if (hits.length === 0) {
          this.setState({ error: "We don't have any photos for your request" });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            page: prevState.page + 1,
            totalHits: response.data.totalHits,
          }));
        }
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
    const { images, isLoading, error, showModal, modalImageURL, totalHits } =
      this.state;

    const shouldRenderLoadMoreButton = images.length < totalHits;

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
        {shouldRenderLoadMoreButton && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        {showModal && (
          <Modal
            largeImageURL={modalImageURL}
            onClose={this.handleCloseModal}
          />
        )}
        {error && <h1 className={css.error}>{error}</h1>}
      </div>
    );
  }
}
