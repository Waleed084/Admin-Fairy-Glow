import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import PropTypes from 'prop-types';

ReceiptTable.propTypes = {
  formData: PropTypes.shape({
    submissionDate: PropTypes.instanceOf(Date), // Update prop type for submissionDate
    route: PropTypes.string,
    Seller: PropTypes.any,
    size: PropTypes.string,
    mattress: PropTypes.string,
    ottoman: PropTypes.string,
    Glift: PropTypes.string,
    Color: PropTypes.string,
    HeadBoard: PropTypes.string,
    customerName: PropTypes.string,
    telNo: PropTypes.string,
    address: PropTypes.string,
    postalCode: PropTypes.string,
    profit: PropTypes.string
  }).isRequired,
  totalValue: PropTypes.number.isRequired
};

function ReceiptTable({ formData }) {
  // Convert submissionDate to a string before rendering
  const submissionDateString = formData.submissionDate.toLocaleString();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Field</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(formData).map((key) => (
          <TableRow key={key}>
            <TableCell>{key === 'submissionDate' ? 'Submission Date' : key}</TableCell>
            <TableCell>{key === 'submissionDate' ? submissionDateString : formData[key]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ReceiptTable;
