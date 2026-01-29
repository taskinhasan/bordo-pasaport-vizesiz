
import { useState } from 'react';

const regions = ["Tümü", "Avrupa", "Asya", "Afrika", "Kuzey Amerika", "Güney Amerika", "Okyanusya"];
const sortOptions = [
    { value: "name", label: "İsim (A-Z)" },
    { value: "temp_desc", label: "En Sıcak 🔥" },
    { value: "temp_asc", label: "En Soğuk ❄️" }
];

const SearchBar = ({ onSearch, onFilterRegion, onSortChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("Tümü");
    const [selectedSort, setSelectedSort] = useState("name");

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        onSearch(val);
    };

    const handleRegionClick = (region) => {
        setSelectedRegion(region);
        onFilterRegion(region);
    };

    const handleSortChange = (e) => {
        const val = e.target.value;
        setSelectedSort(val);
        if (onSortChange) onSortChange(val);
    };

    return (
        <div className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    placeholder="Ülke ara..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none transition-colors"
                />

                <select
                    value={selectedSort}
                    onChange={handleSortChange}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none cursor-pointer"
                >
                    {sortOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                    <button
                        key={region}
                        onClick={() => handleRegionClick(region)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectedRegion === region ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                        {region}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchBar;
