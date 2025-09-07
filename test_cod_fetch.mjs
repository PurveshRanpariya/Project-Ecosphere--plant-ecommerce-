import fetch from 'node-fetch';

async function testCOD() {
    try {
        console.log('Testing COD checkout...');
        
        const response = await fetch('http://localhost:3000/checkout/cod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: 100,
                formdetails: {
                    contact: {
                        email: "test@example.com",
                        phoneno: "1234567890"
                    },
                    shippingaddress: {
                        fullname: "John Doe",
                        address: "123 Main St",
                        city: "Sample City",
                        addressstate: "Sample State",
                        country: "India",
                        pincode: "123456"
                    },
                    billingaddress: {
                        fullname: "John Doe",
                        address: "123 Main St",
                        city: "Sample City",
                        addressstate: "Sample State",
                        country: "India",
                        pincode: "123456"
                    },
                    paymentType: "cod"
                },
                cart_items: [
                    {
                        _id: "65ac77eca5fee84dbfde9fbe",
                        quantity: 1
                    }
                ]
            })
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return;
        }
        
        const data = await response.json();
        console.log('COD Response:', data);
    } catch (error) {
        console.error('COD Error:', error);
    }
}

testCOD();
