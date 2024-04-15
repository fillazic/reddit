
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSubreddit } from '../App/redditSlice';
import './sideBar.css';

const Sidebar = () => {

    const dispatch = useDispatch();
    
    const handleButton = (click) => {
      dispatch(setSubreddit(click));
    };
    
  return (
    <div className='side'>
      <div>
      <h5>Popular posts</h5>
      </div>
      <div className='options'>
        <ul>
          <li >
            <button
                className='top'
                onClick={()=>handleButton('popular/top')}
            >
              TOP
            </button>
          </li>
          <li>
            <button
                onClick={()=>handleButton('popular/new')}
            >
              NEW
            </button>
          </li>
          <li>
            <button
                 onClick={()=>handleButton('popular/hot')}
            >
              HOT
            </button>
          </li>
          <li>
            <select
              name="country"
              id="country"
              onChange={(e)=>handleButton(e.target.value)}
            > 
              <option value="popular">Country</option>
              <option value="serbia">Serbia</option>
              <option value="USA">United States</option>
              <option value="canada">Canada</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
