
import React from 'react';
import Sidebar from '../components/sideBar';
import Header from '../components/header';
import './App.css';
import { Outlet } from 'react-router-dom';


function Root() {



  return (
    <div className='main-body'>
      <div className='main-header'>
      <Header/>
      </div>
      <div className='blog'>
        <div className='posts'>
          <Outlet />
        </div>
         <div className='sidebar'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Root;
