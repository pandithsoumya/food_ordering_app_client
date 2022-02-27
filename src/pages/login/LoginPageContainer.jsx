import React from 'react'
import {createStyles, makeStyles} from '@mui/styles'
import { Grid, Paper, Typography, CssBaseline, useTheme } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import loginIcon from '../../assets/login.jpg'

import {  red, orange } from '@mui/material/colors'

import { useApolloClient } from '@apollo/client'
import LoginFormContainer from './LoginFormContainer'
import FormContainer from './FormContainer';

const theme =createTheme()

const useStyles = makeStyles(()=>({
    root : {
        maxWidth : 'lg',
        backgroundColor: orange[200],
        height : '100%',
        minHeight : '100vh'
    },
    
    paper: {
        background: orange[200],
        padding: theme.spacing(2),
        maxWidth : '400px',
        marginLeft : '750px',
        marginTop : '100px',
        textAlign: 'center',
        marginBottom : '60px'
    },
    login : {
       padding : '15px',
        
    },
    logo: {
        height: 60,
        width: 80,
    }
}))

export default function LoginPageContainer(props){

    const classes = useStyles()
    const theme = useTheme()

    /**
     * When login page is loaded clear the jwt token present in the localstorage
     */
    window.localStorage.removeItem('token')

    const apolloClient = useApolloClient()
    apolloClient.clearStore()
    
    return(
           <ThemeProvider theme={theme}>
            <CssBaseline />
            <Grid className={classes.root} container alignItems="left" justify="left">
                
               <Paper elevation={5} style={{background:orange[300]}} className={classes.paper}>
               <Grid item xs={12} >
                    <img src={loginIcon} alt="Order food" className={classes.logo} />
                </Grid>
                <Grid item xs={12}  justify="center">
                    <Typography variant="h6" style={{fontStyle:'italic',fontFamily:'serif',fontWeight:'bold' ,color:red[500]}}>Login to Order your Food Now!!</Typography>
                </Grid>
                <Grid item xs={12}  >
                    <FormContainer />
                </Grid>
               </Paper>
            </Grid>
       </ThemeProvider>
    )

}