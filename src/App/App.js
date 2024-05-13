
import React from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Router } from 'react-router-dom'
import RedditPosts from '../features/Posts/RedditPosts';
import FullPost from '../features/FullPost/FullPost';
import Root from './Root';
import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <>
  <Route path='/' element={ <Root/> } >
    <Route path='/' element={ <RedditPosts/>} />
    <Route path='/fullpost' element={ <FullPost/>} />
  </Route>
  </>
))

function App() {
 return (
    <RouterProvider router={ router } />
  );
}

export default App;
