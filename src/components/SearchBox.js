import React from "react";

const SearchBox = ({ searchChange }) => (
    <div className="search-wrap">
        <input
            className="search-input search-input--pill"
            type="search"
            placeholder="Scan the galaxy…"
            onChange={searchChange}
        />
    </div>
);


export default SearchBox;