import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../actions/posts';
import useStyles from './styles';

import Stack from "@mui/material/Stack"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; 

const Paginate = ({ page }) => {

    const { numberOfPages } = useSelector((state) => state.posts);
    // console.log(numberOfPages);

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

    console.log('current page: ' + page);
    return (
        // <Pagination 
        //     classes={{ ul: classes.ul }}
        //     count={ numberOfPages }
        //     page={ Number(page) || 1 }
        //     variant='outlined'
        //     color='primary'
        //     onChange={handlePageChange}
        //     renderItem={ (item) => (
        //         console.log(item.page, item.selected);
        //         <PaginationItem 
        //             { ...item } 
        //             component={ Link } 
        //             to={`/posts?page=${item.page}`} 
        //         />
        //     ) }
        // />
        <Stack spacing={2}> 
            <Pagination 
                classes={{ ul: classes.ul }}
                onChange={handlePageChange} 
                count={ numberOfPages }
                page={ Number(page) || 1 }
                color='primary'
                renderItem={(item) => {
                    console.log(item.page);
                    console.log(page);
                    return <PaginationItem 
                        components={{  
                            previous: ArrowBackIcon,  
                            next: ArrowForwardIcon  
                        }} 
                        {...item} 
                        component={ Link } 
                        to={`/posts?page=${item.page}`} 
                        classes={{ selected: classes.selected }}
                        selected={item.page === page}
                    /> 
                }} 
            /> 
        </Stack> 
    )
}

export default Paginate;