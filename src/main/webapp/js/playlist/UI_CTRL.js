const UIController = (function() {

  const DOMElements = {
    selectWindow: 'select-window',
    selectCategory: 'select-category',
    selectPlaylist: 'select-playlist',
    categoryButton: 'category-btn',
    searchButton: 'search-btn',
    divSongDetail: 'song-detail',
    accessToken: 'access_token',
    countryCode: 'country_code',
    selectCountry: 'select-country',
    mapFrame: 'map',
    latInput: 'lat',
    lonInput: 'lon',
    divSonglist: 'song-list',
    searchField: 'search-text',
    selectCountryWindow: 'country-select-window',
    mapWindow: 'map-window',
    categoryWindow: 'category-window',
    searchWindow: 'search-window',
    songlistWindow: 'song-list-window',
    songDetailWindow: 'song-detail-window'
  }

  return {
    inputField() {
      return {
        window: document.getElementsByName (DOMElements.selectWindow),
        category: document.getElementById (DOMElements.selectCategory),
        playlist: document.getElementById (DOMElements.selectPlaylist),
        tracks: document.getElementById (DOMElements.divSonglist),
        categoryBtn: document.getElementById (DOMElements.categoryButton),
        searchBtn: document.getElementById (DOMElements.searchButton),
        songDetail: document.getElementById (DOMElements.divSongDetail),
        map: document.getElementById (DOMElements.mapFrame),
        lat: document.getElementById (DOMElements.latInput),
        lon: document.getElementById (DOMElements.lonInput),
        selectCTRY: document.getElementById (DOMElements.selectCountry),
        searchText: document.getElementById (DOMElements.searchField),
        selConuntryWin: document.getElementById (DOMElements.selectCountryWindow),
        mapWin: document.getElementById (DOMElements.mapWindow),
        categoryWin: document.getElementById (DOMElements.categoryWindow),
        searchWin: document.getElementById (DOMElements.searchWindow),
        songlistWin: document.getElementById (DOMElements.songlistWindow),
        songDetailWin: document.getElementById (DOMElements.songDetailWindow)
      }
    },

    createCategory(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.getElementById(DOMElements.selectCategory).insertAdjacentHTML('beforeend', html);
    }, 

    createPlaylist (text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.getElementById(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
    },
    
    createTrack (id, name) {
      const html = `<a href="#" id="${id}" class="track-name">${name}</a><br>`;
      document.getElementById(DOMElements.divSonglist).insertAdjacentHTML ('beforeend', html);
    },

    createTrackTitle (title) {
      const html = `<a id="track-title">${title}</a><br>`;
      document.getElementById(DOMElements.divSonglist).insertAdjacentHTML ('beforeend', html);
    },

    createTrackDetail (img, title, artist, audioFeatures, key, tempo) {

      const detailDiv = document.getElementById(DOMElements.divSongDetail);
      detailDiv.innerHTML = '';

      const html = 
      `
      <div>
        <img id="song-cover" src="${img}" alt="">        
      </div>
      <div>
        <span id="song-detail-title">${title}</span>
      </div>
      <div>
        <span id="song-detail-artist">By ${artist}</span>
      </div><br>
      <div>
        <span id="song-detail-prop">danceability : ${audioFeatures.danceability}</span>
      </div>
      <div>
        <span id="song-detail-prop">energy : ${audioFeatures.energy}</span>
      </div>
      <div>
        <span id="song-detail-prop">acousticness : ${audioFeatures.acousticness}</span>
      </div>
      <div>
        <span id="song-detail-prop">valence : ${audioFeatures.valence}</span>
      </div>
      <div>
        <span id="song-detail-prop">key : ${key}</span>
      </div>
      <div>
        <span id="song-detail-prop">tempo : ${tempo} bpm</span>
      </div>
      <canvas height="300px" weight="300px" id="chart-canvas">
      </canvas>
      `;

      detailDiv.insertAdjacentHTML('beforeend', html)
    },

    resetCategory () {
      this.inputField().category.innerHTML = '<option>Select</option>';
    },

    resetTrackDetail() {
      this.inputField().songDetail.innerHTML = '';
    },

    resetTracks() {
      this.inputField().tracks.innerHTML = '';
      this.resetTrackDetail();
    },

    resetPlaylist () {
      this.inputField().playlist.innerHTML = '<option>Select</option>';
      this.resetTracks();
    },
    
    hideBox (obj) {
      obj.style.display = "none";
    },

    showBox (obj) {
      obj.style.display = "block";
    },

    storeCountryCode (value) {
      document.getElementById (DOMElements.countryCode).value = value;
    },

    getCountryCode () {
      return document.getElementById (DOMElements.countryCode).value;
    },

    storeToken (value) {
      document.getElementById (DOMElements.accessToken).value = value;
    },

    getStoredToken() {
      return {
        token: document.getElementById(DOMElements.accessToken).value
      }
    }
  }

})();

export default UIController;