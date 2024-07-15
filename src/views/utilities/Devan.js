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
    Type: 'Divan',
    status: 'Pending',
    Seller: username,
    route: '',
    size: '',
    Color: '',
    HeadBoard: '',
    drawer: '',
    mattress: '',
    Set: '',
    assembly: '',
    siplet: '',
    Company: '',
    customerDetails: '',
    totalPrice: '',
    sprice: '',
    postalCode: '',
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
  const handleSetChange = (e) => {
    setFormData({
      ...formData,
      Set: e.target.value
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
  const handleDrawerChange = (e) => {
    setFormData({
      ...formData,
      drawer: e.target.value
    });
  };
  const handleAssemblyChange = (e) => {
    setFormData({
      ...formData,
      assembly: e.target.value
    });
  };
  const handleSipletChange = (e) => {
    setFormData({
      ...formData,
      siplet: e.target.value
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
  const handleSpriceChange = (e) => {
    setFormData({
      ...formData,
      sprice: e.target.value
    });
  };
  const handleRemarksChange = (e) => {
    setFormData({
      ...formData,
      remarks: e.target.value
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
      const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/postDevan`, formData);
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
      navigate('/utils/util-color');
      // window.location.href = '/'; // Redirect to homepage
    }
  }, [toReload, navigate]);

  return (
    <Container maxWidth="sm" style={inlineStyles.container}>
      <h2 style={{ color: '#680aa3' }}>Divan Order Details</h2>
      <form style={inlineStyles.form} onSubmit={handleMainFormSubmit}>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Route</InputLabel>
          <Select name="route" value={formData.route} onChange={(handleSelect1Change, handleFieldChange)} required>
            <MenuItem value="Normal">Normal Routes</MenuItem>
            <MenuItem value="Long">Long Routes</MenuItem>
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
            <MenuItem value="Charcoal Chenille">Charcoal Chenille</MenuItem>
            <MenuItem value="Grey Chenille">Grey Chenille</MenuItem>
            <MenuItem value="Cream Chenille">Cream Chenille</MenuItem>
            <MenuItem value="Mink Chenille">Mink Chenille</MenuItem>
            <MenuItem value="Teal Chenille">Teal Chenille</MenuItem>
            <MenuItem value="Red Chenille">Red Chenille</MenuItem>
            <MenuItem value="Plum Chenille">Plum Chenille</MenuItem>
            <MenuItem value="Grey Naples">Grey Naples</MenuItem>
            <MenuItem value="Silver Naples">Silver Naples</MenuItem>
            <MenuItem value="Slate Naples">Slate Naples</MenuItem>
            <MenuItem value="Charcoal Naples">Charcoal Naples</MenuItem>
            <MenuItem value="Cream Naples">Cream Naples</MenuItem>
            <MenuItem value="Black Naples">Black Naples</MenuItem>
            <MenuItem value="White Plush">White Plush</MenuItem>
            <MenuItem value="Grey Plush">Grey Plush</MenuItem>
            <MenuItem value="Steel Plush">Steel Plush</MenuItem>
            <MenuItem value="Silver Plush">Silver Plush</MenuItem>
            <MenuItem value="Black Plush">Black Plush</MenuItem>
            <MenuItem value="Cream Plush">Cream Plush</MenuItem>
            <MenuItem value="Gold Plush">Gold Plush</MenuItem>
            <MenuItem value="Blue Plush">Blue Plush</MenuItem>
            <MenuItem value="Teal Plush">Teal Plush</MenuItem>
            <MenuItem value="Brown Plush">Brown Plush</MenuItem>
            <MenuItem value="Mink Plush">Mink Plush</MenuItem>
            <MenuItem value="Pink Plush">Pink Plush</MenuItem>
            <MenuItem value="Black Leather">Black Leather</MenuItem>
            <MenuItem value="White Leather">White Leather</MenuItem>
            <MenuItem value="Brown Leather">Brown Leather</MenuItem>
            <MenuItem value="Cream Leather">Cream Leather</MenuItem>
            <MenuItem value="Black Suede">Black Suede</MenuItem>
            <MenuItem value="Grey Suede">Grey Suede</MenuItem>
            <MenuItem value="Sand Suede">Sand Suede</MenuItem>
            <MenuItem value="Linoso">Linoso</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Head Board</InputLabel>
          <Select name="HeadBoard" value={formData.HeadBoard} onChange={(handleFieldChange, handleHeadBoardChange)} required>
            <MenuItem value="No HB">No HB</MenuItem>
            <MenuItem value="Matching Buttons">Matching Buttons</MenuItem>
            <MenuItem value="Panel">Panel</MenuItem>
            <MenuItem value="Plain">Plain</MenuItem>
            <MenuItem value="Chesterfield-Diamonds">Chesterfield-Diamonds</MenuItem>
            <MenuItem value="Chesterfield-Buttons">Chesterfield-Buttons</MenuItem>
            <MenuItem value="Floor Standing Chesterfield-Diamonds">Floor Standing Chesterfield-Diamonds</MenuItem>
            <MenuItem value="Floor Standing Chesterfield-Buttons">Floor Standing Chesterfield-Buttons</MenuItem>
            <MenuItem value="Floor Standing Panel">Floor Standing Panel</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Drawers</InputLabel>
          <Select name="drawer" value={formData.drawer} onChange={(handleFieldChange, handleDrawerChange)} required>
            <MenuItem value="No">No Drawer</MenuItem>
            <MenuItem value="1Jumbo">1 Drawer-Jumbo </MenuItem>
            <MenuItem value="1Drawer">1 Drawer</MenuItem>
            <MenuItem value="2Drawer">2 Drawer</MenuItem>
            <MenuItem value="3Drawer">3 Drawer</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Mattress</InputLabel>
          <Select name="mattress" value={formData.mattress} onChange={(handleFieldChange, handleMattressChange)} required>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="1000 poc">1000 Pocket</MenuItem>
            <MenuItem value="2000 poc">2000 Pocket</MenuItem>
            <MenuItem value="Full Foam">Full Foam</MenuItem>
            <MenuItem value="Orthopedic">Orthopedic</MenuItem>
            <MenuItem value="Memory Foam Spring">Memory Foam Spring</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Set</InputLabel>
          <Select name="Set" value={formData.Set} onChange={(handleFieldChange, handleSetChange)} required>
            <MenuItem value="FullSet">FullSet</MenuItem>
            <MenuItem value="Base and HB">Base and HB only</MenuItem>
            <MenuItem value="Mattress only">Mattress only</MenuItem>
            <MenuItem value="HB only">HB only</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Assembly Required</InputLabel>
          <Select name="assembly" value={formData.assembly} onChange={(handleFieldChange, handleAssemblyChange)} required>
            <MenuItem value="YES">Yes!</MenuItem>
            <MenuItem value="NO">NO!</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Split Base Required</InputLabel>
          <Select name="siplet" value={formData.siplet} onChange={(handleFieldChange, handleSipletChange)} required>
            <MenuItem value="YES">Yes!</MenuItem>
            <MenuItem value="NO">NO!</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.select}>
          <InputLabel>Company</InputLabel>
          <Select name="Company" value={formData.Company} onChange={(handleFieldChange, handleCompanyChange)} required>
            <MenuItem value="Latex">Latex</MenuItem>
            <MenuItem value="Eve">Eve</MenuItem>
            <MenuItem value="National">National</MenuItem>
            <MenuItem value="Natural">Natural</MenuItem>
            <MenuItem value="Deep Sleep">Deep Sleep</MenuItem>
            <MenuItem value="Pascal">Pascal</MenuItem>
            <MenuItem value="Star⭐">Star⭐</MenuItem>
            <MenuItem value="Sealy">Sealy</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={inlineStyles.formControl}>
          <InputLabel>Customers Details</InputLabel>
          <Input
            type="text"
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
        <div></div>
        {isFormSubmitted && <ReceiptTable formData={formData} totalPrice={formData.totalPrice} />}
        <Button type="Submit" variant="contained" style={inlineStyles.button}>
          Confirm
        </Button>
      </form>
    </Container>
  );
};
export default MyForm;
