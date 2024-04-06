import React from "react";
import { Grid, CircularProgress } from '@mui/material'

import { useSelector } from "react-redux";

import Post from './Post/Post.js'
import useStyles from './styles-posts'

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts)
    const classes = useStyles();

    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                { posts.map((post) => (
                    // xs => how large or how many parts of width does it take on mobile devices, sm => small and larger
                    <Grid key={post._id} item xs={12} sm={6} >  
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Posts;