import React from 'react'

import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { gql, useMutation, useQuery } from '@apollo/client'

const initalFormState = {
    email : {
        value : "",
        error : false,
        helperText : ""
    },
    password1 : {
        value : "",
        error : false,
        helperText : ""
    },
    password2 : {
        value : "",
        error : false,
        helperText : ""
    }
}

const initialRegistrationCompleteState = false
const initalErrorMessage = null


const REGISTER_USER = gql`

mutation registerUser($email:String!, $password:String!){
    registerUser(input:{email:$email, password:$password}){
        userID
    }
}

`


export default function RegistrationFormContainer(props){

    const [form, setForm] = React.useState(initalFormState)
    const [isRegistrationComplete, setRegistrationComplete] = React.useState(initialRegistrationCompleteState)
    const [errorMessage,setErrorMessage] = React.useState(initalErrorMessage)

    const [registerUser] = useMutation(REGISTER_USER)

    
    const handleChange = field => event => {
        if(event.target.value.length > 0 || event.target.value !== ""){
            setForm({...form,[field] : {value : event.target.value, error : false, helperText : ""}})
        }
        else{
            setForm({...form, [field] : { value : event.target.value, error : true, helperText : "Required"}})
        }

    }

    const registerValidation = () => {

        if(form.email.value.length === 0 || form.password1.value.length === 0 || form.password2.value.length === 0){
            return true
        }

        let data = {...form}
        const emailRegex = new RegExp(/[a-z|A-Z|0-9|.]+@gmail.com/g)
        let errorFlag = false 

        if(!emailRegex.test(data.email.value)){
            errorFlag = true
            data.email.error = true
            data.email.helperText = "Provide valid Gmail ID"
        }
        else if(data.password1.value !== data.password2.value){
            errorFlag = true
            data.password1 = {...data.password1, error : true, helperText : "Passwords don't match"}
            data.password2 = { ...data.password2, error : true, helperText : "Passwords don't match"}
        }

        setForm(data)
        return errorFlag

    }

    const handleUserRegistration = () => {
        console.log('inside func')
        if(!registerValidation()) 
        {
            registerUser({variables : {
                email : form.email.value,
                password : form.password1.value      
            }}).
            then(data => {
                console.log(data)
                 if(data.data.registerUser.userID){

                    setRegistrationComplete(true)

                }

            }).catch(error => {
                console.log('err',error)
                setErrorMessage(error.message)
            })
        }

    }

    if(isRegistrationComplete){

        return(
            <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="textPrimary" align="center">Registration Completed</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" color="textSecondary" align="center">Proceed to Sign in</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={props.toggleForm}>Sign in</Button>
                </Grid>
            </Grid>
        )

    }

    return(
        <React.Fragment>
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" color="textPrimary">Register</Typography>
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth size="small" variant="filled" name="email" label="Email" placeholder="Email ID" {...form.email} onChange={handleChange('email')} />
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth size="small" variant="filled" name="password1" label="Password" type="password" placeholder="Enter Password" {...form.password1} onChange={handleChange('password1')} />
                </Grid>
                <Grid item xs={10}>
                    <TextField fullWidth size="small" variant="filled" name="password2" label="Confirm Password" type="password" placeholder="Re-enter Password" {...form.password2} onChange={handleChange('password2')} />
                </Grid>
               
                {
                    errorMessage && (
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" color="error" align="center">{errorMessage}</Typography>
                        </Grid>
                    )
                }
                <Grid item xs={10}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleUserRegistration}>Register</Button>
                </Grid>
                <Grid item xs={8}>
                    <Button fullWidth variant="text" color="secondary" onClick={props.toggleForm} >Already Registered? Login Here</Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}