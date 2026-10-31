import React, { useState, useEffect } from 'react';
import { FiSettings } from 'lucide-react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [ramUsage, setRamUsage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/weather-data')
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    axios.get('http://localhost:8000/ram-usage')
      .then(response => {
        setRamUsage(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post('http://localhost:8000/submit-form', formData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className={`h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <header className="bg-white/10 backdrop-blur-md py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">ram-weather-optimizer-pro-max-plus</h1>
          <button onClick={handleToggleDarkMode} className="p-2 rounded-full hover:bg-slate-800">
            <FiSettings size={24} />
          </button>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <h2 className="text-lg font-bold">Weather Data</h2>
            <ul>
              {Object.keys(weatherData).map((key, index) => (
                <li key={index}>{key}: {weatherData[key]}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <h2 className="text-lg font-bold">RAM Usage</h2>
            <p>{ramUsage}%</p>
            <progress className="w-full" value={ramUsage} max="100" />
          </div>
        </section>
        <section className="mt-4">
          <h2 className="text-lg font-bold">Submit Form</h2>
          <form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input type="text" name="name" className="block w-full p-2 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input type="email" name="email" className="block w-full p-2 rounded-lg" />
              </div>
            </div>
            <button type="submit" className="p-2 rounded-full hover:bg-slate-800">
              Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;