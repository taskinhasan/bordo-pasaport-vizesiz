import { useState } from 'react';

const FlightSearch = () => {
    const [origin, setOrigin] = useState("İstanbul");
    const [destination, setDestination] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (!destination) return;

        const query = `${origin} to ${destination} flights`;
        let url = `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;

        // Note: Specific dates in Google Flights URL are complex to construct reliably cross-locale without an API,
        // but appending them to the query often helps Google pre-fill.
        // e.g. "Istanbul to Belgrade flights on 2024-05-01"

        let dateQuery = "";
        if (departureDate) dateQuery += ` on ${departureDate}`;
        if (returnDate) dateQuery += ` returning ${returnDate}`;

        url = `https://www.google.com/travel/flights?q=${encodeURIComponent(query + dateQuery)}`;

        window.open(url, '_blank');
    };

    return (
        <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 shadow-lg mb-6">
            <h2 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
                <span>✈️</span> Uçuş Arama Motoru
            </h2>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Nereden</label>
                        <input
                            type="text"
                            value={origin}
                            onChange={(e) => setOrigin(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
                            placeholder="Şehir veya Havalimanı"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Nereye</label>
                        <input
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
                            placeholder="Ülke veya Şehir"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Gidiş Tarihi</label>
                        <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-400">Dönüş Tarihi (Opsiyonel)</label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
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
