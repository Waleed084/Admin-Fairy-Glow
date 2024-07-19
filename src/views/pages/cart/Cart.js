import React, { useState, useEffect } from 'react';
import { Typography, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Box, CardActionArea, Button } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/cart`)
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the cart items!', error);
      });
  }, []);

  const handleCardClick = (item) => {
    navigate(`/cart/${item._id}`, { state: { item } });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item, index) => (
          <Grid item xs={12} key={index}>
            <CardWrapper border={false} content={false}>
              <CardActionArea onClick={() => handleCardClick(item)}>
                <Box sx={{ p: 2 }}>
                  <List sx={{ py: 0 }}>
                    <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.largeAvatar,
                            backgroundColor: theme.palette.warning.light,
                            color: theme.palette.warning.dark
                          }}
                        >
                          <Typography variant="h6" color="primary">
                            {item.type[0]}
                          </Typography>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        sx={{
                          py: 0,
                          mt: 0.45,
                          mb: 0.45,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center'
                        }}
                        primary={
                          <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
                            {item.type} by {item.company}
                          </Typography>
                        }
                        secondary={
                          item.properties ? (
                            <Typography variant="body2" color="textSecondary">
                              {Object.entries(item.properties)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(' ')}
                            </Typography>
                          ) : null
                        }
                      />
                    </ListItem>
                  </List>
                </Box>
              </CardActionArea>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </Box>
    </div>
  );
};

Cart.propTypes = {
  isLoading: PropTypes.bool
};

export default Cart;
