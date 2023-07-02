import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const StDiv = styled.div`
  margin-top: 40px;
  background-image: linear-gradient(315deg, #5c44e0 0%, #88d3ce 74%);
  /* background-color: white; */
  color: white;
  height: 100px;
  width: 190px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: fixed;
`;

function Weather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 위치 정보 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError("Unable to retrieve your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  useEffect(() => {
    // 날씨 데이터 가져오기
    if (latitude && longitude) {
      const API_KEY = "250243a1dc886fa76b3c05c5c2aa19f1";
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
        })
        .catch((error) => {
          setError("Unable to fetch weather data");
        });
    }
  }, [latitude, longitude]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!latitude || !longitude || !weatherData) {
    return <div>Loading...</div>;
  }

  const { name } = weatherData;
  const { temp, humidity } = weatherData.main;
  const { description } = weatherData.weather[0];

  return (
    <StDiv>
      <p
        style={{
          fontSize: "40px",
          position: "absolute",
          top: "5px",
        }}
      >
        {Math.ceil(temp - 273.15)}°C
      </p>
      <p style={{ position: "absolute", top: "55px" }}>{name}</p>
      <p style={{ position: "absolute", bottom: "10px", left: "20px" }}>
        {humidity}%
      </p>
      <p
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
      >
        {description}
      </p>
    </StDiv>
  );
}

export default Weather;
