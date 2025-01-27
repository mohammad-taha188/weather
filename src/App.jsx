import { useEffect, useState } from "react";
import styleApp from "./App.module.css";
import axios from "axios";
import { images } from "./router";

function App() {
  let [value, setValue] = useState();
  let [data, setData] = useState();
  let [isError, setIsError] = useState();

  function testStations(stations) {
    switch (stations) {
      case "Clouds":
      case "Drizzle":
        return images.cloud;
      case "Clear":
        return images.sun;
      case "Rain":
        return images.rain;
      case "Thunderstorm":
        return images.storm;
      case "Snow":
        return images.snow;
      case "Mist":
        return images.fog;
      case "Tornado":
        return images.tornado;
    }
  }
  return (
    <>
      <div className={styleApp.container}>
        <h1>Weather</h1>
        <input
          type="text"
          placeholder="city or country name..."
          className={styleApp.inputName}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          className={styleApp.btnName}
          onClick={async () => {
            await axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  value ? value : "usa"
                }&appid=1308934394f18a7ac84141670b5663f7`
              )
              .then((res) => setData(res.data), setIsError(false))
              .catch((error) => setIsError(error));
          }}
        >
          OK
        </button>
        {!isError ? (
          <>
            <div className={styleApp.nameBox}>
              <h2>{data?.name}</h2>
            </div>
            <div className={styleApp.info}>
              <img
                src={testStations(data?.weather[0]?.main)}
                alt=""
                style={{ width: "70px" }}
              />
              <h2>
                temp :
                {data?.main?.temp && Math.floor(data?.main?.temp - 273.15)}
              </h2>

              <h2>stations : {data?.weather[0]?.main} </h2>

              <h2>wind speed : {data?.wind?.speed}</h2>
            </div>
          </>
        ) : (
          <>
            <h2>{isError?.status}</h2>
            <h2>{isError?.message}</h2>
          </>
        )}
      </div>
    </>
  );
}

export default App;
