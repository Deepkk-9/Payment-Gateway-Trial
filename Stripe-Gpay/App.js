import React, { useState } from 'react';
import { View, Button, Alert, TextInput } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

const serverUrl = 'http://192.168.29.78:3001'; // Replace with your server URL

const App = () => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCVC] = useState('');
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${serverUrl}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const { clientSecret } = data;

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        currency: 'usd',
        paymentMethodType: "Card",
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Payment successful!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process payment');
      console.error('Error processing payment:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 5, paddingHorizontal: 10 }}
          placeholder="Exp Month"
          keyboardType="numeric"
          value={expMonth}
          onChangeText={setExpMonth}
        />
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginLeft: 5, paddingHorizontal: 10 }}
          placeholder="Exp Year"
          keyboardType="numeric"
          value={expYear}
          onChangeText={setExpYear}
        />
      </View>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="CVC"
        keyboardType="numeric"
        value={cvc}
        onChangeText={setCVC}
      />
      <Button title="Pay with Card" onPress={handlePayment} disabled={loading} />
    </View>
  );
};

export default App;
