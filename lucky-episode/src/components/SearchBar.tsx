import React, { useState, ChangeEvent } from 'react';
import { searchTVShows } from '../utils/apiHelper';

interface TVShow {
  id: number;
  name: string;
}

interface SearchBarProps {
  onShowSelect: (show: TVShow) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onShowSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<TVShow[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 2) {
      const results = await searchTVShows(input);
      setSuggestions(results.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectShow = (show: TVShow) => {
    setQuery(show.name);
    setSuggestions([]);
    onShowSelect(show); // Pass selected show back to the parent component
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a TV show"
        className="border rounded px-4 py-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border mt-1 w-full max-h-60 overflow-y-auto">
          {suggestions.map((show) => (
            <li
              key={show.id}
              onClick={() => handleSelectShow(show)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {show.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
