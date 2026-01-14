
// Batch fetch temperatures from Open-Meteo
// Docs: https://open-meteo.com/en/docs
// We can pass multiple lat/lon query params.

export const fetchTemperatures = async (countries) => {
    // Filter countries with valid coords
    const validCountries = countries.filter(c => c.coords && c.coords.lat && c.coords.lng);

    if (validCountries.length === 0) return {};

    // Open-Meteo accepts lists: ?latitude=52.52,48.85&longitude=13.41,2.35
    // Max URL length usually ~2000 chars. We might need to chunk if list is huge.
    // Detailed list is ~100 countries. URL for 100 coords is rough calculation:
    // (7chars lat + 1 comma) * 100 = 800 chars. Safe.

    const lats = validCountries.map(c => c.coords.lat).join(',');
    const lngs = validCountries.map(c => c.coords.lng).join(',');

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Single result vs List result
        // If 1 coord sent, `current_weather` is object.
        // If multiple, `data` is array? No, Open-Meteo returns array in fields if multiple?
        // Let's check docs or test. 
        // Docs say: If multiple locations are requested, the response will be an array of objects.

        const resultMap = {};

        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                if (item.current_weather) {
                    resultMap[validCountries[index].id] = item.current_weather.temperature;
                }
            });
        } else if (data.current_weather) {
            // Single result or just one country
            resultMap[validCountries[0].id] = data.current_weather.temperature;
        }

        return resultMap;

    } catch (error) {
        console.error("Error fetching batch weather:", error);
        return {};
    }
};
