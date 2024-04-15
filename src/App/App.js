
import React from 'react';
import RedditPosts from '../features/Posts/RedditPosts';
import Sidebar from '../components/sideBar';
import Header from '../components/header';

import './App.css';

function App() {

  return (
    <div className='main-body'>
      <div className='main-header'>
      <Header/>
      </div>
      <div className='blog'>
        <div className='posts'>
          <RedditPosts/>
        </div>
        <div className='sidebar'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
