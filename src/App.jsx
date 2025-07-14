import "./App.css";
import Clear from "../src/assets/icons/clear.png";
import Clouds from "../src/assets/icons/clouds.png";
import Drizzle from "../src/assets/icons/drizzle.png";
import Mist from "../src/assets/icons/mist.png";
import Rain from "../src/assets/icons/rain.png";
import Snow from "../src/assets/icons/snow.png";
import Wind from "../src/assets/icons/wind.png";
import Humidity from "../src/assets/icons/humidity.png";
import Search from "../src/assets/icons/search.png";
import react, { useState } from "react";

function App() {
  const [countryName, setCountryName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSearch = () => {
    if (!countryName) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsError(false);
        if (data?.cod === "404") {
          setIsError(true);
        } else {
          setWeatherData(data);
        }
        setCountryName("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCountryName("");
        setIsLoading(false);
      });
  };

  return (
    <div className="box">
      <div className="box-background">
        <div
          style={{
            ...displayFlex,
            justifyContent: "center",
            height: "100%",
          }}
        >
          {/* Main Content Box */}
          <div
            style={{
              height: "600px",
              width: "500px",
              border: "1px solid white",
              borderRadius: "5px",
              padding: "40px",
            }}
          >
            <div
              style={{
                height: "100%",
                textAlign: "center",
                ...displayFlex,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {isLoading && (
                <div
                  className="loader"
                  style={{ height: "100%", ...displayFlex }}
                ></div>
              )}

              {!isLoading && (
                <>
                  {/* input and search button */}
                  <div
                    style={{
                      ...displayFlex,
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <input
                      type="text"
                      className="custom-input"
                      placeholder="Enter city name"
                      onChange={handleChange}
                      value={countryName}
                    />
                    <div
                      style={{
                        backgroundColor: "white",
                        height: "40px",
                        width: "40px",
                        borderRadius: "50%",
                        ...displayFlex,
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleSearch}
                    >
                      <img
                        src={Search}
                        alt="Search"
                        style={{
                          height: "20px",
                          width: "20px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>

                  {isError && (
                    <div style={{ height: "100%", ...displayFlex }}>
                      <h3 style={{ color: "red" }}>No City Found.</h3>
                    </div>
                  )}

                  {/* Search Result */}
                  {weatherData && !isError && (
                    <div style={{ width: "100%" }}>
                      <img
                        src={
                          weatherData?.weather?.[0]?.main === "Clouds"
                            ? Clouds
                            : weatherData?.weather?.[0]?.main === "Rain"
                            ? Rain
                            : weatherData?.weather?.[0]?.main === "Mist"
                            ? Mist
                            : weatherData?.weather?.[0]?.main === "Clear"
                            ? Clear
                            : weatherData?.weather?.[0]?.main === "Snow"
                            ? Snow
                            : Drizzle
                        }
                        alt={weatherData?.weather?.[0]?.main}
                        style={{
                          height: "150px",
                          width: "150px",
                          objectFit: "contain",
                        }}
                      />
                      <h1
                        style={{
                          color: "white",
                          fontSize: "60px",
                          marginTop: "-10px",
                        }}
                      >
                        {Math.round(weatherData?.main?.temp)}
                        <sup>°</sup>C
                      </h1>
                      <h1 style={{ color: "white" }}>{weatherData?.name}</h1>

                      <div
                        style={{
                          ...displayFlex,
                          justifyContent: "space-between",
                          marginTop: "100px",
                        }}
                      >
                        <CommonDesign
                          icon={Humidity}
                          type={"Humidity"}
                          value={weatherData?.main?.humidity}
                        />
                        <CommonDesign
                          icon={Wind}
                          type={"Wind Speed"}
                          value={`${weatherData?.wind?.speed} km/h`}
                        />
                      </div>
                    </div>
                  )}

                  {!weatherData && !isError && (
                    <div
                      style={{
                        height: "100%",
                        ...displayFlex,
                      }}
                    >
                      <h3 style={{ color: "white" }}>
                        Search with a city to see weather Result.
                      </h3>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
const CommonDesign = ({ icon, type, value }) => {
  return (
    <div style={{ ...displayFlex, gap: "10px" }}>
      <img
        src={icon}
        alt={type}
        style={{ height: "50px", width: "50px", objectFit: "contain" }}
      />
      <div>
        <h1 style={{ color: "white" }}>{value}</h1>
        <h3 style={{ color: "white" }}>{type}</h3>
      </div>
    </div>
  );
};

const displayFlex = {
  display: "flex",
  alignItems: "center",
};

export default App;
