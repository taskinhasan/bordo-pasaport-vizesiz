
import { useState, useEffect } from 'react';

const WeatherWidget = ({ lat, lng, city }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!lat || !lng) {
            setLoading(false);
            return;
        }

        const fetchWeather = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
                const data = await res.json();
                setWeather(data.current_weather);
            } catch (error) {
                console.error("Weather fetch failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [lat, lng]);

    if (loading) return <div className="text-xs text-gray-500 animate-pulse">Hava durumu yükleniyor...</div>;
    if (!weather) return null;

    // Simple code map
    const getWeatherIcon = (code) => {
        if (code === 0) return "☀️";
        if (code <= 3) return "⛅";
        if (code <= 48) return "🌫️";
        if (code <= 67) return "🌧️";
        if (code <= 77) return "❄️";
        return "⛈️";
    };

    return (
        <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/50 flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
                <span className="text-2xl">{getWeatherIcon(weather.weathercode)}</span>
                <div>
                    <h4 className="text-sm font-semibold text-gray-300">{city}</h4>
                    <p className="text-xs text-gray-500">Şu an</p>
                </div>
            </div>
            <div className="text-xl font-bold text-white">
                {weather.temperature}°C
            </div>
        </div>
    );
};

export default WeatherWidget;
