const UIController = (function() {

  const DOMElements = {
    selectWindow: 'select-window',
    selectCategory: 'select-category',
    selectPlaylist: 'select-playlist',
    categoryButton: 'category-btn',
    searchButton: 'search-btn',
    divSongDetail: 'song-detail',
    accessToken: 'access_token',
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

    createPlaylist(text, value) {
      const html = `<option value="${value}">${text}</option>`;
      document.getElementById(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
    },
    
    createTrack(id, name) {
      const html = `<a href="#" id="${id}">${name}</a><br>`;
      document.getElementById(DOMElements.divSonglist).insertAdjacentHTML('beforeend', html);
    },

    createTrackDetail(img, title, artist, audioFeatures, audioAnalysis) {

      const detailDiv = document.getElementById(DOMElements.divSongDetail);
      detailDiv.innerHTML = '';

      const html = 
      `
      <div>
        <img src="${img}" alt="">        
      </div>
      <div>
        <span>${title}</span>
      </div>
      <div>
        <span>By ${artist}</span>
      </div> 
      <div>
        <span>danceability : ${audioFeatures.danceability}</span>
      </div>
      <div>
        <span>energy : ${audioFeatures.energy}</span>
      </div>
      <div>
        <span>acousticness : ${audioFeatures.acousticness}</span>
      </div>
      <div>
        <span>valence : ${audioFeatures.valence}</span>
      </div>
      <canvas height="300px" weight="300px" id="chart-canvas">
      </canvas>
      `;

      detailDiv.insertAdjacentHTML('beforeend', html)
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

    storeToken(value) {
      document.getElementById(DOMElements.accessToken).value = value;
    },

    getStoredToken() {
      return {
        token: document.getElementById(DOMElements.accessToken).value
      }
    }
  }

})();

export default UIController;