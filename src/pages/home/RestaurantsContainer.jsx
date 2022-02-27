import React, { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import { gql, useQuery } from '@apollo/client'
import { Grid, Typography, Button, useTheme, ButtonBase, CircularProgress,FormControl, InputLabel, InputBase, Divider, MenuItem, Select, Paper, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { green, yellow, orange } from '@mui/material/colors';
import StarRateIcon from '@mui/icons-material/StarRate';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

var location = '';
let newArr = []

const theme = createTheme();

const useStyles = makeStyles(() => ({
    root: {

    },
    image: {
        height: 120,
        width: 150
    }
}))

const getRatingColor = (rating) => {
    if (rating > 4) {
        return green[800]
    }
    else if (3 < rating && rating < 4) {
        return green[300]
    }
    else if (rating < 3) {
        return orange[600]
    }
}

const FETCH_RESTAURANTS = gql`
query getRestaurants  {
    getRestaurants {
        id,
        name,
        cuisine,
        cost,
        rating,
        delivery_time,
        image,
        place
    }
}
`



export default function RestaurantsContainer(props) {

    const classes = useStyles()
    const theme = useTheme()
    const [q, setQ] = useState('');
    const [searchParam] = useState(["name", "cuisine"]);
    const [filterParam, setFilterParam] = useState(["All"]);
    const [sortActive, setSortActive] = useState(true);


    const { loading, data, error } = useQuery(FETCH_RESTAURANTS, { fetchPolicy: "network-only" })



    if (loading) {
        return (
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid item xs={1}>
                    <CircularProgress disableShrink color="primary" size={24} />
                </Grid>
            </Grid>
        )
    }

    if (error) {
        return (
            <Grid container alignItems="center" justify="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="subtitle2" color="error" align="center">Error in fetching data...</Typography>
                </Grid>
            </Grid>
        )
    }

    
    const search = (items) => {

        // return items.filter((item) => {
        //     return searchParam.some((res) => {
        //         return (
        //             item[res]
        //                 .toString()
        //                 .toLowerCase()
        //                 .indexOf(q.toLowerCase()) > -1
        //         );
        //     });
        // });

        return items.filter((item) => {
           
               if (item.place == filterParam) {
                   return searchParam.some((newItem) => {
                     return (
                       item[newItem]
                           .toString()
                           .toLowerCase()
                           .indexOf(q.toLowerCase()) > -1
                                );
                            });
                        } else if (filterParam == "All") {
                            return searchParam.some((newItem) => {
                                return (
                                    item[newItem]
                                        .toString()
                                        .toLowerCase()
                                        .indexOf(q.toLowerCase()) > -1
                                );
                            });
                        }
                    });
    }

 
    const sortByPrice = () => {

        
        setSortActive(!sortActive)
       
             if(sortActive) {
               data.getRestaurants.sort((a,b) => (a.cost).localeCompare(b.cost))
             }
             else  {
                data.getRestaurants.sort((a,b) => (a.cost).localeCompare(b.cost))
                data.getRestaurants.reverse()
            }
        console.log(data.getRestaurants)
        
    }

    return (

        // <Container maxWidth="xl" className={classes.root}>
        <Grid container alignItems="flex-start" justify="flex-start" spacing={2}>
            {/* <Grid item xs={12} > */}
            <Grid item xs={4}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', background: orange[300], alignItems: 'center', marginLeft: '180px', width: 300, marginBottom: '20px' }}
                >

                    <InputBase
                        sx={{ ml: 1, flex: 1, }}
                        placeholder="Search Restaurants or Cuisines"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />


                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon style={{ color: 'red' }} />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <FormControl  fullWidth>
               
                    <InputLabel id="demo-simple-select-label" style={{marginLeft:'180px',color:'red'}}>Location</InputLabel>
                <Select
                        style={{ marginLeft: '180px',height:'45px' ,color:'red',background:orange[300]}}
                        onChange={(e) => { setFilterParam(e.target.value) }}
                        
                        label="Location"
                    >
                        <MenuItem value="All">
                            <em>All </em>
                        </MenuItem>
                        
                        {

                            data && data.getRestaurants.map(row => (
                                newArr.push(row.place),
                                location = [...new Set(newArr)]
                                
                            )),
                          
                            location.map(row => (                       
                                <MenuItem value={row}>{row}</MenuItem>
                            ))

                        }
                    </Select>
                    </FormControl>
                    {/* </Grid> */}
            </Grid>
            <Grid item xs={4}>
                <Button style={{backgroundColor:orange[300], color:'red',marginLeft:'50px',height:'40px'}} onClick={() => sortByPrice()}><SortIcon></SortIcon> Sort By Price</Button>
            </Grid>

            {
               
               
                search(data.getRestaurants).map((row) => (
                    <Grid>
                        <Paper
                            sx={{
                                p: 2,
                                paddingLeft: '20px',
                                margin: '10px',
                                maxWidth: 500,
                                flexGrow: 1,
                                marginLeft : '50px',
                                backgroundColor: orange[100],

                            }} 
                        >
                            <Grid container spacing={2}>
                                <Grid item >
                                    <ButtonBase sx={{ width: 128, height: 128 }}>
                                        <img alt={row.name} src={row.image} className={classes.image} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                {row.name}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {row.cuisine}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {row.cost}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                               {row.place}, Delivers in {row.delivery_time} mins
                                            </Typography>
                                        </Grid>
                                        <Grid item justifyContent='right'>
                                            <Button size='small' style={{ backgroundColor: 'orange', color: 'red',marginLeft:'180px' }}>View Menu</Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div" style={{ color: getRatingColor(row.rating) }} >
                                            {row.rating} <StarRateIcon fontSize='small' />
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Divider />
                    </Grid>
                ))
            }

        </Grid>
        // </Container>

    )
}
