import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RazorpayScreen = () => {
    const navigation = useNavigation();

    const handlePayment = async () => {
        try {
            // Replace with the actual order ID obtained from your server
            const orderId = 'order_NjXubx0LyADnHK';

            const apiKey = 'q6NK5sKxVG1yt60vsnrOgNZ9';
            const encodedApiKey = encodeURIComponent(apiKey);

            console.log(encodedApiKey);

            // Construct the Razorpay payment URL
            const razorpayUrl = `https://api.razorpay.com/v1/checkout/embedded?key=${encodedApiKey}&order_id=${orderId}&amount=100&name=ProSkillz&description=Plumber`;

            console.log(razorpayUrl);

            // Navigate to the WebView screen
            navigation.navigate('WebView', { razorpayUrl });

            const response = await fetch(razorpayUrl);
            const responseData = await response.json();

            if (response.ok) {
                // Handle successful response
                console.log('Razorpay Payment Response:', responseData);
            } else {
                // Handle error response
                console.error('Razorpay API Error:', responseData);
            }
        } catch (error) {
            console.error('Error making Razorpay API request:', error.message);
        }
    };


    return (
        <View>
            <Button title="Pay with Razorpay" onPress={handlePayment} />
        </View>
    );
};

export default RazorpayScreen;
