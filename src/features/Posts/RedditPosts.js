import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { fetchPosts, selectPosts, selectPostsStatus, term} from '../../App/redditSlice';
import {setId, setPost} from '../../App/FullPostSlice';
import Avatar from '../../components/avatar';
import Loader from '../../components/loader';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RedditPosts.css';


const RedditPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const termItem = useSelector(term);
  const [isTrue, setIsTrue]= useState(false);


 useEffect(() => {
    dispatch(fetchPosts(termItem));

    //goTopButton
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsTrue(true);
      } else {
        setIsTrue(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    //

  }, [dispatch, termItem]);


  const handleFullPost = (permal, postt) => {
    dispatch(setId(permal));
    dispatch(setPost(postt))
  };

 
  const display = isTrue? 'top' : 'top-none';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (status === 'loading') {
    return  <div className='load'>
                <Loader/>
                {window.scrollTo({ top: 0, behavior: 'smooth' })}
            </div>;
  }

  if (status === 'failed') {
    return <div className='fail'>Error. Posts can't be displayed</div>;
  }

  return (
    <div className='main'>
      {posts.map((post) => (
        <div key={post.id} className='post-container'>
          <div className='other'>
          <section className='authors'>
            <h4><Avatar name={post.subreddit} />{post.subreddit_name_prefixed}</h4>
            <h5 className='author'>Posted by:  {post.author}</h5>
          </section>
          <h2>{post.title}</h2>

          {post.selftext.trim().length > 0 && <p className='text'>{post.selftext}</p>}
          {post.url.includes('.jpeg') || post.url.includes('.png') || post.url.includes('.jpg')? (
              <img src={post.url} alt="post" className='pict' />
            ) : null}

          {post.url.includes('v.redd.it') ? (
            <video controls className='video'>
            <source src={post.url + '/DASH_480.mp4' } type="video/mp4" />
            Your browser does not support the video tag.
          </video> 
          ): null}

          {post.url.includes('gallery') ? (
            <Slider {...settings} className='gallery'>
              {post.gallery_data.items.map((item, index) => (
                  
              <img src={`https://i.redd.it/${item.media_id}.jpg`} alt={index} className='pict'/>
              ))}
            </Slider>
          ) : null}

          <div className='footer'>
          <div className='likes'><img src='images/blue-like-button-icon.png' alt='' className='side-x-img'/> {post.ups}</div>
          <Link to='/fullpost' className='comment'>
            <div  className='comments' 
                onClick={()=>handleFullPost(post.permalink, post)}
                >
            <img src='images/comments.png' alt='' className='side-x-img'/> {post.num_comments}
          </div>
          </Link>
          </div>
          </div>
        </div>
      ))}
      <Outlet/>
      <button id={display} title="Go to top" onClick={scrollToTop} >
        Top
      </button>
    </div>
    
  );
};

export default RedditPosts;
