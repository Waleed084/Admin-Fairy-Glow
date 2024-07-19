import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, MenuItem, FormControl, Select, InputLabel, Box, IconButton } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const OrderDetails = () => {
  const { type, company } = useParams();
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/inventory/properties/${type}/${company}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setProperties(response.data[0].properties);
        } else {
          setProperties([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the properties!', error);
        setError('Error fetching properties');
        setLoading(false);
      });
  }, [type, company]);

  const handlePropertyChange = (property, value) => {
    setSelectedProperties({
      ...selectedProperties,
      [property]: value
    });
  };

  const handleAddToCart = () => {
    const order = {
      type,
      company,
      properties: selectedProperties
    };

    axios
      .post(`${process.env.REACT_APP_API_HOST}/api/cart`, order)
      .then(() => {
        navigate('/utils/cart');
      })
      .catch((error) => {
        console.error('There was an error adding the order to the cart!', error);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <div>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" gutterBottom sx={{ marginLeft: 2, paddingTop: '7px' }}>
          Select Properties for {type} by {company}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {properties.length > 0 ? (
          properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.name}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{property.name}</InputLabel>
                <Select
                  value={selectedProperties[property.name] || ''}
                  onChange={(e) => handlePropertyChange(property.name, e.target.value)}
                  label={property.name}
                >
                  {property.choices.map((choice) => (
                    <MenuItem key={choice} value={choice}>
                      {choice}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))
        ) : (
          <Typography>No properties available for this selection.</Typography>
        )}
      </Grid>
      <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: 3 }}>
        Add to Cart
      </Button>
    </div>
  );
};

export default OrderDetails;
