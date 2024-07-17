import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const ReferralDetails = ({ approval, onApprove, onReject }) => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleApprove = async () => {
    await onApprove();
  };

  const handleReject = async () => {
    setOpen(false);
    await onReject(feedback);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h4">Approval Request Details</Typography>
          <Typography variant="h6">Username: {approval.username}</Typography>
          <Typography variant="body1">Transaction ID: {approval.transactionId}</Typography>
          <Typography variant="body1">Amount: ${approval.transactionAmount}</Typography>
          <Typography variant="body1">Gateway: {approval.gateway}</Typography>
          <Typography variant="body1">Status: {approval.status}</Typography>
          <Typography variant="body1">Requested on: {new Date(approval.createdAt).toLocaleString()}</Typography>
          <img
            src={`${process.env.REACT_APP_API_HOST}/uploads/${approval.imagePath}`}
            alt="Transaction"
            style={{ width: '100%', marginTop: '10px' }}
          />
          <Button variant="contained" color="primary" sx={{ marginTop: '20px', marginRight: '10px' }} onClick={handleApprove}>
            Approve Request
          </Button>
          <Button variant="contained" color="secondary" sx={{ marginTop: '20px' }} onClick={handleClickOpen}>
            Reject Request
          </Button>
        </Paper>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reject Request</DialogTitle>
        <DialogContent>
          <DialogContentText>Please provide feedback on why you are rejecting this request.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="feedback"
            label="Feedback"
            type="text"
            fullWidth
            variant="standard"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleReject} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

ReferralDetails.propTypes = {
  approval: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
    transactionAmount: PropTypes.number.isRequired,
    gateway: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired
  }).isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
};

export default ReferralDetails;
