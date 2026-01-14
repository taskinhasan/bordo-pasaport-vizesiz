
import { useState } from 'react';

const UserProfile = ({ user, favorites, onClose, onUpdateName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState(user.name);

    const handleSave = () => {
        onUpdateName(tempName);
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>

                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3">
                        {user.name.charAt(0)}
                    </div>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
                            />
                            <button onClick={handleSave} className="text-green-400 text-sm">Kaydet</button>
                        </div>
                    ) : (
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            {user.name}
                            <button onClick={() => setIsEditing(true)} className="text-gray-500 text-sm hover:text-white">✎</button>
                        </h2>
                    )}
                    <p className="text-gray-400 text-sm">Gezgin</p>
                </div>

                <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span className="text-red-500">❤️</span> Favori Ülkelerim ({favorites.length})
                    </h3>
                    <div className="max-h-60 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700">
                        {favorites.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">Henüz favori eklemedin.</p>
                        ) : (
                            favorites.map(country => (
                                <div key={country.id} className="flex justify-between items-center bg-gray-800/50 p-2 rounded">
                                    <span>{country.name}</span>
                                    <span className="text-xs text-gray-500">{country.capital}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
