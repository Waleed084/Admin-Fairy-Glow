import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import axios from 'axios';
//Project Imports
import { useAuth } from 'views/pages/authentication/AuthContext';
import TSleighHeadTable from './TSleighHeadTable';
import TDevanHeadTable from './TDevanHeadTable';
import TMattressHeadTable from './TMattressHeadTable';

export default function OrderSeller() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [thisMonthSubmissions, setThisMonthSubmissions] = useState([]);
  const [selectedType, setSelectedType] = useState('Luxury Bed'); // Default to Sleigh orders
  const [checkboxState, setCheckboxState] = useState(false);
  const { username } = useAuth(); // Access the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/submissions/sleigh/${username}`);
        setThisMonthSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [username]);

  const handleCheckboxChange = (orderId) => {
    // Logic for handling checkbox change and updating selectedOrders state
    // For example:
    // If orderId is in selectedOrders, remove it; otherwise, add it
    const selectedIndex = selectedOrders.indexOf(orderId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedOrders, orderId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedOrders.slice(1));
    } else if (selectedIndex === selectedOrders.length - 1) {
      newSelected = newSelected.concat(selectedOrders.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedOrders.slice(0, selectedIndex), selectedOrders.slice(selectedIndex + 1));
    }
    setSelectedOrders(newSelected);
    setCheckboxState(false);
  };
  // ... rest of your component code ...
  const handleToggleChange = (event, newType) => {
    setSelectedType(newType);
  };

  return (
    <Container>
      <div>
        <Typography variant="h4" textAlign="center" color="#680aa3">
          {username.toUpperCase()}&apos;s Orders
        </Typography>
        <br></br>
      </div>
      <ToggleButtonGroup value={selectedType} exclusive onChange={handleToggleChange} aria-label="additional toggles">
        <ToggleButton value="Luxury Bed" aria-label="Luxury Bed">
          Luxury Bed
        </ToggleButton>
        <ToggleButton value="divan" aria-label="Divan">
          Divan
        </ToggleButton>
        <ToggleButton value="Mattress" aria-label="Mattress">
          Mattress
        </ToggleButton>
      </ToggleButtonGroup>
      {selectedType === 'Luxury Bed' && (
        <TSleighHeadTable
          selectedOrders={selectedOrders}
          thisMonthSubmissions={thisMonthSubmissions}
          onCheckboxChange={handleCheckboxChange}
          checkboxState={checkboxState}
        />
      )}
      {selectedType === 'divan' && (
        <TDevanHeadTable
          selectedOrders={selectedOrders}
          thisMonthSubmissions={thisMonthSubmissions}
          onCheckboxChange={handleCheckboxChange}
          checkboxState={checkboxState}
        />
      )}
      {selectedType === 'Mattress' && (
        <TMattressHeadTable
          selectedOrders={selectedOrders}
          thisMonthSubmissions={thisMonthSubmissions}
          onCheckboxChange={handleCheckboxChange}
          checkboxState={checkboxState}
        />
      )}
    </Container>
  );
}
