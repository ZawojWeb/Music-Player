import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMusic} from '@fortawesome/free-solid-svg-icons';

const Nav =({libraryStatus,setlibraryStatus})=>{
    return(
        <nav>
            <h1>Waves</h1>
            <button onClick={()=> setlibraryStatus(!libraryStatus)}>
                <span>Library</span>
                <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
            </button>
        </nav>
    );
}
export default Nav