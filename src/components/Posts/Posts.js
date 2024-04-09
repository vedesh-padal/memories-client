import React from "react";
import { Grid, CircularProgress } from '@mui/material'
import { useSelector } from "react-redux";

import Post from './Post/Post.js'
import useStyles from './styles'

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);  // in this change (due to pagination):  []  ->  { isLoading, noOfPages, posts: [] }
    const classes = useStyles();

    if (!posts.length && !isLoading)    return 'No Posts!';

    return (
        isLoading ? <div style={{ display: 'flex', alignItems:'center' }}>
        <div style={{ margin: 'auto' }}>
            <CircularProgress size='8rem' sx={{ marginTop: '6rem'}}/> 
        </div>
        </div> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                { posts.map((post) => (
                    // xs => how large or how many parts of width does it take on mobile devices, sm => small and larger
                    <Grid key={post._id} item xs={12} sm={6} lg={3}>  
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;