import React from 'react';
import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';

import "../styles/style.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Component {...pageProps} />
	);
}

export default MyApp;
