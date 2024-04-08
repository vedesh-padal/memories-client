import { makeStyles } from '@mui/styles';

export default makeStyles({
  buttonLike: {
    position: 'relative',
    padding: '10px 20px',
    border: '1px solid #ddd',
    borderRadius: 4,
    cursor: 'default',
    transition: 'all 0.2s ease-in-out',

    '&:hover': {
      backgroundColor: '#eee',
      cursor: 'pointer',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 'inherit',
      opacity: 0,
      transition: 'opacity 0.2s ease-in-out',
    },

    '&:hover::after': {
      opacity: 0.2,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
  },
});
