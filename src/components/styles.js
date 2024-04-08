import { makeStyles } from '@mui/styles'

export default makeStyles((theme) => ({
    ul: {
        justifyContent: 'space-around'
    },
    // selected: {
    //     backgroundColor: theme.palette.primary.main,
    //     color: 'white',
    //     '&:hover': {
    //         backgroundColor: theme.palette.primary.dark,
    //     },
    // }
    selected: {
        backgroundColor: 'red', // Change this to the desired color
        color: 'white', // Change this to the desired color
      },
}))