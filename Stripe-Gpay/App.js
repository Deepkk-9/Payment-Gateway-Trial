import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StripeApp from './src/StripeApp';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PUBLISHABLE_KEY } from "@env"

export default function App() {
  return (
    <StripeProvider publishableKey={PUBLISHABLE_KEY}>
      <StripeApp />
    </StripeProvider>
  );
}