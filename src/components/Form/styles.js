import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: "8px",
    },
  },
  paper: {
    padding: "16px", // theme.spacing(1) isn't working: theme.spacing is not a function
    // marginRight: "-40px",
    // marginLeft: "40px"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },  
  buttonSubmit: {
    marginBottom: 10,
  },
}));