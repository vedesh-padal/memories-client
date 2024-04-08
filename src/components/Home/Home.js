import React, {useState, useEffect } from 'react';
import { Grow, Container, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { useDispatch } from "react-redux";  // this allows us to dispatch an action
import { useNavigate, useLocation } from 'react-router-dom';
import { MuiChipsInput } from 'mui-chips-input';

import Pagination from '../Pagination';
import Posts from '../Posts/Posts';
import Form from '../Form/Form'
import { getPosts, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useNavigate().search);
}


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const classes = useStyles();
    const navigate = useNavigate();
    const page = query.get('page') || 1; // this will read the URL and returns the value of that parameter
    const searchQuery = query.get('searchQuery');

    // here removed "fetching posts from Home.js (using useEffect), to implement pagination"

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13)   {   // 'enter' key
            // search for the post 
            searchPost();
        }
    }

    const handleAdd = (tag) => setTags([ ...tags, tag ]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));
    const handleEdit = () => {};
    const searchPost = () => {
        if (search.trim() || tags)  {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));

            // CLIENT SIDE ROUTING
            navigate(`/posts/search?searchQuery=${ search || 'none' }&tags=${ tags.join(',') }`);
        }   else {
            navigate('/');
        }
    }

    return (
        <Grow in>   
            <Container maxWidth='xl'>
                <Grid container 
                    sx={{
                        '@media (max-width: 600px)': {
                            flexDirection: 'column-reverse'
                        }
                    }}
                    className={classes.gridContainer}
                    justify='space-between' alignItems='stretch' spacing={3}>
                {/* style={{ marginRight: '3rem', marginLeft: '2rem' }} */}
                    <Grid item xs={12} sm={6} md={9} >
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search' 
                                variant='outlined' 
                                label='Search Memories' 
                                fullWidth
                                onKeyDown={handleKeyPress}
                                value={search}
                                onChange={ (e) => setSearch(e.target.value) }
                            />
                            <MuiChipsInput 
                                sx={{ margin: '10px 0' }}
                                value={tags}
                                onChange={ handleAdd }
                                onDeleteChip={ handleDelete }
                                onEditChip={ handleEdit }
                                label='Search Tags'
                                variant='outlined'
                                hideClearAll
                            />
                            <Button onClick={ searchPost } variant='contained' className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                        { console.log(searchQuery) }
                        { (!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} className={classes.pagination}/>
                            </Paper>
                        )}

                        
                    </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home;