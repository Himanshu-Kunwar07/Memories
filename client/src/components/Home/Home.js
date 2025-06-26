import React, {useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button  } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { MuiChipsInput} from 'mui-chips-input';

//import from files
import Pagination from '../pagination/Pagination';
import Posts from '../posts/Posts';
import Form from '../form/Form';

import useStyles from './styles';


function useQuery(){
    return new URLSearchParams(useLocation().search);
}


const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch ] = useState('');
    const [tags, setTags ]  = useState([])

   

    // const handleKeyPress = (e)=>[
    //     if(e.keyCode === 13){
    //         // search Post
    //         searchPost();
    //     }
    // ]

    const handleAdd = (tag)=>{
        setTags(tag)
    }
    
    const handleDelete = (tagToDel)=>{
        setTags(tags.filter((tag)=>tag !== tagToDel));
    }

    const searchPost = ()=>{
        if(search.trim() || tags){
            // dipath => fetch search post
            dispatch(getPostsBySearch( {search, tags: tags.join(',')}))
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else {
            navigate('/');
        }
    }
  return (
    <Grow in>
        <Container maxwidth = 'xl'>
            <Grid  className = {classes.gridContainer} container justify="space-between" alignItems = "stretch" spacing = {3}>
                <Grid item xs = {12} sm = {6} md = {9}>
                    <Posts setCurrentId = {setCurrentId} />
                </Grid>
                <Grid item xs = {12} sm = {6} md = {3}>
                    <AppBar className = { classes.appBarSearch } position = "static" color = "inherit" >
                        <TextField 
                         name = "serach" 
                         variant = "outlined"
                         label = "Search Memories"
                         fullWidth
                        //  onKeyDown = { (e)=> handleKeyPress}
                         value = {search}
                         onChange = {(e)=> setSearch(e.target.value)}
                        />
                        <MuiChipsInput 
                            style = {{margin: '10px 0'}}
                            value = {tags}
                            onChange = {handleAdd}
                            label = "Search Tags"
                            variant = "outlined"
                        />
                        <Button variant = "contained" onClick = {searchPost } className = {classes.searchButton} color = "primary">
                          Search
                        </Button>
                    </AppBar>
                    <Form currentId = {currentId} setCurrentId = {setCurrentId} />
                    {( !searchQuery && !tags.length) && (
                    <Paper elevation = {6} className = {classes.pagination} >
                        <Pagination page = {page} />
                    </Paper>
                    )}
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home