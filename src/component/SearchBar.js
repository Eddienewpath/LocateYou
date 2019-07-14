import React from 'react';
import '../style/search.css'

const SearchBar = (props) =>{
    return (
        <div className='box-div'>
            <input id='content' className="box" type="text" name='name' placeholder='FirstName (MidName) LastName'></input>
            <input onClick={props.handleClick} className="search" type="submit" value='Find'></input>
        </div>
    )
}
    

export default SearchBar;