import React, { useState, useEffect } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { DateTime } from "luxon";
import HourlyTime from "./HourlyTime";
import Daily from "./Daily";


function App() {

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;


  const [data, setData] = useState("");
  const [nightTime, setNightTime] = useState(false)
  const localTime = DateTime.local().setZone(data.timezone).toFormat("h:mm a");
  const localTimeInfo = DateTime.local().setZone(data.timezone)

console.log(data)

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(ll);
  };

  useEffect(() => {
    if (coordinates.lat) {
      axios.get(url).then((response) => {
        setData(response.data);
      });
    } else {
      return;
    }
  }, [coordinates]);

  useEffect(() => {
    if (localTimeInfo.hour >= 8 && localTimeInfo.hour <= 19) {
      setNightTime(false)
    } else {
      setNightTime(true)
    }
  }, [localTimeInfo.hour])


  return (
    <div className="app">
      <HourlyTime data={data} />
      <Daily data={data} />
      <p>lat: {coordinates.lat}</p>
      <p>long: {coordinates.lng}</p>
      <p>address: {address}</p>
      {data.current ? <p>temp: {Math.round(data.current.temp)}°</p> : <p>temp: </p>}
      {data.current ? (
        <p>feels like: {Math.round(data.current.feels_like)}°</p>
      ) : (
        <p>feels like: </p>
      )}
      {data.current ? (
        <p>condition: {data.current.weather[0].main}</p>
      ) : (
        <p>condition: </p>
      )}
      {data.current ? <p>humidity: {data.current.humidity}%</p> : <p>humidity: </p>}
      {data.current ? <p>wind: {data.current.wind_speed}mph</p> : <p>wind: </p>}
      {data.current ? <p>local time: {localTime}</p> : <p>local time: </p>}
      {nightTime === true ? <p>Night time</p> : <p>Day time</p>}
      {data.current ? <p>min: {Math.round(data.daily[0].temp.min)}° max: {Math.round(data.daily[0].temp.max)}° </p> : <p>min: max: </p>}



      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter Location ...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
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
