const GEOController = (() => {
  let lat, lon, mapFrame;

  const country_lat = [37, 36, 35, 63, -26];
  const country_lon = [127, -95, 134, -95, 143];

  const _showMap = () => {
    mapFrame.src = getURL(
      lat.value - 20,
      parseInt(lat.value) + 20,
      lon.value - 20,
      parseInt(lon.value) + 20);
    console.log(mapFrame.src);
  }

  const getCoords = (position) => {
    lat.value = position.coords.latitude;
    lon.value = position.coords.longitude;
    _showMap (lat.value, lon.value);
  }

  const getURL = (lat1, lat2, lon1, lon2) => {
    const baseURL = "https://www.openstreetmap.org/export";
    return `${baseURL}/embed.html?bbox=${lon1}%2C${lat1}%2C${lon2}%2C${lat2}`;
  }

  return {
    init (map, lat_input, lon_input) {
      mapFrame = map;
      lat = lat_input;
      lon = lon_input;
      if (navigator.geolocation) {
        console.log ("geolocation starting...");
        navigator.geolocation.getCurrentPosition (getCoords);
      }
      else {
        console.log ("geolocation doesn't work!");
        lat = 37;
        lon = 126;
      }
    },
    storeCoords (new_lat, new_lon) {
      lat.value = new_lat;
      lon.value = new_lon;
    },
    showMap () {
      _showMap();  
    },
    getCountryLatLon (index) {
      return {
        lat : country_lat[index],
        lon : country_lon[index]
      }
    }
  }
})();

export default GEOController;