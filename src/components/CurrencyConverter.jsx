
import { useState, useEffect } from 'react';

const CurrencyConverter = ({ currencyCode }) => {
    const [amount, setAmount] = useState(100);
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!currencyCode || currencyCode === 'TRY') return;

        const fetchRate = async () => {
            setLoading(true);
            setError(false);
            try {
                // Using frankfurter.app (Free, no key, major currencies only)
                // Fallback or alert if fail? 
                // Let's try to fetch relative to TRY. 
                // Note: Frankfurter might not have TRY as base sometimes or strict list.
                // Alternative: https://open.er-api.com/v6/latest/TRY
                const res = await fetch(`https://open.er-api.com/v6/latest/TRY`);
                const data = await res.json();

                if (data && data.rates && data.rates[currencyCode]) {
                    setRate(data.rates[currencyCode]);
                } else {
                    setError(true);
                }
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchRate();
    }, [currencyCode]);

    if (!currencyCode || currencyCode === 'TRY') return null;

    if (error) return (
        <div className="mt-3 text-xs text-red-400">Kur bilgisi alınamadı ({currencyCode})</div>
    );

    const result = rate ? (amount * rate).toFixed(2) : "...";

    return (
        <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 mt-3">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Canlı Kur Çevirici</h4>
            <div className="flex items-center gap-2">
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500">TRY</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-gray-900 border border-gray-600 rounded p-1 w-20 text-white text-sm"
                    />
                </div>
                <span className="text-gray-400">➜</span>
                <div className="flex flex-col">
                    <label className="text-xs text-gray-500">{currencyCode}</label>
                    <div className="font-mono text-lg text-blue-300">
                        {loading ? "..." : result}
                    </div>
                </div>
            </div>
            {rate && (
                <p className="text-[10px] text-gray-500 mt-1">1 TRY = {rate.toFixed(4)} {currencyCode}</p>
            )}
        </div>
    );
};

export default CurrencyConverter;
