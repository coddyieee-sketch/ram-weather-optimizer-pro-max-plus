import React, { useState, useEffect } from 'react';
import { FiSettings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [ramUsage, setRamUsage] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    axios.post('http://localhost:8000/optimize-ram', formData)
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
          <Link to="/" className="text-lg font-bold">ram-weather-optimizer-pro-max-plus</Link>
          <button onClick={handleDarkModeToggle} className="p-2 rounded-full hover:bg-slate-800">
            <FiSettings size={24} />
          </button>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Weather Data</h2>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded">
            <p>Temperature: {weatherData.temperature}</p>
            <p>Humidity: {weatherData.humidity}</p>
            <p>Wind Speed: {weatherData.windSpeed}</p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">RAM Usage</h2>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded">
            <p>Current RAM Usage: {ramUsage}%</p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-2">Optimize RAM</h2>
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-4 rounded">
            <label className="block mb-2">
              <span className="text-lg font-bold">Optimization Level:</span>
              <select name="optimizationLevel" className="block w-full p-2 rounded">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded">
              Optimize RAM
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;