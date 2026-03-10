const SearchBar = ({ value, onChange, placeholder = 'Search courses...' }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        placeholder={placeholder}
      />
    </div>
  )
}

export default SearchBar

