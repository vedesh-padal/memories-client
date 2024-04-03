import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'
import { useDispatch } from "react-redux";  // this allows us to dispatch an action

import { getPosts } from './actions/posts'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './images/memories.png'
import useStyles from './styles'

const App = () => {

    const [currentId, setCurrentId] = useState(null);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                    <Typography className={classes.heading} variant="h2" align='center'>Memories</Typography>
                    <img className={classes.img} src={memories} alt='memories' height='60'/>
                </div>
                
            </AppBar>
            <Grow in>   
                <Container>
                    <Grid container 
                        sx={{
                            '@media (max-width: 600px)': {
                                flexDirection: 'column-reverse'
                            }
                        }}
                        className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
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
        </Container>
    )
}

export default App;