import React, { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="overlay" onClick={this.props.onClose}>
        <div className="modal">
          <img src={this.props.largeImageURL} alt="img" />
        </div>
      </div>
    );
  }
}
