import React, {useState, useEffect } from 'react';
import { Grow, Container, Grid } from '@mui/material';
import { useDispatch } from "react-redux";  // this allows us to dispatch an action

import Posts from '../Posts/Posts';
import Form from '../Form/Form'
import { getPosts } from '../../actions/posts';


const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
    <Grow in>   
        <Container>
            <Grid container 
                sx={{
                    '@media (max-width: 600px)': {
                        flexDirection: 'column-reverse'
                    }
                }}
                justify='space-between' alignItems='stretch' spacing={3}>
            {/* style={{ marginRight: '3rem', marginLeft: '2rem' }} */}
                <Grid item xs={12} sm={7}  >
                    <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home;