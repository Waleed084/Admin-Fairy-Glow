import React, { useState, useEffect } from 'react';
import { Typography, Grid, IconButton, Box } from '@mui/material';
import axios from 'axios';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import CompanyCard from 'ui-component/cards/CompanyCard';

const Companies = () => {
  const { type } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_HOST}/api/ukbeds/types/${type}`)
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the companies!', error);
        setLoading(false);
      });
  }, [type]);

  const handleCompanyClick = (company) => {
    navigate(`/pages/properties/${type}/${company}`);
  };

  return (
    <div>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(-1)} color="primary">
          <ArrowBack />
        </IconButton>
        <Typography variant="h3" gutterBottom sx={{ marginLeft: 2, paddingTop: '7px' }}>
          Companies for {type}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CompanyCard isLoading={loading} onClick={() => handleCompanyClick(company)}>
              <Typography variant="h5" style={{ color: '#fff', py: '2' }}>
                {company}
              </Typography>
            </CompanyCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Companies;
