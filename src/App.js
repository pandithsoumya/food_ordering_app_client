import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { CircularProgress, CssBaseline, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { deepOrange } from '@mui/material/colors';

import { PageNotFound } from './components/common/PageNotFound'
import PrivateRoute from './components/common/PrivateRoute'
import LoginPageContainer from './pages/login/LoginPageContainer'


const HomePageContainer = React.lazy(() => import('./pages/home/HomePageContainer'))


export default function App(props) {


  const theme = createTheme({
    palette: {
      background: deepOrange[100]
    }
  })

  /**
   * Displayed in the Window Title
   */
  const AppName = "Order your Food Now and Relax at Home"

  return (
    <React.Fragment>
      <CssBaseline />
      <React.Suspense fallback={
        <div>
          <Grid style={{ minHeight: '100vh' }} container alignItems="center" justify="center" direction="column">
            <Grid item xs={12}>
              <CircularProgress color="secondary" disableShrink />
            </Grid>
          </Grid>
        </div>
      }>

        <Switch>
          <Route path="/" exact >
            <LoginPageContainer />
          </Route>
          <PrivateRoute  path="/home" exact component={HomePageContainer} authorizedRole={["admin","user"]} />
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </React.Suspense>
    </React.Fragment>

  )
}