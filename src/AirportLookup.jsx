

import { useEffect, useState } from "react";

function AirportLookup(searchTerm) {

    const [airports, setAirports] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetch("/airports.json")
            .then((res) => {
                if (!res.ok) throw new Error("Server error: " + res.status);
                return res.json();
            })
            .then((data) => setAirports(data))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSuggestions([]);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        const timer = setTimeout(() => {
            const filteredAirports = airports.filter((airport) =>
                airport.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                airport.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                airport.name.toLowerCase().includes(searchTerm.toLowerCase()) 
            );
            setSuggestions(filteredAirports.slice(0, 5));
            setIsSearching(false);
        }, 250);
        return () => clearTimeout(timer);
    }, [searchTerm, airports]);
    return { suggestions, isLoading, isSearching };
}

export default AirportLookup;
