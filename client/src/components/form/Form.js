import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@mui/material'
import FileBase64 from 'react-file-base64';
import useStyle from './style';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

//Of current Id:

    
const Form = ({ currentId, setCurrentId })=>{

    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: '',
    });
    const post = useSelector((state)=> currentId ? state.posts.posts.find((p) => p._id === currentId): null );
    const classes = useStyle();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(()=>{
        if(post) setPostData(post);
    },[post])
    
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        }
        else {
            console.log(postData);
            dispatch(createPost({...postData, name: user?.result?.name }, navigate));
        }
        clear();
    }

    if(!user?.result?.name) {
        return (
            <Paper className = {classes.paper}>
                <Typography variant = "h6" align = "center">
                    Please Sign In to create your own memories and like Other's memories
                </Typography>
            </Paper>
        )
    }
    const clear = ()=>{
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '',    })
    }

    return (
        <Paper className = {classes.paper} elevation = {6} >
            <form  autoComplete = "off" noValidate className = {`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
                <Typography variant = "h6">
                   { currentId ? 'Editing': 'Creating' } a Memory
                </Typography>
                <TextField name  = "title" variant = "outlined"  label = "Title" fullWidth value = {postData.title} onChange = {(e)=> setPostData({ ...postData, title: e.target.value})}/>
                <TextField name  = "message" variant = "outlined"  label = "Message" fullWidth value = {postData.message} onChange = {(e)=> setPostData({ ...postData, message: e.target.value})}/>
                <TextField name  = "tags" variant = "outlined"  label = "Tags" fullWidth value = {postData.tags} onChange = {(e)=> setPostData({ ...postData, tags: e.target.value.split(",")})}/>
                <div className = {classes.fileInput}>
                       <FileBase64 
                        type = "file"
                        multiple = {false}
                        onDone = {({base64})=> setPostData({...postData, selectedFile: base64})}
                       /> 
                </div>
                <Button className = {classes.buttonSubmit} variant = "contained" color = "primary" size = "large" type = "submit" fullWidth>Submit</Button>
                <Button variant = "contained" color = "secondary" size = "small" type = "submit" onClick = {clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )

};


export default Form;