import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Stack from "@mui/material/Stack"; 

import { getPosts } from '../actions/posts';
import useStyles from './styles';


const Paginate = ({ page }) => {

    const { numberOfPages } = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) {
            dispatch(getPosts(page));
        }
        
    }, [dispatch, page]);

    const handlePageChange = (event, value) => {
        dispatch(getPosts(value));
    }

    return (
        <Stack spacing={2}>
            <Pagination 
                classes={{ ul: classes.ul }}
                count={ numberOfPages } 
                // page={ Number(page) }
                variant="outlined" 
                shape="rounded" 
                color='primary'
                onChange={handlePageChange}
                renderItem={ (item) => (
                    <PaginationItem 
                        { ...item }
                        component={ Link }
                        to={`/posts?page=${item.page}`}
                    />
                )}
            />
        </Stack>
    )
}

export default Paginate;