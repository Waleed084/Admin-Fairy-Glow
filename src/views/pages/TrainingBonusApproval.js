import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import ApprovalDetails from './ApprovalDetails';

const TrainingBonusApproval = () => {
  const [approvals, setApprovals] = useState([]);
  const [selectedApproval, setSelectedApproval] = useState(null);

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/approvals/pending-approvals`);
        setApprovals(response.data);
      } catch (error) {
        console.error('Error fetching pending approvals:', error);
      }
    };

    fetchPendingApprovals();
  }, []);

  const handleApprovalClick = (approval) => {
    setSelectedApproval(approval);
  };

  const handleApprove = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/approvals/approve`, { id: selectedApproval._id });
      console.log(response.data); // Assuming the backend sends a success message
      setSelectedApproval(null); // Reset to show the list again after approval
      fetchPendingApprovals(); // Refetch pending approvals to update the list
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      {selectedApproval ? (
        <Grid item xs={12}>
          <ApprovalDetails approval={selectedApproval} onApprove={handleApprove} />
        </Grid>
      ) : (
        approvals.map((approval) => (
          <Grid item xs={12} sm={6} md={4} key={approval._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{approval.username}</Typography>
                <Typography variant="body2">Transaction ID: {approval.transactionId}</Typography>
                <Typography variant="body2">Amount: ${approval.transactionAmount}</Typography>
                <Typography variant="body2">Gateway: {approval.gateway}</Typography>
                <Typography variant="body2">Status: {approval.status}</Typography>
                <Typography variant="body2">Requested on: {new Date(approval.createdAt).toLocaleString()}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleApprovalClick(approval)}>
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

export default TrainingBonusApproval;
