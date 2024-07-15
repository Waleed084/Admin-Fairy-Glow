import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CompanyCard from 'ui-component/cards/CompanyCard';

const UKBed = () => {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/ukbeds/types`)
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the UK bed types!', error);
      });
  }, []);

  const handleTypeClick = (type) => {
    navigate(`/pages/companies/${type}`);
  };

  return (
    <div>
      <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h3" gutterBottom sx={{ marginLeft: 2, paddingTop: '7px' }}>
          UK Bed Types
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {types.map((type) => (
          <Grid item xs={12} sm={6} md={4} key={type.type}>
            <CompanyCard isLoading={false} onClick={() => handleTypeClick(type.type)}>
              <Typography variant="h5" style={{ color: '#fff' }}>
                {type.type}
              </Typography>
            </CompanyCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UKBed;
