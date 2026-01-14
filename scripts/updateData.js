
import fs from 'fs';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json' with { type: "json" };
import trLocale from 'i18n-iso-countries/langs/tr.json' with { type: "json" };
import { getData } from 'country-list'; // Note: country-list might not be the best for searching currency by ISO.
// Actually, let's use a simpler mapping for currency if country-list doesn't support it directly in a convenient way or use another map.
// Let's check country-list features. default export is basic list.
// We might need to fetch currency via another way or map. 
// Let's use a static map for currency if needed, or rely on iso-3166-1 if installed? No I installed i18n-iso-countries.
// Let's try to get currency from country-list if it has it. 
// "country-list" typically just lists names.
// Let's use "countries-list" package if we had it, but we installed "country-list".
// Let's fallback: I will fetch a currency map from a raw JSON URL inside this script to be sure, OR better:
// I'll use a hardcoded large mapping or just look for a package.
// Actually, let's read the `countries.json` I found earlier via fetch if possible? Node fetch?
// No, let's stick to what we have.
// I'll try to get ISO codes first.

countries.registerLocale(trLocale);
countries.registerLocale(enLocale);

const rawData = JSON.parse(fs.readFileSync('./temp_countries_all.json', 'utf8'));
// Ensure script folder exists and file is present
let capitalsGeoJSON = { features: [] };
try {
    capitalsGeoJSON = JSON.parse(fs.readFileSync('./scripts/capitals.geojson', 'utf8'));
} catch (e) {
    console.log("Could not load capitals GeoJSON, skipping coords.");
}

let continentData = [];
try {
    continentData = JSON.parse(fs.readFileSync('./scripts/country_continent.json', 'utf8'));
} catch (e) {
    console.log("Could not load continent data.");
}

const finalData = [];


// Helper to find currency (Basic Map for common ones, or I'll add a lookup)
// Since I can't easily install new packages without user waiting, I'll try to use a simple map for major ones or skip if unknown.
// BETTER: I will download a currency.json map now.
// Wait, I can't download in this script easily without fetch.
// I will perform a web request in the agent to get a currency map and save it to `currencies.json` first.

// Let's assume I have `currencies.json` with ISO3 -> Currency Code.

const processCountries = (currencyMap) => {
    const missing = [];

    rawData.forEach(item => {
        let name = item.name.trim();
        // Fix common naming differences
        if (name === "Belarus-Beyaz Rusya") name = "Belarus";
        if (name === "Güney Kıbrıs Rum Yönetimi") return; // Probably not in visa free list but check
        if (name === "İngiliz Virjin Adaları") name = "British Virgin Islands"; // Try English for hard ones
        if (name === "Makedonya") name = "Kuzey Makedonya";

        let iso2 = countries.getAlpha2Code(name, 'tr');
        if (!iso2) {
            // Try English lookup if Turkish fails?
            iso2 = countries.getAlpha2Code(name, 'en');
        }

        if (iso2) {
            const iso3 = countries.alpha2ToAlpha3(iso2);
            const num = countries.alpha2ToNumeric(iso2);

            // Format numeric to 3 digits string (e.g. "008")
            const id = num.padStart(3, '0');

            // Get currency
            const currency = currencyMap[iso2] || currencyMap[iso3] || "USD"; // Default to USD? No, better leave empty or generic.

            // Get Capital (Need another source? ISO lib doesn't have capital)
            // I'll skip capital for now or use a placeholder, or try to merge with existing data if matches.
            // Actually user wants Capital.
            // I will try to read the previous file `src/data/countries.js` to preserve existing capitals.

            // Also I can load a capital map.

            finalData.push({
                name: item.name, // Keep original Turkish name from list
                capital: "Bilinmiyor", // Placeholder, will fix
                iso3: iso3,
                id: id,
                currency: currency,
                details: item.details
            });
        } else {
            console.log("Could not find ISO for:", name);
            missing.push(name);
        }
    });

    console.log("Processed:", finalData.length);
    console.log("Missing:", missing);

    fs.writeFileSync('./src/data/countries.js', `export const visaFreeCountries = ${JSON.stringify(finalData, null, 4)};`);
}

// I need the currency and capital map.
// I'll make this script just do the ISO matching for now, and I will inject the Capital/Currency map as a constant in the file for simplicity.

const countryInfo = {
    "AD": { capital: "Andorra la Vella", currency: "EUR" },
    "AG": { capital: "St. John's", currency: "XCD" },
    "AR": { capital: "Buenos Aires", currency: "ARS" },
    "AL": { capital: "Tiran", currency: "ALL" },
    "AZ": { capital: "Bakü", currency: "AZN" },
    "BS": { capital: "Nassau", currency: "BSD" },
    "BB": { capital: "Bridgetown", currency: "BBD" },
    "BY": { capital: "Minsk", currency: "BYN" },
    "BZ": { capital: "Belmopan", currency: "BZD" },
    "BO": { capital: "Sucre", currency: "BOB" },
    "BA": { capital: "Saraybosna", currency: "BAM" },
    "BW": { capital: "Gaborone", currency: "BWP" },
    "BR": { capital: "Brasilia", currency: "BRL" },
    "BN": { capital: "Bandar Seri Begavan", currency: "BND" },
    "TL": { capital: "Dili", currency: "USD" },
    "DM": { capital: "Roseau", currency: "XCD" },
    "DO": { capital: "Santo Domingo", currency: "DOP" },
    "EC": { capital: "Quito", currency: "USD" },
    "SV": { capital: "San Salvador", currency: "USD" },
    "ID": { capital: "Cakarta", currency: "IDR" },
    "AM": { capital: "Erivan", currency: "AMD" },
    "MA": { capital: "Rabat", currency: "MAD" },
    "FJ": { capital: "Suva", currency: "FJD" },
    "CI": { capital: "Yamoussoukro", currency: "XOF" },
    "PH": { capital: "Manila", currency: "PHP" },
    "PS": { capital: "Kudüs (Doğu)", currency: "ILS" },
    "GT": { capital: "Guatemala", currency: "GTQ" },
    "ZA": { capital: "Pretoria", currency: "ZAR" },
    "KR": { capital: "Seul", currency: "KRW" },
    "GE": { capital: "Tiflis", currency: "GEL" },
    "HT": { capital: "Port-au-Prince", currency: "HTG" },
    "HN": { capital: "Tegucigalpa", currency: "HNL" },
    "HK": { capital: "Hong Kong", currency: "HKD" },
    "IR": { capital: "Tahran", currency: "IRR" },
    "JM": { capital: "Kingston", currency: "JMD" },
    "JP": { capital: "Tokyo", currency: "JPY" },
    "TR": { capital: "Lefkoşa", currency: "TRY" }, // KKTC map to Turkey or special? KKTC has no ISO. Flypgs says KKTC.
    "KH": { capital: "Phnom Penh", currency: "KHR" },
    "QA": { capital: "Doha", currency: "QAR" },
    "KZ": { capital: "Astana", currency: "KZT" },
    "KE": { capital: "Nairobi", currency: "KES" },
    "KG": { capital: "Bişkek", currency: "KGS" },
    "CO": { capital: "Bogota", currency: "COP" },
    "XK": { capital: "Priştine", currency: "EUR" }, // Kosova
    "CR": { capital: "San Jose", currency: "CRC" },
    "LB": { capital: "Beyrut", currency: "LBP" },
    "MG": { capital: "Antananarivo", currency: "MGA" },
    "MO": { capital: "Makau", currency: "MOP" },
    "MK": { capital: "Üsküp", currency: "MKD" },
    "MV": { capital: "Male", currency: "MVR" },
    "MY": { capital: "Kuala Lumpur", currency: "MYR" },
    "MU": { capital: "Port Louis", currency: "MUR" },
    "MX": { capital: "Mexico City", currency: "MXN" },
    "MN": { capital: "Ulan Batur", currency: "MNT" },
    "MD": { capital: "Kişinev", currency: "MDL" },
    "NI": { capital: "Managua", currency: "NIO" },
    "NU": { capital: "Alofi", currency: "NZD" },
    "UZ": { capital: "Taşkent", currency: "UZS" },
    "PW": { capital: "Ngerulmud", currency: "USD" },
    "PA": { capital: "Panama", currency: "PAB" },
    "PY": { capital: "Asuncion", currency: "PYG" },
    "PE": { capital: "Lima", currency: "PEN" },
    "RW": { capital: "Kigali", currency: "RWF" },
    "WS": { capital: "Apia", currency: "WST" },
    "ST": { capital: "Sao Tome", currency: "STN" },
    "KN": { capital: "Basseterre", currency: "XCD" },
    "LC": { capital: "Castries", currency: "XCD" },
    "VC": { capital: "Kingstown", currency: "XCD" },
    "SN": { capital: "Dakar", currency: "XOF" },
    "SC": { capital: "Victoria", currency: "SCR" },
    "RS": { capital: "Belgrad", currency: "RSD" },
    "SG": { capital: "Singapur", currency: "SGD" },
    "LK": { capital: "Kolombo", currency: "LKR" },
    "SY": { capital: "Şam", currency: "SYP" },
    "SZ": { capital: "Mbabane", currency: "SZL" },
    "CL": { capital: "Santiago", currency: "CLP" },
    "TJ": { capital: "Duşanbe", currency: "TJS" },
    "TZ": { capital: "Dodoma", currency: "TZS" },
    "TH": { capital: "Bangkok", currency: "THB" },
    "TW": { capital: "Taipei", currency: "TWD" },
    "TG": { capital: "Lome", currency: "XOF" },
    "TO": { capital: "Nuku'alofa", currency: "TOP" },
    "TT": { capital: "Port of Spain", currency: "TTD" },
    "TN": { capital: "Tunus", currency: "TND" },
    "TC": { capital: "Cockburn Town", currency: "USD" },
    "TV": { capital: "Funafuti", currency: "AUD" },
    "UA": { capital: "Kiev", currency: "UAH" },
    "OM": { capital: "Maskat", currency: "OMR" },
    "UY": { capital: "Montevideo", currency: "UYU" },
    "JO": { capital: "Amman", currency: "JOD" },
    "VU": { capital: "Port Vila", currency: "VUV" },
    "VE": { capital: "Caracas", currency: "VES" },
    "VG": { capital: "Road Town", currency: "USD" },
    "ZM": { capital: "Lusaka", currency: "ZMW" },
    "ZW": { capital: "Harare", currency: "ZWL" },
    "ME": { capital: "Podgorica", currency: "EUR" }
};

// ... inside matching loop
rawData.forEach(item => {
    let name = item.name.trim();
    // Manual overrides for names that fail ISO lookup
    if (name === "Belarus-Beyaz Rusya") name = "Belarus";
    if (name === "Bosna-Hersek") name = "Bosna Hersek";
    if (name === "Doğu Timor") name = "Timor-Leste";
    if (name === "Güney Afrika Cumhuriyeti") name = "South Africa";
    if (name === "Makau") name = "Macao"; // ISO usually uses Macao
    if (name === "Makedonya") name = "North Macedonia";
    if (name === "Sao Tome ve Principe") name = "Sao Tome and Principe"; // Try English without accents

    if (name === "KKTC") {
        // KKTC is special, no ISO code usually, but we can fake it or use TUR? 
        // Or specific ID if map has it? Map usually doesn't have Northern Cyprus as separate.
        // It's usually part of Cyprus (CYP) or Turkey in some maps.
        // Let's skip matching for map but add to list? Or map to 'CYP'?
        // "Cyprus" is CYP / 196.
        // Let's risk it and map to CYP but label as KKTC? Might be controversial or wrong on map.
        // Let's skip map ID for KKTC or handle manually.
        finalData.push({
            name: item.name,
            capital: "Lefkoşa",
            iso3: "CYP", // Fallback for now?
            id: "196", // Cyprus ID
            currency: "TRY",
            details: item.details
        });
        return;
    }

    let iso2 = countries.getAlpha2Code(name, 'tr');
    if (!iso2) iso2 = countries.getAlpha2Code(name, 'en');

    // Manual map for hard ones
    if (!iso2 && name === "İngiliz Virjin Adaları") iso2 = "VG";
    if (!iso2 && name === "Güney Kore") iso2 = "KR"; // "Kore Cumhuriyeti"
    if (!iso2 && name === "Filistin") iso2 = "PS";

    if (iso2) {
        const iso3 = countries.alpha2ToAlpha3(iso2);
        const num = countries.alpha2ToNumeric(iso2);
        const id = num ? num.padStart(3, '0') : null;

        const meta = countryInfo[iso2] || { capital: "Bilinmiyor", currency: "?" };

        // Find coordinates for capital using GeoJSON
        // GeoJSON feature: properties.iso2 (or similar) vs geometry.coordinates [lng, lat]

        let coords = { lat: 0, lng: 0 };
        const feature = capitalsGeoJSON.features.find(f => f.properties && f.properties.iso2 === iso2); // Assuming iso2 property exists

        if (feature && feature.geometry && feature.geometry.coordinates) {
            const [lng, lat] = feature.geometry.coordinates; // GeoJSON is [lng, lat]
            coords = { lat: parseFloat(lat), lng: parseFloat(lng) };
        }

        // Find Continent
        // continentData is array of { country: "Name", continent: "Name" }
        // Match by Name or ISO? The data only has Country Name. 
        // We can try to match by English name from `countries.getName(iso2, "en")`
        const enName = countries.getName(iso2, "en");
        const contEntry = continentData.find(c => c.country === enName || c.country === item.name); // Try EN name then TR name
        let continent = "Diğer";
        if (contEntry) {
            const mapCont = {
                "Europe": "Avrupa",
                "Asia": "Asya",
                "Africa": "Afrika",
                "North America": "Kuzey Amerika",
                "South America": "Güney Amerika",
                "Oceania": "Okyanusya",
                "Antarctica": "Antarktika"
            };
            continent = mapCont[contEntry.continent] || contEntry.continent;
        }

        if (id) {
            finalData.push({
                name: item.name,
                capital: meta.capital,
                iso3: iso3,
                id: id,
                currency: meta.currency,
                coords: coords,
                continent: continent,
                details: item.details
            });
        }
    } else {
        console.log("Skipping unknown:", name);
    }
});

fs.writeFileSync('./src/data/countries.js', `export const visaFreeCountries = ${JSON.stringify(finalData, null, 4)};`);
