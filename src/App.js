
import React, {useState, useEffect} from 'react';
import {MenuItem,FormControl,Select} from "@material-ui/core";
import InfoBox from './InfoBox';
import './App.css';

function App() {
  const [countries, setCountries] = useState(['USA', 'UK','India']);
  const [country, setCountry] = useState('worldwide');

  //STATE = How to write a variable in REACT<<

  //UseEffect = Runs a piece of code based on a given condition
  useEffect(()=>{
    //async -> send request, await for it, do something with it
    const getCountriesData = async () =>{
      await fetch ('https://disease.sh/v3/covid-19/countries')
      .then((response)=> response.json())
      .then((data)=>{ 
         const countries = data.map((country)=> (
          {
            name: country.country, //United States, United Kingdom, etc
            value: country.countryInfo.iso2, //UK, USA, FR
          }));
          setCountries(countries);
      })
    }
    getCountriesData();
  }, []);

  const onCountryChange = (event) =>{
    const countryCode = event.target.value;
    console.log('COUNTRY CODE IS >>>', countryCode);
    setCountry (countryCode);
  }
   
  return (
    <div className="app"> 
    <div className="app_header">
    <h1>COVID 19 TRACKER</h1>
    <FormControl className="app__dropdown">
      <Select variant="outlined" onChange={onCountryChange} value={country} >
        {/* Loop through all the countries 
        and show dropdown list of countries */}
        <MenuItem value="worldwide">Worldwide</MenuItem>
        {countries.map((country) =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
         
          {/* <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Canada</MenuItem>
          <MenuItem value="worldwide">United States</MenuItem>
          <MenuItem value="worldwide">Ukraine</MenuItem> */}
      </Select>
    </FormControl>
    </div>

   <div className = "app_status">
     <InfoBox title="Coronavirus cases" cases={123} total={2000} />
     <InfoBox title="Recovered"cases={1234}  total={3000}/>
     <InfoBox title="Deaths" cases={12345} total={4000}/>
      
      </div>  
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
