import React from 'react';
import { Typography, Grid, Card, CardContent, Box, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CartOrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state;

  if (!item) {
    return <Typography>No item details available</Typography>;
  }

  return (
    <div>
      <Box display="flex" alignItems="center" mb={3}>
        <Button onClick={() => navigate(-1)} color="primary">
          Back
        </Button>
        <Typography variant="h4" gutterBottom sx={{ marginLeft: 2, paddingTop: '7px' }}>
          Order Details for {item.type} by {item.company}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {item.type} by {item.company}
              </Typography>
              <Typography variant="body1">
                Properties:{' '}
                {Object.entries(item.properties)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default CartOrderDetail;
