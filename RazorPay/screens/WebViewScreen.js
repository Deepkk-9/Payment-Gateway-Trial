import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
    const { razorpayUrl } = route.params;

    return <WebView source={{ uri: razorpayUrl }} />;
};

export default WebViewScreen;
