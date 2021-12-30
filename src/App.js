import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util";

import "./App.css";

function App() {
  const [countries, setCountries] = useState(["USA", "UK", "India"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([])
  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data =>{
      setCountryInfo(data);
    })
  }, [])



  //STATE = How to write a variable in REACT<<

  //UseEffect = Runs a piece of code based on a given condition
  useEffect(() => {
    //async -> send request, await for it, do something with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, //United States, United Kingdom, etc
            value: country.countryInfo.iso2, //UK, USA, FR
          }));

          const sortedData =sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("COUNTRY CODE IS >>>", countryCode);
    setCountry(countryCode);
     

    const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode); //All the data
      setCountryInfo(data); //All the data from the country response
    })
    //Worldwide stats https://disease.sh/v3/covid-19/all
    //countries states https://disease.sh/v3/covid-19/countries
  };
  console.log("COUNTRY INFO >>>", countryInfo)
  
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* Loop through all the countries 
        and show dropdown list of countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Canada</MenuItem>
          <MenuItem value="worldwide">United States</MenuItem>
          <MenuItem value="worldwide">Ukraine</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app_status">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />
      </div>
      <div>
      <Card className="app_right">
        <CardContent>
       

        <h3>Live Cases by Cuntry</h3>
        <Table countries={tableData} />
        <h3>Wordlwide New cases</h3>
        <LineGraph/>
        </CardContent>

      </Card>
      </div>
    </div>
  );
}

export default App;