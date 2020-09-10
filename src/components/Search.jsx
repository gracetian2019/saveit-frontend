import React from "react";

const Search = (props) => {
  let changeHandler = evt =>{
    props.changeSearchItem(evt.target.value)
  }
  return (
    <div className="ui small fluid icon input searchBar">
      <input className="searchInput"
        type="text"
        placeholder={"Search"}
        value={props.searchItem}
        onChange={changeHandler}
      />
      <i className="circular search link icon"></i>
    </div>
  );
};

export default Search;