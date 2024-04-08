import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from '@mui/material'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from "../../actions/posts";

// first we have to get the current id of the post we are on

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector( (state) => currentId ? state.posts.post.find((p) => p._id === currentId) : null );
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isTitleValid, setIsTitleValid] = useState(true);
    const [isMessageValid, setIsMessageValid] = useState(true);
    const [areTagsValid, setAreTagsValid] = useState(true);

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handleSubmit = async (e) => {
        // to not to respond to refresh in the browser
        e.preventDefault();

        if (postData.title.trim() && postData.message.trim() && postData.tags.length != 0) {
          // Submit form
          if (currentId)  {
              dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          }   else    {
              dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));           
          }
          clear();
          console.log('Form submitted:', postData);
        } else {
          // Set validation states for empty fields
          setIsTitleValid(postData.title.trim() !== '');
          setIsMessageValid(postData.message.trim() !== '');
          setAreTagsValid(postData.tags.trim() !== '');
        }

        
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories and like 👍 other's memories 😊
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
        setIsTitleValid(true);
        setIsMessageValid(true);
        setAreTagsValid(true);
    }

    return (
      <Paper className={classes.paper} elevation={6}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>

          <TextField
            required
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            // our whole data from the post will be stored in postData object in the state
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            error={!isTitleValid}
            helperText={!isTitleValid && 'Title is required'}
          />
          <TextField
            required
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            error={!isMessageValid}
            helperText={!isMessageValid && 'Message is required'}
          />
          <TextField
            required
            name="tags"
            variant="outlined"
            label="Tags (comma seperated)"
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
            error={!areTagsValid}
            helperText={!areTagsValid && 'Tags are required'}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            style={{ marginBottom: 10 }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    );
}

export default Form;