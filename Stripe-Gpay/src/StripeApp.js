import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const API_URL = "http://192.168.29.78:3001"

const StripeApp = () => {

    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();


    const { confirmPayment, loading } = useConfirmPayment();

    const fetchPaymentIntentClientServer = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })

        const { clientSecret, error } = await response.json();

        return { clientSecret, error }
    }

    const handlePress = async () => {
        if (!cardDetails?.complete || !email) {
            Alert.alert("Please enter complete card details and Email")
            return
        }

        const billingDetails = {
            email: email
        }

        try {
            const { clientSecret, error } = await fetchPaymentIntentClientServer();

            if (error) {
                console.log(error);
            }
            else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    paymentMethodType: 'Card',
                    paymentMethodOptions: {
                        card: {
                            billingDetails: { email },
                        },
                    },
                });

                if (error) {
                    alert(`Payment Confirmation Error ${error.message}`)
                }
                else if (paymentIntent) {
                    alert("Payment Successfull");
                    console.log("Payment Successful ", paymentIntent);
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize='none'
                placeholder='E-mail'
                keyboardType='email-address'
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.inp} />

            <CardField
                postalCodeEnabled={true}
                placeholders={{
                    number: "4000 0035 6000 0008",
                }}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails)
                }}
                cardStyle={styles.card}
                style={styles.cardCont}
            />

            <Button title='Pay' onPress={handlePress} disabled={loading} />
        </View>
    )
}

export default StripeApp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    inp: {
        backgroundColor: "#efefefef",
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
        width: "100%"
    },
    card: {
        backgroundColor: "#efefefef"
    },

    cardCont: {
        height: 50,
        marginVertical: 30,
        width: "100%"
    }
});