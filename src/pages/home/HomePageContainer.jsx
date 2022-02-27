import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import { Grid, Paper, Typography, Container, useTheme, Button, Box, IconButton, Tooltip } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { orange } from '@mui/material/colors';
import AccountCircle from '@mui/icons-material/AccountCircle';
import freeDelivery from '../../assets/free_delivery.jpg'

import RestaurantsContainer from './RestaurantsContainer';

const theme = createTheme();

const useStyles = makeStyles(()=>({
    root : {
        marginTop : theme.spacing(2),
        backgroundColor : orange[200],
        height : '100%',
        minHeight : '100vh'
    },
    logout: {
        textAlign:"right",
        paddingLeft : theme.spacing(2),
    },
    logo : {
        //alignSelf : 'left',
        height : 100,
        width : 150,
       // marginTop : '20px'
    },
    freedelivery : {
        width : 150,
        height: 80,
      
        paddingBottom : '10px'
       
    }
   
}))

export default function HomePageContainer(props){

    const classes = useStyles()
    const theme = useTheme()
    let history = useHistory()

    const handleLogout = () => {

        window.localStorage.removeItem('token')
        history.push('/')

    }

    return (
        
        <Container maxWidth="xl" className={classes.root}>
        <Grid container  alignItems="flex-start" justify="flex-start" spacing={2}>
            <Grid item xs={2}>
            <img src={freeDelivery} alt="free" className={classes.freedelivery}  />
          
            </Grid>
            <Grid item xs={8}>
            <Typography variant='h5' style={{color:'red',textAlign:'left',fontSize : 30, fontStyle:'oblique',fontWeight:'bold' ,fontFamily:'serif'}}>Craving your favourite food? Order now and Enjoy!!</Typography>
            
            </Grid>
           
            <Grid item xs className={classes.logout}>
          <Tooltip title='Account'><IconButton size='small'><AccountCircle  style={{color:'red',marginRight:'10px'}} /></IconButton></Tooltip> 
            <Button variant='contained' size='small' style={{backgroundColor:'red'}} onClick={handleLogout}>Logout</Button>
            </Grid>
            <Grid item xs={12}>
            { (props.role === "admin" || props.role === "user") &&  <RestaurantsContainer /> }
            </Grid>

        </Grid>
    </Container>
   
    )
}
