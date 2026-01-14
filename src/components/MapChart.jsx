import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { visaFreeCountries } from "../data/countries";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapChart = ({ setTooltipContent, onCountryClick, highlightedCountries }) => {
    // If highlightedCountries is provided, use it. Otherwise use all.
    // Actually, App.jsx passes filter result.
    const activeCountries = highlightedCountries || [];

    const [position, setPosition] = useState({ coordinates: [20, 0], zoom: 1 });

    function handleMoveEnd(position) {
        setPosition(position);
    }

    return (
        <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800">
            <ComposableMap
                projectionConfig={{
                    scale: 200
                }}
                width={900}
                height={550}
                style={{ width: "100%", height: "100%" }}
            >
                <ZoomableGroup
                    zoom={position.zoom}
                    center={position.coordinates}
                    onMoveEnd={handleMoveEnd}
                    minZoom={1}
                    maxZoom={8}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryId = geo.id; // Map country ID (numeric string)
                                const isVisaFree = activeCountries.find(
                                    (c) => c.id === countryId
                                );

                                // Turkey Check
                                const isTurkey = geo.id === "792";

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        data-tooltip-id="my-tooltip"
                                        onMouseEnter={() => {
                                            if (isVisaFree) {
                                                setTooltipContent(`${isVisaFree.name} - Vizesiz`);
                                            } else if (isTurkey) {
                                                setTooltipContent(`Türkiye`);
                                            } else {
                                                setTooltipContent(geo.properties.name);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        onClick={() => {
                                            if (isVisaFree) {
                                                onCountryClick(isVisaFree);
                                            }
                                        }}
                                        style={{
                                            default: {
                                                fill: isTurkey
                                                    ? "#EF4444" // Red for Turkey
                                                    : isVisaFree
                                                        ? "#3B82F6" // Blue for Visa Free
                                                        : "#374151", // Gray for others
                                                stroke: "#1F2937",
                                                strokeWidth: 0.5,
                                                outline: "none",
                                            },
                                            hover: {
                                                fill: isTurkey
                                                    ? "#DC2626"
                                                    : isVisaFree
                                                        ? "#60A5FA"
                                                        : "#4B5563",
                                                outline: "none",
                                                cursor: isVisaFree ? "pointer" : "default"
                                            },
                                            pressed: {
                                                fill: isVisaFree ? "#2563EB" : "#374151",
                                                outline: "none",
                                            },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default MapChart;
