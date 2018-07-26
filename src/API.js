const CLIENT_ID = '4d44d068e4d23cc69cb09f081d40e3b6ec4929cbdaeb40cc88074d293d342e24';
const API_URL = `https://api.unsplash.com//search/photos/?client_id=${CLIENT_ID}&per_page=16&query=`;

export default {
  search(searchTerm) {
    const url = `${API_URL}${searchTerm}`;
    return fetch(url)
      .then(response => response.json())
      .then(response => response.results);
  }
};
