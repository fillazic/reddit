
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSubreddit, setDisplay } from '../App/redditSlice';
import { selectPostsSearchStatus, searchPosts, selectSearchPosts, fetchSearchPosts } from '../App/redditSearch';
import { setTerm} from '../App/redditSearch';
import { useNavigate } from 'react-router-dom';
import './search.css';

const RedditSearch = () => {

  const dispatch = useDispatch();
  const navigate=useNavigate()
  const term = useSelector(selectSearchPosts);
  const searchStatus= useSelector(selectPostsSearchStatus);
  const searchTerm = useSelector(searchPosts);

  const searchItems= searchTerm.length===0? 'search-items': 'search-response';

  useEffect(() => {
    if(searchTerm.length>0)
    {dispatch(fetchSearchPosts(searchTerm))}

  }, [dispatch, searchTerm]);
    
    const searchHandler = (search) => {
      dispatch(setSubreddit(search));
      dispatch(setTerm(''));
      dispatch(setDisplay('dropdown-content-none'))

      navigate('');
    };
    

    if (searchStatus === 'loading') {
      return <div className={`${searchItems}`}>Loading...</div>;
    }
  
    if (searchStatus === 'failed') {
      return <div className={`${searchItems}`}>search not found</div>;
    }

  return (
    <div className={`${searchItems}`}>

    <div className='result-container'>
            {term.map((terms) => (
              <div 
                  key={terms.id} className='results' 
                  onClick={()=>searchHandler(`/${terms.subreddit_name_prefixed}`)}>
                <h4>{terms.subreddit_name_prefixed}</h4>
                <h5>Posted by:{terms.subreddit_subscribers}</h5>
              </div>
            ))}
    </div>
    </div>
    
  );
};

export default RedditSearch;
