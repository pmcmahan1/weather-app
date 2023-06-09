import React, { useState, useEffect } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { DateTime } from "luxon";
import Hourly from "./Hourly";
import Daily from "./Daily";
import darkBg from "./dark-bg.jpg";
import lightBg from "./light-bg.jpg";
import "./App.scss";

function App() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${process.env.REACT_APP_API_KEY}&units=imperial`;

  const [data, setData] = useState("");
  const [nightTime, setNightTime] = useState(false);
  const localTime = DateTime.local().setZone(data.timezone).toFormat("h:mm a");
  const localTimeInfo = DateTime.local().setZone(data.timezone);

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

  console.log(localTimeInfo.hour);

  useEffect(() => {
    if (localTimeInfo.hour >= 8 && localTimeInfo.hour <= 19) {
      setNightTime(false);
    } else {
      setNightTime(true);
    }
  }, [localTimeInfo.hour]);

  return (
    <div
      className="app"
      style={
        nightTime === true
          ? { backgroundImage: `url(${darkBg})` }
          : { backgroundImage: `url(${lightBg})` }
      }
    >
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search">
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

                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
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
      <div className="loc-container">
        <div className="loc-item">
          <div className="loc-text">
            {data.current ? address : "…"}
          </div>
        </div>
        <div className="loc-item">
          <div>
            {data.current ? <div>{localTime}</div> : <div>0:00</div>}
          </div>
        </div>
      </div>
      <div className="main-container">
      <div className="temp-container">
        <div>{data.current ? Math.round(data.current.temp) + "°" : "0°"}</div>
      </div>
      <div className="feels-container">
        <div>
          {data.current
            ? "Feels Like: " + Math.round(data.current.feels_like) + "°"
            : "Feels Like: "}
        </div>
      </div>
      <div className="feels-container">
        <div>{data.current ? data.current.weather[0].main : "Condition"}</div>
      </div>
      <div className="feels-container">
        <div>
          {data.current
            ? `H: ${Math.round(data.daily[0].temp.max)}° L: ${Math.round(
                data.daily[0].temp.min
              )}°`
            : "H: ° L: °"}
        </div>
      </div>
      </div>
      <div className="sun-container">
        <div className="sun-item">
          {data.current
            ? `Sunrise: ${DateTime.fromSeconds(data.current.sunrise).setZone(data.timezone).toFormat(
                "h:mm a"
              )}`
            : "Sunrise: "}
        </div>
        <div className="sun-item">
          {data.current
            ? `Sunset: ${DateTime.fromSeconds(data.current.sunset).setZone(data.timezone).toFormat(
                "h:mm a"
              )}`
            : "Sunset: "}
        </div>
      </div>
      <div className="sun-container">
        <div className="sun-item">
          {data.current ? `Humidity: ${data.current.humidity}%` : "Humidity: "}
        </div>
        <div className="sun-item">
          {data.current ? `Wind: ${data.current.wind_speed} mph` : "Wind: "}
        </div>
      </div>
      <div className="title title-top">Hourly Forecast</div>
      <Hourly data={data} />
      <div className="title"> Daily Forecast</div>
      <Daily data={data} />
    </div>
  );
}

export default App;

{
  /* 

              {`${address.substring(0, 25)}${address.length > 25 ? "…" : "…"}`}
      <p>lat: {coordinates.lat}</p>
      <p>long: {coordinates.lng}</p>
      <p>address: {address}</p>
      {data.current ? (
        <p>temp: {Math.round(data.current.temp)}°</p>
      ) : (
        <p>temp: </p>
      )}
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
      {data.current ? (
        <p>humidity: {data.current.humidity}%</p>
      ) : (
        <p>humidity: </p>
      )}
      {data.current ? <p>wind: {data.current.wind_speed}mph</p> : <p>wind: </p>}
      {data.current ? <p>local time: {localTime}</p> : <p>local time: </p>}
      {nightTime === true ? <p>Night time</p> : <p>Day time</p>}
      {data.current ? (
        <p>
          min: {Math.round(data.daily[0].temp.min)}° max:{" "}
          {Math.round(data.daily[0].temp.max)}°{" "}
        </p>
      ) : (
        <p>min: max: </p>
      )}
      {data.current ? (
        <p>
          sunrise:{" "}
          {DateTime.fromSeconds(data.current.sunrise).toFormat("h:mm a")}
        </p>
      ) : (
        <p>sunrise: </p>
      )}
      {data.current ? (
        <p>
          sunset: {DateTime.fromSeconds(data.current.sunset).toFormat("h:mm a")}
        </p>
      ) : (
        <p>sunset: </p>
      )}
      <Hourly data={data} />
      <Daily data={data} />     */
}
