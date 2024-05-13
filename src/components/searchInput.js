
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTerm,  searchPosts } from '../App/redditSearch';
import RedditSearch from './search';
import './searchInput.css'

const RedditSearchInput = () => {
  const dispatch = useDispatch();
  const searchReddit = useSelector(searchPosts);

  
  const displaySearch = searchReddit.length>0? 'search-result' : 'search-result-none';


  const searchHandler = (e)=>{
    dispatch(setTerm(e.target.value));
    }
  
const clearHandler=()=>{
      dispatch(setTerm(''));
    }

  return (
    <div className='search-path'>
    <div className='search-box'>
    <img src='images/search-icon.webp' alt='' className='search-logo'/>
      <input
        className='search'
        type="text"
        value={searchReddit}
        placeholder="Enter subreddit"
        onChange={searchHandler}
      />
      {searchReddit.length>0 && (
        <button className='search-button' onClick={clearHandler}>
        <img src='images/close-button.png' alt='' className='side-x-img' onClick={clearHandler}/>
        </button>
        )}
      </div>
    <div className={`${displaySearch}`}>
     <RedditSearch />
    </div>
    </div>
    
  );
};

export default RedditSearchInput;
