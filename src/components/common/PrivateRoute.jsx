import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import jwt from 'jsonwebtoken'

import { makeStyles } from '@mui/styles'
import { gql, useQuery } from '@apollo/client'
import { CircularProgress, Grid } from '@mui/material'

import UnauthorizedPageContainer from '../../pages/unauthorized/UnauthorizedPageContainer'

const useStyles = makeStyles(()=>({
    root : {
        minHeight : '100vh'
    }
}))

const VERIFY_TOKEN = gql`

query validateUser{
    validateUser
}

`

export default function PrivateRoute({component:Component,authorizedRole}){

    const classes = useStyles()
   // let navigate = useNavigate()

    const { loading, data, error } = useQuery(VERIFY_TOKEN,{fetchPolicy:'no-cache'})

    if(loading){

        return(
            <div style={{display:'flex'}}>
                <Grid className={classes.root} container alignItems="center" justify="center" direction="column">
                    <Grid item xs={12}>
                        <CircularProgress color="secondary" disableShrink />
                    </Grid>
                </Grid>
            </div>
        )

    }

    if(error){

        /**
         * Clear the token present in the localstore 
         */
        window.localStorage.removeItem('token')

        return(
            <Redirect to="/" />
        )
    }

    const token = data.validateUser
    const { userID, userName, email, role } = jwt.decode(token)
    
    const isRoleAuthorized = authorizedRole.includes(role)
    console.log(isRoleAuthorized)

    /**Update the new token in the localstore */
   // window.localStorage.setItem('token', token)
   window.localStorage.setItem('token', token)

   
        return(
            
            <Route>     
                 {isRoleAuthorized?<Component role={role}/>:<UnauthorizedPageContainer />}
            </Route>
           
        )
    
}

