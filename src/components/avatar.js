import React, { useState, useEffect } from 'react';
import './avatar.css';

const Avatar = (props) => {
  const { name } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        
        const response = await fetch(`https://www.reddit.com/r/${name}/about.json`);
        const data = await response.json();


        if (data && data.data && data.data.icon_img) {
          setAvatarUrl(data.data.icon_img);
        }
      } catch (error) {
        console.error('Error fetching subreddit information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatar();
  }, [name]); 

  return (
<div className="avatar-container">
      {loading ? (
        <div className="loading">...</div>
      ) : (
        <img
          src={avatarUrl}
          alt='img'
          className="avatar-profile-image"
        />
      )}
    </div>
  )
};

export default Avatar;