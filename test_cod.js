const axios = require('axios');

// Test COD checkout with sample data
const testCOD = async () => {
  try {
    const response = await axios.post('http://localhost:3000/checkout/cod', {
      amount: 100,
      formdetails: {
        contact: {
          email: 'test@example.com',
          phoneno: '1234567890'
        },
        shippingaddress: {
          fullname: 'John Doe',
          address: '123 Main St',
          city: 'Sample City',
          addressstate: 'Sample State',
          country: 'India',
          pincode: '123456'
        },
        billingaddress: {
          fullname: 'John Doe',
          address: '123 Main St',
          city: 'Sample City',
          addressstate: 'Sample State',
          country: 'India',
          pincode: '123456'
        },
        paymentType: 'cod',
        gatewayType: ''
      },
      cart_items: [
        {
          _id: '65ac77eca5fee84dbfde9fbe',
          quantity: 1
        }
      ]
    });
    
    console.log('COD Response:', response.data);
  } catch (error) {
    console.error('COD Error:', error.response ? error.response.data : error.message);
  }
};

testCOD();
