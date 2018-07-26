import React, { Component } from 'react';
import API from './API';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Unsplash Image Search',
      searchTerm: '',
      loading: false,
      images: []
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
      this.setState({
        images,
        loading: false
      });
    });

    this.setState({
      searchTerm: ''
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
              <img
                alt={image.urls.small}
                src={image.urls.small}
                key={image.id}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;
