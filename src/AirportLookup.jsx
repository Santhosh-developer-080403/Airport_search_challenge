
import { useEffect, useState } from "react";

function useAirportLookup(searchTerm) {

    const [airports, setAirports] = useState([]);
    const [suggestionsList, setSuggestionsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    // airport data
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

    // airport search
    useEffect(() => {

        if (!searchTerm.trim()) {
            setSuggestionsList([]);
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
            setSuggestionsList(filteredAirports.slice(0, 5));
            setIsSearching(false);
        }, 250);
        return () => clearTimeout(timer);
    }, [searchTerm, airports]);
    return { suggestionsList, isLoading, isSearching };
}

export default useAirportLookup;
