import React, { Component } from 'react';
import API from './API';
import Modal from './Modal';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Unsplash Image Search',
      searchTerm: '',
      loading: false,
      images: [],
      showModal: false,
      currentImageSrc: ''
    };
  }

  searchTermChanged = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  formSubmitted = e => {
    e.preventDefault();

    this.setState({
      loading: true,
      images: []
    });

    API.search(this.state.searchTerm).then(images => {
      console.log(images);
      this.setState({
        images,
        loading: false
      });
    });

    this.setState({
      searchTerm: ''
    });
  };

  handleClick = e => {
    this.setState({
      showModal: true,
      currentImageSrc: e.currentTarget.src
    });
  };

  render() {
    const { title, searchTerm, images } = this.state;
    return (
      <div>
        <h1>
          🍦<span>{title}</span>
        </h1>
        <form onSubmit={this.formSubmitted}>
          <label htmlFor="searchTerm">Search Term</label>
          <input
            className="u-full-width"
            type="text"
            value={searchTerm}
            name="searchTerm"
            onChange={this.searchTermChanged}
          />
          <button type="submit">Search</button>
        </form>
        {this.state.loading ? (
          <img alt="Loading" src="https://i.imgur.com/LVHmLnb.gif" />
        ) : (
          ''
        )}
        <section className="images">
          {images.map(image => {
            return (
              <React.Fragment key={image.id}>
                <img
                  alt={image.urls.regular}
                  src={image.urls.regular}
                  onClick={this.handleClick}
                />
                {this.state.showModal && (
                  <Modal>
                    <div className="modal-top">
                      <a
                        href={this.state.currentImageSrc}
                        download
                        target="_blank"
                      >
                        Download Image
                      </a>
                      <span onClick={() => this.setState({ showModal: false })}>
                        x
                      </span>
                    </div>
                    <img src={this.state.currentImageSrc} />
                  </Modal>
                )}
              </React.Fragment>
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
