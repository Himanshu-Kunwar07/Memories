import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../actions/posts';

import useStyles from './styles';

const CommentSections = ({ post }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const [comments, setComments ]  = useState(post?.comments);
    const [comment, setComment ] = useState('');
    const commentsRef  = useRef();

    const handleClick = async()=>{
        const finalComment = `${user.result.name}: ${comment}`;

        const newComment = await dispatch(commentPost(finalComment, post._id));
        setComments(newComment);
        setComment('');

        commentsRef.current.scrollIntoView( {behaviour: "Smooth"})
    }
  return (
    <div>
        <div className = {classes.commentsOuterContainer}>
            <div className = {classes.commentsInnerContainer}>
                <Typography gutterBottom variant = "h6">
                    Comments
                </Typography>
                {comments.map((c, i)=> (
                    <Typography key = {i} gutterBottom variant = "subtitle1">
                        <strong>{c.split(':')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref = {commentsRef} />
            </div>
            {user?.result?.name && ( 
              <div style = {{ width: '70%'}} >
                <Typography gutterBottom variant = "h6">Write a Comment</Typography>
                <TextField 
                    fullWidth
                    rows = {4}
                    variant = "outlined"
                    lable = "Comment"
                    multiline
                    value = {comment}
                    onChange = {(e)=> setComment(e.target.value) }
                />
                <Button style = {{ marginTop: '10px' }} fullWidth disabled = { !comment } variant = "contained" color = "primary" onClick = {handleClick}>
                    comment
                </Button>
            
               </div>
            )}
        </div>
    </div>
  )
}

export default CommentSections;
