import React from 'react'
import {makeStyles} from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Grid , Typography, useTheme} from '@mui/material'
import BlockIcon from '@mui/icons-material/Block';

const theme = createTheme();
const useStyles = makeStyles(() => ({
    root: {
        marginTop: theme.spacing(14),
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
        maxHeight: '90vh'
    }
}))

export default function UnauthorizedPageContainer() {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={classes.root}>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                    <Typography variant="h4" color="inherit" align="center"><BlockIcon fontSize="large" align="center" color="inherit" /></Typography>
                    <Typography variant="h6" color="inherit" align="center">Access Denied</Typography>
                    <Typography variant="body2" color="inherit" align="center">You do not have the required permissions to access this page</Typography>
                </Grid>
            </Grid>
        </div>
    )
}