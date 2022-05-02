import APIController from "./API_CTRL.js";
import UIController from "./UI_CTRL.js";
import CHARTController from "./CHART_CTRL.js";
import GEOController from "./GEO_CTRL.js";
import MUSICController from "./MUSIC_CTRL.js";

const APPController = ((UICtrl, APICtrl, CHARTCtrl, GEOCtrl, MUSICCtrl) => {
  const DOMInputs = UICtrl.inputField();

  const loadCategories = async () => {
    const token = await APICtrl.getToken();
    UICtrl.storeToken (token);
    UICtrl.resetCategory ();
    const categories = await APICtrl.getCategories (token, UICtrl.getCountryCode());
    console.log (categories);
    categories.forEach (element => {
      UICtrl.createCategory (element.name, element.id);
    });
  }

  const changeWindow = () => {
    if (DOMInputs.window[0].checked) //map
    {
      UICtrl.showBox (DOMInputs.selConuntryWin);
      UICtrl.showBox (DOMInputs.mapWin);
      UICtrl.hideBox (DOMInputs.songlistWin);
      UICtrl.hideBox (DOMInputs.songDetailWin);
    }
    else
    {
      loadCategories();
      UICtrl.hideBox (DOMInputs.selConuntryWin);
      UICtrl.hideBox (DOMInputs.mapWin);
      UICtrl.showBox (DOMInputs.songlistWin);
      UICtrl.showBox (DOMInputs.songDetailWin);
    }

    if (DOMInputs.window[1].checked) //playlist
      UICtrl.showBox (DOMInputs.categoryWin);
    else
      UICtrl.hideBox (DOMInputs.categoryWin);

    if (DOMInputs.window[2].checked) //search
      UICtrl.showBox (DOMInputs.searchWin);
    else
      UICtrl.hideBox (DOMInputs.searchWin);
    UICtrl.resetTrackDetail();
    UICtrl.resetTracks();
  }

  DOMInputs.category.addEventListener ('change', async () => {
    UICtrl.resetPlaylist();
    const token = UICtrl.getStoredToken().token;
    const selectCategory = UICtrl.inputField().category;
    const categoryId = selectCategory.options[selectCategory.selectedIndex].value;
    const playlist = await APICtrl.getCategoryPlaylist (token, categoryId);
    playlist.forEach(element => {
      UICtrl.createPlaylist(element.name, element.tracks.href);
    });
  });

  DOMInputs.selectCTRY.addEventListener ('change', async () => {
    const index = DOMInputs.selectCTRY.selectedIndex;
    if (index == 0)
    {
      GEOCtrl.init(DOMInputs.map, DOMInputs.lat, DOMInputs.lon);
      UICtrl.storeCountryCode('');
    }
    else
    {
      const newLatLon = GEOCtrl.getCountryLatLon (index - 1);
      GEOCtrl.storeCoords (newLatLon.lat, newLatLon.lon);
      GEOCtrl.showMap();
      UICtrl.storeCountryCode (DOMInputs.selectCTRY[index].value);
    }
    //console.log (DOMInputs.selectCTRY[DOMInputs.selectCTRY.selectedIndex].value);
    //console.log (GEOCtrl.getCountryLatLon(DOMInputs.selectCTRY.selectedIndex + 1));
  });

  DOMInputs.categoryBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    UICtrl.resetTracks();
    const token = UICtrl.getStoredToken().token;
    const playlistSelect = UICtrl.inputField().playlist;
    const tracksEndPoint = playlistSelect.options[playlistSelect.selectedIndex].value;
    const tracks = await APICtrl.getTracks (token, tracksEndPoint);
    tracks.forEach(element => {
      UICtrl.createTrack(element.track.href, `${element.track.name} - ${element.track.artists[0].name}`);
    });
  });

  DOMInputs.tracks.addEventListener('click', async (e) => {
    e.preventDefault();
    UICtrl.resetTrackDetail();
    const token = UICtrl.getStoredToken().token;
    const trackEndPoint = e.target.id;
    const track = await APICtrl.getTrack (token, trackEndPoint);
    const trackId = track.id;
    const audioFeatures = await APICtrl.getAudioFeature (token, trackId);
    const audioAnalysis = await APICtrl.getAudioAnalysis (token, trackId);
    const pitches = MUSICCtrl.getPitches (audioAnalysis.segments);
    UICtrl.createTrackDetail (
      track.album.images[2].url,
      track.name,
      track.artists[0].name,
      audioFeatures,
      MUSICCtrl.getKey(
        audioAnalysis.track.key,
        audioAnalysis.track.mode),
      audioAnalysis.track.tempo,
      pitches);
    console.log (pitches);
    CHARTCtrl.init();
    CHARTCtrl.drawPath (
      audioFeatures.danceability,
      audioFeatures.energy,
      audioFeatures.acousticness,
      audioFeatures.valence);
  });

  DOMInputs.searchBtn.addEventListener ('click', async (e) => {
    e.preventDefault();
    UICtrl.resetTracks();
    const token = UICtrl.getStoredToken().token;
    const queryText = DOMInputs.searchText.value;
    const result = await APICtrl.getSearchResult (token, queryText, "track,artist");
    result.tracks.items.forEach( element => {
      UICtrl.createTrack(element.href, `${element.name} - ${element.artists[0].name}`);
    });
  });
  
  DOMInputs.window.forEach((obj)=> {
    obj.addEventListener('click', changeWindow);
  });

  return {
    init() {
      console.log("start!");
      loadCategories();
      UICtrl.storeCountryCode('');
      changeWindow();
      GEOCtrl.init(DOMInputs.map, DOMInputs.lat, DOMInputs.lon);
    }
  }
})(UIController, APIController, CHARTController, GEOController, MUSICController);

APPController.init();