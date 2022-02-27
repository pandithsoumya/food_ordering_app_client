import React from 'react'
import { makeStyles } from '@mui/styles'
import { Button, createTheme, Grid, Typography, useTheme } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { orange } from '@mui/material/colors'

const theme = createTheme()
const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    //    marginTop: theme.spacing(10),
        minHeight: '90vh',
    },
    title_404: {
        fontWeight: '900',
        background: orange[200],
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        fontSize: '200px'
    },
    title: {
        fontWeight: '500',
        background: orange[200], 
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
    }
}))

export const PageNotFound = (props) =>  {

    const classes = useStyles()
    const theme = useTheme()
    let history = useHistory()

    return (
        <Grid className={classes.root} container alignItems="center" justify="center" spacing={0}>
            <Grid item xs={12} md={5}>
                <Typography className={classes.title_404} variant="h1" align="center">404</Typography>
            </Grid>
            <Grid item xs={12} md={5}>
                <Grid container alignItems="center" justify="center" spacing={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h2" align="center">Something's Wrong</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h5" align="center">The page you are looking for is not available right now</Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={2}>
                        <Button variant="outlined"   color="error" onClick={() => history.goBack()}>Go Back</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

}