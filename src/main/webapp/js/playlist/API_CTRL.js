const APIController = (() => {
  
  const clientId = '4f7a142e45fb44a395780ab7e665dac3';
  const clientSecret = '4ef8b98acfdc410bad4ba1dcf81a4d9a';
  const baseURL = 'https://api.spotify.com/v1';

  const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(clientId + ":" + clientSecret)
      },
      body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
  }

  const _getCategories = async (token, country) => {
    console.log(country);
    const result = await fetch(`${baseURL}/browse/categories` + (country?`?country=${country}`:''), {
      method: 'GET',
      headers: { 
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    });
    const data = await result.json();
    console.log(data);
    return data.categories.items;
  }

  const _getCategoryPlaylist = async (token, category_id) => {
    const result = await fetch(`${baseURL}/browse/categories/${category_id}/playlists`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data.playlists.items;
  }

  const _getTracks = async (token, tracksEndPoint) => {
    const result = await fetch(`${tracksEndPoint}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data.items;
  }

  const _getTrack = async (token, trackEndPoint) => {
    const result = await fetch (`${trackEndPoint}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data;
  }

  const _getAudioFeature = async (token, trackId) => {
    const result = await fetch (`${baseURL}/audio-features/${trackId}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data;
  }

  const _getAudioAnalysis = async (token, trackId) => {
    const result = await fetch (`${baseURL}/audio-analysis/${trackId}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    });

    const data = await result.json();
    console.log(data);
    return data;
  }

  const _getSearchResult = async (token, q, type) => {
    const result = await fetch (`${baseURL}/search?q=${q}&type=${type}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token }
    });

    const data = await result.json();
    console.log (data);
    return data;
  }

  return {
    getToken() {
      return _getToken();
    },
    getCategories (token, country) {
      return _getCategories (token, country);
    },
    getCategoryPlaylist (token, category_id) {
      return _getCategoryPlaylist(token, category_id);
    },
    getTracks (token, tracksEndPoint) {
      return _getTracks (token, tracksEndPoint);
    },
    getTrack (token, trackEndPoint) {
      return _getTrack (token, trackEndPoint);
    },
    getAudioFeature (token, trackId) {
      return _getAudioFeature(token, trackId);
    },
    getAudioAnalysis (token, trackId) {
      return _getAudioAnalysis(token, trackId);
    },
    getSearchResult (token, q, type) {
      return _getSearchResult(token, q, type);
    }
  }
})();

export default APIController;