import { useEffect, useState } from "react";

const Search = ({ setSearch, className }) => {
  const [srch, setSrch] = useState("");
  const handleSearch = (e) => {
    setSrch(e.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(srch);
    }, 500);
    return () => clearTimeout(timer);
  }, [setSrch, srch, setSearch]);
  return (
    <label
      className={`input focus-within:outline-none focus-within:border-primary ${className}`}
    >
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        onChange={(e) => handleSearch(e)}
        type="search"
        required
        placeholder="Search"
      />
    </label>
  );
};

export default Search;
