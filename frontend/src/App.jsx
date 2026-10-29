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
    fetchWeatherData();
    fetchRamUsage();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/weather');
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRamUsage = async () => {
    try {
      const response = await axios.get('http://localhost:8000/ram-usage');
      setRamUsage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <header className="bg-white/10 backdrop-blur-md py-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">ram-weather-optimizer-pro-max-plus</h1>
          <button
            className="p-2 rounded-full hover:bg-slate-700"
            onClick={handleDarkModeToggle}
          >
            <FiSettings size={24} />
          </button>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <h2 className="text-lg font-bold">Weather Data</h2>
            <ul>
              {Object.keys(weatherData).map((key) => (
                <li key={key}>
                  <span className="text-gray-500">{key}:</span>{' '}
                  <span className="text-gray-900">{weatherData[key]}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg">
            <h2 className="text-lg font-bold">RAM Usage</h2>
            <p className="text-gray-900">{ramUsage} MB</p>
            <progress
              className="w-full h-2 bg-gray-200 rounded-full"
              value={ramUsage}
              max={1024}
            />
          </div>
        </section>
        <section className="mt-4">
          <h2 className="text-lg font-bold">System Logs</h2>
          <ul>
            {/* System logs will be displayed here */}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;