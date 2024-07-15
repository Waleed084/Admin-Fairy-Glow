import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate } from 'react-router-dom';
import { Container, FormControl, InputLabel, Input, MenuItem, Select, Button } from '@mui/material';
import ReceiptTable from './ReceiptTable'; // Import the ReceiptTable component
import { useAuth } from 'views/pages/authentication/AuthContext';
//Date constants
const currentDate = new Date();
const pstDateString = currentDate.toLocaleString('en-US', { timeZone: 'Asia/Karachi' });
const pstDate = new Date(pstDateString);

const inlineStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
    backgroundColor: '#f2e0ff', // Light violet background
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  select: {
    marginBottom: '1rem',
    minWidth: '200px'
  },
  button: {
    minWidth: '200px',
    backgroundColor: '#6200ea', // Violet button color
    color: 'white',
    marginTop: '1rem'
  }
};

const MyForm = () => {
  const { username } = useAuth();
  const navigate = useNavigate();
  const [toReload, setToReload] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    submissionDate: pstDate,
    Type: 'Sleigh',
    status: 'Pending',
    Seller: username,
    route: '',
    size: '',
    Color: '',
    HeadBoard: '',
    mattress: '',
    ottoman: '',
    Glift: '',
    threeD: '',
    totalPrice: '',
    Company: '',
    customerDetails: '',
    postalCode: '',
    sprice: '',
    remarks: '',
    profit: 0
  });
  const handleSelect1Change = (e) => {
    setFormData({
      ...formData,
      route: e.target.value
    });
  };
  const handleSelect2Change = (e) => {
    setFormData({
      ...formData,
      size: e.target.value
    });
  };
  const handleMattressChange = (e) => {
    setFormData({
      ...formData,
      mattress: e.target.value
    });
  };
  const handleOttomanChange = (e) => {
    setFormData({
      ...formData,
      ottoman: e.target.value
    });
  };
  const handleGasLiftChange = (e) => {
    setFormData({
      ...formData,
      Glift: e.target.value
    });
  };
  const handleColorChange = (e) => {
    setFormData({
      ...formData,
      Color: e.target.value
    });
  };
  const handleHeadBoardChange = (e) => {
    setFormData({
      ...formData,
      HeadBoard: e.target.value
    });
  };
  const handle3DChange = (e) => {
    setFormData({
      ...formData,
      threeD: e.target.value
    });
  };
  const handleCompanyChange = (e) => {
    setFormData({
      ...formData,
      Company: e.target.value
    });
  };
  const handleCdetailChange = (e) => {
    setFormData({
      ...formData,
      customerDetails: e.target.value
    });
  };
  const handlePostCodeChange = (e) => {
    setFormData({
      ...formData,
      postalCode: e.target.value
    });
  };
  const handleTotalPriceChange = (e) => {
    setFormData({
      ...formData,
      totalPrice: e.target.value
    });
  };
  const handleRemarksChange = (e) => {
    setFormData({
      ...formData,
      remarks: e.target.value
    });
  };
  const handleSpriceChange = (e) => {
    setFormData({
      ...formData,
      sprice: e.target.value
    });
  };
  const handleCalculateTotal = () => {
    // Calculate profit by subtracting seller price from calculated total
    const profit = formData.sprice - formData.totalPrice;
    // Set the total value in the state
    setFormData({
      ...formData,
      profit: profit
    });
    console.log(profit);
  };
  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleReceipt = () => {
    setIsFormSubmitted(true);
  };
  const handleMainFormSubmit = async () => {
    try {
      // Send formData object to the server using Axios POST request
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/postSleigh`, formData);
      // Handle the response from the server if necessary
      console.log('Server Response:', response.data);
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error sending data to the server:', error);
    }
    setToReload(true);
  };
  useEffect(() => {
    if (toReload) {
      // Perform redirection logic here, for example:
      navigate('/utils/util-typography');
      // window.location.href = '/'; // Redirect to homepage
    }
  }, [toReload, navigate]);

  return (
    <Container maxWidth="sm" style={inlineStyles.container}>
      <h2 style={{ color: '#680aa3' }}>Sleigh Order Details</h2>
      <form style={inlineStyles.form} onSubmit={handleMainFormSubmit}>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Route</InputLabel>
          <Select name="route" value={formData.route} onChange={(handleSelect1Change, handleFieldChange)} required>
            <MenuItem value="Normal Routes">Normal Routes</MenuItem>
            <MenuItem value="Long Routes">Long Routes</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>Size</InputLabel>
          <Select name="size" value={formData.size} onChange={(handleSelect2Change, handleFieldChange)} required>
            <MenuItem value="3ft">3ft</MenuItem>
            <MenuItem value="4ft">4ft</MenuItem>
            <MenuItem value="4ft6">4ft6</MenuItem>
            <MenuItem value="5ft">5ft</MenuItem>
            <MenuItem value="6ft">6ft</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>Color/Fabric</InputLabel>
          <Select name="Color" value={formData.Color} onChange={(handleFieldChange, handleColorChange)} required>
            <MenuItem value="White Crush">White Crush</MenuItem>
            <MenuItem value="Silver Crush">Silver Crush</MenuItem>
            <MenuItem value="Grey Crush">Grey Crush</MenuItem>
            <MenuItem value="Charcoal Crush">Charcoal Crush</MenuItem>
            <MenuItem value="Black Crush">Black Crush</MenuItem>
            <MenuItem value="Gold Crush">Gold Crush</MenuItem>
            <MenuItem value="Cream Crush">Cream Crush</MenuItem>
            <MenuItem value="Blue Crush">Blue Crush</MenuItem>
            <MenuItem value="Teal Crush">Teal Crush</MenuItem>
            <MenuItem value="Brown Crush">Brown Crush</MenuItem>
            <MenuItem value="Mink Crush">Mink Crush</MenuItem>
            <MenuItem value="Red Crush">Red Crush</MenuItem>
            <MenuItem value="Purple Crush">Purple Crush</MenuItem>
            <MenuItem value="Light Pink Crush">Light Pink Crush</MenuItem>
            <MenuItem value="Dark Pink Crush">Dark Pink Crush</MenuItem>
            <MenuItem value="Black Chenille">Black Chenille</MenuItem>
            <MenuItem value="Charcoal Chenille">Charcoal Chenille</MenuItem>
            <MenuItem value="Grey Chenille">Grey Chenille</MenuItem>
            <MenuItem value="Cream Chenill">Cream Chenille</MenuItem>
            <MenuItem value="Milk Chenill">Milk Chenille</MenuItem>
            <MenuItem value="Teal Chenill">Teal Chenille</MenuItem>
            <MenuItem value="Red Chenill">Red Chenille</MenuItem>
            <MenuItem value="Plum Chenill">Plum Chenille</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>Head Board</InputLabel>
          <Select name="HeadBoard" value={formData.HeadBoard} onChange={(handleFieldChange, handleHeadBoardChange)} required>
            <MenuItem value="No HB">No HB</MenuItem>
            <MenuItem value="Diamonds">Diamonds</MenuItem>
            <MenuItem value="Matching Buttons">Matching Buttons</MenuItem>
            <MenuItem value="Panel">Panel</MenuItem>
            <MenuItem value="Plain">Plain</MenuItem>
            <MenuItem value="Chesterfield-Diamonds">Chesterfield-Diamonds</MenuItem>
            <MenuItem value="Chesterfield-Buttons">Chesterfield-Buttons</MenuItem>
            <MenuItem value="Floor Standing Chesterfield-Diamonds">Floor Standing Chesterfield-Diamonds</MenuItem>
            <MenuItem value="Floor Standing Chesterfield-Buttons">Floor Standing Chesterfield-Buttons</MenuItem>
            <MenuItem value="Floor Standing Panel">Floor Standing Panel</MenuItem>
            <MenuItem value="Florida-Diamonds">Florida-Diamonds</MenuItem>
            <MenuItem value="Florida-Buttons">Florida-Buttons</MenuItem>
            <MenuItem value="Florida Cube Diamonds">Florida Cube Diamonds</MenuItem>
            <MenuItem value="Florida Cube Buttons">Florida Cube Buttons</MenuItem>
            <MenuItem value="Arizona Panel">Arizona Panel</MenuItem>
            <MenuItem value="Arizona Panel Wingback">Arizona Panel Wingback</MenuItem>
            <MenuItem value="Vivienne-Diamonds">Vivienne-Diamonds</MenuItem>
            <MenuItem value="Vivienne-Buttons">Vivienne-Buttons</MenuItem>
            <MenuItem value="Vivienne-Panel">Vivienne-Panel</MenuItem>
            <MenuItem value="Sleigh-Diamonds">Sleigh-Diamonds</MenuItem>
            <MenuItem value="Sleigh-Buttons">Sleigh-Buttons</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>Mattress</InputLabel>
          <Select name="mattress" value={formData.mattress} onChange={(handleFieldChange, handleMattressChange)} required>
            <MenuItem value="Kammy">Kammy</MenuItem>
            <MenuItem value="3D">3D</MenuItem>
            <MenuItem value="1000 Poc">1000 Pocket</MenuItem>
            <MenuItem value="2000 Poc">2000 Pocket</MenuItem>
            <MenuItem value="No">NO Mattress</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>Ottoman Box</InputLabel>
          <Select name="ottoman" value={formData.ottoman} onChange={(handleFieldChange, handleOttomanChange)} required>
            <MenuItem value="Yes">YES!</MenuItem>
            <MenuItem value="No">NO!</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>Gas Lift</InputLabel>
          <Select name="Glift" value={formData.Glift} onChange={(handleFieldChange, handleGasLiftChange)} required>
            <MenuItem value="Yes">YES!</MenuItem>
            <MenuItem value="No">NO!</MenuItem>
          </Select>
        </FormControl>

        <FormControl style={inlineStyles.select}>
          <InputLabel>3D Upgrade</InputLabel>
          <Select name="threeD" value={formData.threeD} onChange={(handleFieldChange, handle3DChange)} required>
            <MenuItem value="YES">Yes!</MenuItem>
            <MenuItem value="NO">NO!</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Company</InputLabel>
          <Input type="text" name="Company" value={formData.Company} onChange={(handleFieldChange, handleCompanyChange)} required />
        </FormControl>
        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Customers Details</InputLabel>
          <Input
            name="customerDetails"
            value={formData.customerDetails}
            onChange={(handleFieldChange, handleCdetailChange)}
            multiline
            rows={Math.max(1, formData.customerDetails.split('\n').length)}
            required
          />
        </FormControl>

        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Postal Code</InputLabel>
          <Input type="num" name="postalCode" value={formData.postalCode} onChange={(handleFieldChange, handlePostCodeChange)} required />
        </FormControl>
        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Total Price</InputLabel>
          <Input type="num" name="totalPrice" value={formData.totalPrice} onChange={(handleFieldChange, handleTotalPriceChange)} required />
        </FormControl>
        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Seller Price</InputLabel>
          <Input type="num" name="sprice" value={formData.sprice} onChange={(handleFieldChange, handleSpriceChange)} required />
        </FormControl>

        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Seller Remarks</InputLabel>
          <Input name="remarks" value={formData.remarks} onChange={(handleFieldChange, handleRemarksChange)} required />
        </FormControl>

        <Button
          variant="contained"
          style={inlineStyles.button}
          onClick={() => {
            handleCalculateTotal();
            handleReceipt();
          }}
        >
          Continue
        </Button>

        <div>Total Price: £{formData.totalPrice}</div>
        <div></div>

        {isFormSubmitted && <ReceiptTable formData={formData} totalValue={formData.totalPrice} />}
        <Button type="Submit" variant="contained" style={inlineStyles.button}>
          Confirm
        </Button>
      </form>
    </Container>
  );
};

export default MyForm;
