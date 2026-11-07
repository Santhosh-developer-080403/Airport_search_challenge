
import { useState } from "react";
import AirportLookup from "./AirportLookup";

function AirportAutocomplete() {

  const [airportFilter, setAirportFilter] = useState("");
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const { suggestions, isLoading, isSearching } =
    AirportLookup(airportFilter);

  const handleSelect = (airport) => {
    setAirportFilter(airport.code);
    setSelectedAirport(airport);
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (suggestions.length > 0) {
        setIsOpen(true);
        setFocusedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      }
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setIsOpen(true);
        setFocusedIndex((prev) =>
          prev <= 0 ? suggestions.length - 1 : prev - 1
        );
      }
    }
    else if (e.key === "Enter") {
      if (
        focusedIndex >= 0 &&
        focusedIndex < suggestions.length
      ) {
        e.preventDefault();
        handleSelect(suggestions[focusedIndex]);
      }
    }
    else if (e.key === "Escape") {
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="search-container">
      <div className="airport">
        <div className="airport-sec">
          <h1>Airport Search</h1>
          <p>
            Find and select your departure airport by entering
            the city name, airport name, or 3-letter IATA code.
          </p>
        </div>
        <div className="input-group">
          <label className="input-label">From</label>
          <input
            type="text"
            className="airport-input"
            value={airportFilter}
            onChange={(e) => {
              setAirportFilter(e.target.value);
              setSelectedAirport(null);
              setFocusedIndex(-1);
              setIsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (airportFilter.trim()) {
                setIsOpen(true);
              }
            }}
            placeholder="Search airport or city"
          />
        </div>
        <div
          className={`suggestions-dropdown ${isOpen && airportFilter.trim() !== "" ? "show" : ""
            }`}
        >
          {suggestions.length > 0 ? (
            suggestions.map((airport, index) => (
              <div
                key={airport.code}
                className={`suggestion-card ${focusedIndex === index ? "active" : ""
                  }`}
                onMouseEnter={() => setFocusedIndex(index)}
                onClick={() => handleSelect(airport)}
              >
                <div className="suggestion-header">
                  <div className="code-city">
                    <strong className="airport-code">
                      {airport.code}
                    </strong>
                    <span className="airport-city">
                      {airport.city}
                    </span>
                  </div>
                  <span className="airport-country">
                    {airport.country}
                  </span>
                </div>
                <p className="airport-name">
                  {airport.name}
                </p>
              </div>
            ))
          ) : (
            !isLoading && !isSearching && (
              <div className="suggestion-card">
                No airports match
              </div>
            )
          )}
        </div>
        {selectedAirport && (
          <pre>
            {JSON.stringify(selectedAirport, null, 2)}
          </pre>
        )}

      </div>

    </div>
  );
}

export default AirportAutocomplete;
