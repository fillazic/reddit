
import React, { useState } from 'react';
import RedditSearchInput from './searchInput';
import Sidebar from './sideBar';
import { useDispatch } from 'react-redux';
import { setSubreddit } from '../App/redditSlice';
import './header.css'

const Header = () => {
    const [isTrue, setIsTrue]= useState(false);

    const handler = ()=>{
        setIsTrue(!isTrue);
    }
    const display = isTrue? 'dropdown-content' : 'dropdown-content-none';

    const dispatch = useDispatch();
    const logoHandler = (click) => {
      dispatch(setSubreddit(click));
      window.scrollTo({ top: 0, behavior: 'smooth' })
    };

  return (
    <div className='header'>
        <h1 className='main-logo'>
            <img 
                src='images/redditBlueLogo1.png' alt='logo' 
                className='logo'
                onClick={()=>logoHandler('popular')}
            /> Reddit<span>Clone</span>
        </h1>
    <div className='main-search'>
    <RedditSearchInput/>
    </div>

    <div className="dropdown">
        <div className='button-menu'>
            <button onClick={handler} className="dropbtn">
                <img src='images/home.png' alt='home'/>
            </button>
        </div>
        <div id="myDropdown" className={`${display}`}>
            <img src='images/close-button.png' alt='' className='x-img' onClick={handler}/>
            <div className='all-options'>
                <a className='options' href="#">My Profile</a>
                <a className='options' href="#">Create Post</a>
                <a className='options' href="#">Setting</a>
            </div>
        <div className='search-side'>
        <RedditSearchInput />
        </div>
        <div className='side-popular'>
        <Sidebar/>
        </div>
        </div>
</div>
    </div>
  );
};

export default Header;

