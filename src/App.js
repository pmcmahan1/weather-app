import React, { useState, useEffect } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { DateTime } from "luxon";

function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;
  const timeUrl = ` https://maps.googleapis.com/maps/api/timezone/json?location=${
    coordinates.lat
  }%2C${coordinates.lng}&timestamp=${Math.round(
    new Date().getTime() / 1000
  ).toString()}&key=${process.env.REACT_APP_API_TZ_KEY}`;

  const [data, setData] = useState("");
  const [timeData, setTimeData] = useState("");
  const [nightTime, setNightTime] = useState(false)
  const bogus = DateTime.local().setZone(timeData.timeZoneId).toFormat("hh:mm a");
  const bogusInfo = DateTime.local().setZone(timeData.timeZoneId)


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
      axios.get(timeUrl).then((response) => {
        setTimeData(response.data);
      });
    } else {
      return;
    }
  }, [coordinates]);

  useEffect(() => {
    if (bogusInfo?.hour > 7 && bogusInfo.hour < 17) {
      setNightTime(false)
    } else {
      setNightTime(true)
    }
  }, [bogusInfo])



  return (
    <div className="app">
      <p>lat: {coordinates.lat}</p>
      <p>long: {coordinates.lng}</p>
      <p>city: {data.name}</p>
      {data.main ? <p>temp: {data.main.temp}°F</p> : <p>temp: </p>}
      {data.main ? (
        <p>feels like: {data.main.feels_like}°F</p>
      ) : (
        <p>feels like: </p>
      )}
      {data.weather ? (
        <p>condition: {data.weather[0].main}</p>
      ) : (
        <p>condition: </p>
      )}
      {data.main ? <p>humidity: {data.main.humidity}%</p> : <p>humidity: </p>}
      {data.wind ? <p>wind: {data.wind.speed}mph</p> : <p>wind: </p>}
      {data.main ? <p>local time: {bogus}</p> : <p>local time: </p>}
      {nightTime === true ? <p>Night time</p> : <p>Day time</p>}

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
