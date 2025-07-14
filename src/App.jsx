import "./App.css";
import Clear from "../src/assets/icons/clear.png";
import Cloud from "../src/assets/icons/clouds.png";
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
  const [weather, setWeather] = useState(null);

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
        setWeather(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.log("weather", weather);

  return (
    <div class="box">
      <div class="box-background">
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

              {/* Search Result */}
              <div style={{ width: "100%" }}>
                <img
                  src={Cloud}
                  alt="Cloud"
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
                  22<sup>°</sup>C
                </h1>
                <h1 style={{ color: "white" }}>New York</h1>

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
                    value={"50%"}
                  />
                  <CommonDesign
                    icon={Wind}
                    type={"Wind Speed"}
                    value={"15 km/h"}
                  />
                </div>
              </div>
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
