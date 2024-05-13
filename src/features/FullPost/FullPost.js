import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchComments, selectComments, selectPost, selectCommentsStatus, id } from '../../App/FullPostSlice';
import Loader from '../../components/loader';
import Avatar from '../../components/avatar';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './FullPosts.css';

const FullPost = () => {
  const dispatch = useDispatch();
  const comment = useSelector(selectComments);
  const status = useSelector(selectCommentsStatus);
  const postData = useSelector(selectPost);
  const idChange = useSelector(id);
  const [isTrueFull, setIsTrueFull]= useState(false);
  const navigate=useNavigate();

 useEffect(() => {
    dispatch(fetchComments(idChange));

    //goTopButton
    const Scroll = () => {
      if (window.scrollY > 800) {
        setIsTrueFull(true);
      }
      else{
        setIsTrueFull(false);
      }
    };

    window.addEventListener('scroll', Scroll);
    return () => {
      window.removeEventListener('scroll', Scroll);
    };
    //
    
  }, [dispatch, idChange]);

  const displayFull = isTrueFull? 'topFull' : 'topFull-none';

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const goBack =()=> {
    navigate(-1)
  }

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
    return <div className='fail'>Error. Comments can't be displayed</div>;
  }

  return (
    
    <div>
        <div key={postData.id} className='fullpost-container'>
          <div className='other'>
          <section className='authors'>
            <h4><Avatar name={postData.subreddit} />{postData.subreddit_name_prefixed}</h4>
            <h5 className='author'>Posted by:  {postData.author}</h5>
          </section>
          <h2>{postData.title}</h2>

          {postData.selftext.trim().length > 0 && <p className='full-text'>{postData.selftext}</p>}
          {postData.url.includes('.jpeg') || postData.url.includes('.png') || postData.url.includes('.jpg')? (
              <img src={postData.url} alt="post" />
            ) : null}

          {postData.url.includes('v.redd.it') ? (
            <video controls className='videoFull'>
            <source src={postData.url + '/DASH_480.mp4' } type="video/mp4" />
            Your browser does not support the video tag.
          </video> 
          ): null}

          {postData.url.includes('gallery') ? (
            <Slider {...settings} className='galleryFull'>
              {postData.gallery_data.items.map((item, index) => (
                  
              <img src={`https://i.redd.it/${item.media_id}.jpg`} alt={index}/>
              ))}
            </Slider>
          ) : null}

          <div className='footerFull'>
          <p className='likess'><img src='images/blue-like-button-icon.png' alt='' className='side-x-img'/> {postData.ups}</p>
          <p className='commentss'><img src='images/comments.png' alt='' className='side-x-img'/> {postData.num_comments}</p>
          </div>
          </div>
        </div>
 
    <div>
      <h2 className='comments-title'>Comments</h2>
      {comment.map((commentt) => (
        <div key={commentt.id} className='comment-container'>
          <h4>{commentt.author}</h4>
          <p>{commentt.body}</p>
        </div>
      ))}
    </div>
    <button id={displayFull} title="Go to top" onClick={scrollTop} >
      Top
    </button>
    <button id='back' title="Go back" onClick={goBack} >
      Back
    </button>
   </div>
  )}


export default FullPost;
