import React, {useState, useEffect} from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

function App() {

  const[address,setAddress] = useState("")
  const[coordinates, setCoordinates] = useState({
    lat:null,
    lng:null
  })
  const [weather, setWeather] = useState(``)

  const handleSelect = async value => {
    const results = await geocodeByAddress(value)
    const ll = await getLatLng(results[0])
    setAddress(value)
    setCoordinates(ll)

  }

  useEffect(() => {
    setWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=ab7212b8b14ffcdc8e7f5145fd3ba663`)
  })

  return (
    <div className="app">

      <p>lat: {coordinates.lat}</p>
      <p>long: {coordinates.lng}</p>
      <p>address: {address}</p>
      <p>weather: {weather}</p>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div
          
          >
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}

export default App;
