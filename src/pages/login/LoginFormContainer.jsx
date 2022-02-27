import React from 'react'
import {makeStyles} from '@mui/styles'
import { Button, CircularProgress, Grid, TextField, Typography, useTheme } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import { gql, useLazyQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'


const initialFormState = {
    email : {
        value : "",
        error : false,
        helperText : ""
    },
    password : {
        value : "",
        error : false,
        helperText : ""
    }
}

const initialErrorMessage = null

const theme = createTheme()

const useStyles = makeStyles(() => ({
   
    button : {   
       paddingTop : '30px', 
       paddingLeft : '100px'
    },
    text : {
        paddingTop : '10px',
        paddingLeft : '50px',
        color:'red',
        
    }
  
}))

const LOGIN_USER = gql`

query loginUser($email:String!, $password:String!){
    loginUser(input:{email:$email, password:$password})
}

`

export default function LoginFormContainer(props){

    const classes = useStyles()
    const theme = useTheme()
    let history = useHistory()

    const [form,setForm] = React.useState(initialFormState)
    const [errorMessage, setErrorMessage] = React.useState(initialErrorMessage)

    const handleChange = field => event =>{

        if(event.target.value.length>0){
            setForm({...form, [field]:{value:event.target.value,error:false,helperText:""}})
        }
        else{
            setForm({...form, [field]:{value:event.target.value,error:true,helperText:"Required"}})
        }

    }

    const loginValidation = () => {

        let data = {...form}
        let errorFlag = false

        if(data.email.value.length === 0){
            errorFlag = true
            data.email = { ...data.email, error : true, helperText : "Required"}
        }
        else if(data.password.value.length === 0){
            errorFlag = true
            data.password = { ...data.password, error : true, helperText : "Required"}
        }

        setForm(data)
        return errorFlag

    }

    const [loginUser, {loading, data, error}] = useLazyQuery(LOGIN_USER,{fetchPolicy:'network-only'})

    const handleLogin = ()=>{

        if(!loginValidation()){
            loginUser({variables : {
                email : form.email.value,
                password : form.password.value
            }})
        }

    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            handleLogin()
        }
    }

    if(!loading && data){
        const token = data.loginUser
        window.localStorage.setItem('token',token)

            /**Navigate to the homepage */
        history.push('/home')
    }

    if(loading){
        return(
            <div>
                <ThemeProvider theme={theme}>
                <Grid container justify="center" direction="column" alignItems="center" className={classes.root} >
                    <Grid container justify="center" direction="row" alignItems="center">
                        <CircularProgress color="primary" disableShrink />
                    </Grid>
                </Grid>
                </ThemeProvider>
            </div> 
        )
    }

    return(
        <React.Fragment>
            <Grid container  spacing={2} onKeyDown={handleKeyDown}>
               
                <Grid container >
                <Grid item xs={12} className={classes.text}>
                    <TextField fullWidth variant="filled" style={{color:'red'}} margin="dense" name="Email-ID" label="Email" placeholder="Email ID" value={form.email.value} error={form.email.error} helperText={form.email.helperText} onChange={handleChange('email')} />
                </Grid>
                </Grid>
                <Grid container >
                <Grid item xs={12} className={classes.text}>
                    <TextField fullWidth variant="filled" margin="dense" name="Password" label="Password" placeholder="Password" type="password" value={form.password.value} error={form.password.error} helperText={form.password.helperText} onChange={handleChange('password')} />
                </Grid>
                </Grid>
                <Grid container justify="center">
                {
                    error && (
                        <Grid item xs={8}>
                            <Typography variant="subtitle2" color="error" align="center">{error.message}</Typography>
                        </Grid>
                    )
                }
                </Grid>
                <Grid container justify="center">
                <Grid item xs={10} className={classes.button}>
                    <Button fullWidth variant="contained" style={{backgroundColor:'red'}} onKeyDown={handleKeyDown} onClick={handleLogin}>Login</Button>
                </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="text" color="error" onClick={props.toggleForm}>New User? Register Here</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}