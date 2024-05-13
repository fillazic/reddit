
import React, { useState } from 'react';
import RedditSearchInput from './searchInput';
import Sidebar from './sideBar';
import { useDispatch, useSelector } from 'react-redux';
import { setSubreddit, setDisplay, drop } from '../App/redditSlice';
import { useNavigate } from 'react-router-dom';
import './header.css'

const Header = () => {
    const navigate=useNavigate();


    const dispatch = useDispatch();
    const displayContent=useSelector(drop);

    const dropHandler = (content) => {
        dispatch(setDisplay(content));
    }

    const logoHandler = (click) => {
      dispatch(setSubreddit(click));
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/');
    };

  return (
    <div className='header'>
        <h1 className='main-logo'>
            <img 
                src='images/redditBlueLogo1.png' alt='logo' 
                className='logo'
                onClick={()=>logoHandler('/r/popular')}
            /> <span>RedditClone</span>
        </h1>
    <div className='main-search'>
    <RedditSearchInput/>
    </div>

    <div className="dropdown">
        <div className='button-menu'>
            <button onClick={()=>dropHandler('dropdown-content')} className="dropbtn">
                <img src='images/home.png' alt='home'/>
            </button>
        </div>
        <div id="myDropdown" className={displayContent}>
            <img src='images/close-button.png' alt='' className='x-img' onClick={()=>dropHandler('dropdown-content-none')}/>
            <div className='all-options'>
                <a className='options' href="#">My Profile</a>
                <a className='options' href="#">Create Post</a>
                <a className='options' href="#">Setting</a>
            </div>
        <div className='search-side'>
        <RedditSearchInput />
        </div>
        <div className='side-popular'>
        <Sidebar />
        </div>
        </div>
</div>
    </div>
  );
};

export default Header;

