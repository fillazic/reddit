
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSubreddit, setDisplay } from '../App/redditSlice';
import {useNavigate } from 'react-router-dom';
import './sideBar.css';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    const handleButton = (click, content) => {
      dispatch(setSubreddit(click));
      dispatch(setDisplay(content))
      navigate('/');
    };
    
  return (
    <div className='side'>
      <div>
      <h5>Popular posts</h5>
      </div>
      <div className='options'>
        <ul>
          <li>
            <button
                className='top'
                onClick={()=>handleButton('/r/popular/top',  'dropdown-content-none')}
            >
              TOP
            </button>
          </li>
          <li>
            <button
                onClick={()=>handleButton('/r/popular/new', 'dropdown-content-none')}
            >
              NEW
            </button>
          </li>
          <li>
            <button
                 onClick={()=>handleButton('/r/popular/hot', 'dropdown-content-none')}
            >
              HOT
            </button>
          </li>
          <li>
            <select
              name="country"
              id="country"
              onChange={(e)=>handleButton(e.target.value, 'dropdown-content-none')}
            > 
              <option value="/r/popular">Country</option>
              <option value="/r/serbia">Serbia</option>
              <option value="/r/USA">United States</option>
              <option value="/r/canada">Canada</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
