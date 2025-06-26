import React from 'react';
import { Grid, CircularProgress } from '@mui/material'
import {useSelector} from 'react-redux';
import Post from './post/Post';
import useStyle from './style';

    
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state)=> state.posts)
  const classes = useStyle();

  if( !posts.length && !isLoading ) return 'No Posts';
  
  return (
    isLoading ? <CircularProgress /> : (
      <Grid  className = {classes.container } container  alignItems = "stretch" spacing = {3}>
         {posts.map((post)=>(
          <Grid key = {post._id} item xs = {12} sm = {6} lg = {3}>
              <Post setCurrentId = { setCurrentId } post = {post} />
          </Grid>
         ))}
      </Grid>
    )
  )
}

export default Posts;