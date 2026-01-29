import WeatherWidget from './WeatherWidget';
import CurrencyConverter from './CurrencyConverter';

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
    if (!country) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-sm h-64 flex flex-col items-center justify-center text-center animate-pulse">
                <p className="text-gray-400">Haritadan bir ülke seçin...</p>
            </div>
        );
    }

    const flightQuery = `Istanbul to ${country.capital} flights`;
    const flightUrl = `https://www.google.com/travel/flights?q=${encodeURIComponent(flightQuery)}`;

    return (
        <div className="bg-gray-900 border border-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl w-full relative group">
            <button
                onClick={onToggleFavorite}
                className="absolute top-4 right-16 text-2xl hover:scale-110 transition-transform bg-gray-900/50 rounded-full p-1 border border-gray-700 hover:border-red-500/50"
                title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>
            <h2 className="text-3xl font-bold mb-2 text-blue-400 pr-8">{country.name}</h2>
            <div className="space-y-2 mb-6">
                <p className="text-gray-300"><span className="font-semibold text-gray-400">Başkent:</span> {country.capital}</p>
                {country.currency && (
                    <p className="text-gray-300"><span className="font-semibold text-gray-400">Para Birimi:</span> {country.currency}</p>
                )}
                <p className="text-sm text-green-400 bg-green-900/30 px-2 py-1 rounded inline-block">
                    {country.details}
                </p>

                {/* Weather Widget */}
                {country.coords && (
                    <WeatherWidget lat={country.coords.lat} lng={country.coords.lng} city={country.capital} />
                )}

                {/* Currency Converter */}
                {country.currency && (
                    <CurrencyConverter currencyCode={country.currency} />
                )}
            </div>

            <a
                href={flightUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg text-center font-bold transition-colors shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
                <span>✈️</span> En Ucuz Bileti Gör
            </a>
        </div>
    );
};

export default CountryCard;
