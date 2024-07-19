import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import ReferralDetails from './ReferralDetails';

const ReferenceApproval = () => {
  const [approvals, setApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);

  const fetchPendingApprovals = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/referral/pending-approvals`);
      setApprovals(response.data);
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
    }
  };

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const handleApprovalClick = (approval) => {
    setSelectedApproval(approval);
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/approvals/referral/approve`, { id: selectedApproval._id });
      console.log(response.data); // Assuming the backend sends a success message
      setApprovals(approvals.filter((approval) => approval._id !== selectedApproval._id));
      setSelectedApproval(null); // Reset to show the list again after approval
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (feedback) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/approvals/referral/reject`, {
        id: selectedApproval._id,
        feedback
      });
      console.log(response.data); // Assuming the backend sends a success message
      setApprovals(approvals.filter((approval) => approval._id !== selectedApproval._id));
      setSelectedApproval(null); // Reset to show the list again after rejection
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {selectedApproval ? (
        <Grid item xs={12}>
          <ReferralDetails approval={selectedApproval} onApprove={handleApprove} onReject={handleReject} />
        </Grid>
      ) : (
        approvals.map((approval) => (
          <Grid item xs={12} sm={6} md={4} key={approval._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">Username: {approval.username}</Typography>
                <Typography variant="body2">Transaction ID: {approval.transactionId}</Typography>
                <Typography variant="body2">Amount: ${approval.transactionAmount}</Typography>
                <Typography variant="body2">Gateway: {approval.gateway}</Typography>
                <Typography variant="body2">Status: {approval.status}</Typography>
                <Typography variant="body2">Requested on: {new Date(approval.createdAt).toLocaleString()}</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleApprovalClick(approval)}>
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ReferenceApproval;
