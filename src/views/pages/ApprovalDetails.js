import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Grid, Paper } from '@mui/material';

const ApprovalDetails = ({ approval, onApprove }) => {
  const handleApprove = async () => {
    try {
      await onApprove();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4">Approval Details</Typography>
          <Typography variant="h6">Username: {approval.username}</Typography>
          <Typography variant="body1">Transaction ID: {approval.transactionId}</Typography>
          <Typography variant="body1">Amount: ${approval.transactionAmount}</Typography>
          <Typography variant="body1">Gateway: {approval.gateway}</Typography>
          <Typography variant="body1">Status: {approval.status}</Typography>
          <Typography variant="body1">Requested on: {new Date(approval.createdAt).toLocaleString()}</Typography>
          <img
            src={`${process.env.REACT_APP_API_HOST}/${approval.image}`}
            alt={approval.username}
            style={{ width: '100%', marginTop: '20px' }}
          />
          <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} onClick={handleApprove}>
            Approve Request
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

ApprovalDetails.propTypes = {
  approval: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
    transactionAmount: PropTypes.number.isRequired,
    gateway: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onApprove: PropTypes.func.isRequired
};

export default ApprovalDetails;
