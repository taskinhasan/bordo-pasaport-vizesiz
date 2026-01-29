import { useState, useRef, useEffect } from 'react';
import { visaFreeCountries } from '../data/countries';

const turkishAirports = [
    { code: "IST", city: "İstanbul", name: "İstanbul Havalimanı" },
    { code: "SAW", city: "İstanbul", name: "Sabiha Gökçen" },
    { code: "ESB", city: "Ankara", name: "Esenboğa" },
    { code: "ADB", city: "İzmir", name: "Adnan Menderes" },
    { code: "AYT", city: "Antalya", name: "Antalya Havalimanı" },
    { code: "DLM", city: "Muğla", name: "Dalaman" },
    { code: "BJV", city: "Muğla", name: "Milas-Bodrum" },
    { code: "ADA", city: "Adana", name: "Şakirpaşa" },
    { code: "TZX", city: "Trabzon", name: "Trabzon Havalimanı" }
];

const FlightSearch = () => {
    const [origin, setOrigin] = useState("İstanbul");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    // Autocomplete State
    const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
    const [showDestSuggestions, setShowDestSuggestions] = useState(false);
    const originRef = useRef(null);
    const destRef = useRef(null);

    // Close suggestions on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (originRef.current && !originRef.current.contains(event.target)) {
                setShowOriginSuggestions(false);
            }
            if (destRef.current && !destRef.current.contains(event.target)) {
                setShowDestSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const today = new Date().toISOString().split('T')[0];

    // Filter Logic
    const filteredAirports = turkishAirports.filter(a =>
        a.city.toLowerCase().includes(origin.toLowerCase()) ||
        a.name.toLowerCase().includes(origin.toLowerCase()) ||
        a.code.toLowerCase().includes(origin.toLowerCase())
    );

    const filteredCountries = visaFreeCountries.filter(c =>
        c.name.toLowerCase().includes(destination.toLowerCase()) ||
        c.capital.toLowerCase().includes(destination.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();
        if (!destination) return;

        const query = `${origin} to ${destination} flights`;
        let url = `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;

        let dateQuery = "";
        if (departureDate) dateQuery += ` on ${departureDate}`;
        if (returnDate) dateQuery += ` returning ${returnDate}`;

        url = `https://www.google.com/travel/flights?q=${encodeURIComponent(query + dateQuery)}`;

        window.open(url, '_blank');
    };

    return (
        <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 shadow-lg mb-6 relative">
            <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                <span>✈️</span> Uçuş Arama Motoru
            </h2>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Origin Input */}
                    <div className="flex flex-col gap-1 relative" ref={originRef}>
                        <label className="text-sm text-gray-400">Nereden</label>
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            onFocus={() => setShowOriginSuggestions(true)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
                            placeholder="Şehir veya Havalimanı"
                        />
                        {showOriginSuggestions && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                {filteredAirports.map(airport => (
                                    <div
                                        key={airport.code}
                                        onClick={() => {
                                            setOrigin(`${airport.city} (${airport.code})`);
                                            setShowOriginSuggestions(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm border-b border-gray-700 last:border-0"
                                    >
                                        <div className="font-bold">{airport.city}</div>
                                        <div className="text-xs text-gray-400">{airport.name} ({airport.code})</div>
                                    </div>
                                ))}
                                {filteredAirports.length === 0 && (
                                    <div className="px-4 py-2 text-sm text-gray-500">Sonuç bulunamadı</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Destination Input */}
                    <div className="flex flex-col gap-1 relative" ref={destRef}>
                        <label className="text-sm text-gray-400">Nereye</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onFocus={() => setShowDestSuggestions(true)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
                            placeholder="Ülke veya Şehir"
                            required
                        />
                        {showDestSuggestions && destination.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                {filteredCountries.map(country => (
                                    <div
                                        key={country.id}
                                        onClick={() => {
                                            setDestination(country.name);
                                            setShowDestSuggestions(false);
                                        }}
                                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm border-b border-gray-700 last:border-0"
                                    >
                                        <div className="font-bold">{country.name}</div>
                                        <div className="text-xs text-gray-400">{country.capital}</div>
                                    </div>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <div className="px-4 py-2 text-sm text-gray-500">Sonuç bulunamadı</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Departure Date */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Gidiş Tarihi</label>
                        <input
                            type="date"
                            value={departureDate}
                            min={today}
                            onChange={(e) => {
                                setDepartureDate(e.target.value);
                                // Reset return date if it becomes invalid (before new departure)
                                if (returnDate && e.target.value && returnDate < e.target.value) {
                                    setReturnDate("");
                                }
                            }}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Return Date */}
                    <div className="flex flex-col gap-1">
                        <label className={`text-sm ${!departureDate ? 'text-gray-600' : 'text-gray-400'}`}>Dönüş Tarihi (Opsiyonel)</label>
                        <input
                            type="date"
                            value={returnDate}
                            min={departureDate || today}
                            disabled={!departureDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className={`bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none ${!departureDate ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto self-end bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/30"
                >
                    Uçuş Ara 🔎
                </button>
            </form>
        </div>
    );
};

export default FlightSearch;
