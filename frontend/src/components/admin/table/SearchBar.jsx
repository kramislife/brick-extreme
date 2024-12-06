import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="relative flex-1 md:max-w-xs">
    <input
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="pl-10 pr-4 py-3 bg-darkBrand border border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-light placeholder-gray-400 text-sm"
    />
    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
  </div>
);

export default SearchBar;