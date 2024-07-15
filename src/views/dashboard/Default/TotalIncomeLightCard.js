import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText, Typography, Button, CircularProgress } from '@mui/material';

// material-ui
import { styled } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// styles
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

const TotalIncomeLightCard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/files`);
      setFiles(response.data.files);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const downloadFile = async (fileId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/download/${fileId}`, {
        responseType: 'blob' // specify response type as blob
      });
      // create a temporary anchor element to trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition'].split(';')[1].trim().split('=')[1]); // extract filename from content-disposition header
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // remove the link from the DOM once downloaded
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Latest Prices
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {files.map((file) => (
              <ListItem key={file._id}>
                <ListItemText primary={file.filename} />
                <Button variant="contained" color="primary" onClick={() => downloadFile(file._id)}>
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </CardWrapper>
  );
};

export default TotalIncomeLightCard;
